/*
 * lib/tracking.ts: who may be measured, and acquisition_entry.
 *
 * Run with `npm test` (node --test; Node 22.18+/24 strips the types).
 * No browser: a small fake window/document, and a fake gtag queue whose
 * "get session_id" answers the way the real tag does (a new id when the
 * GA4 session cookie was missing or had timed out, the same id
 * otherwise -- checked against the real gtag.js on 2026-10-26).
 */
import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";

const SESSION = "_ga_3GR5ZT15NG";

let jar;

function installBrowser(url) {
  const parsed = new URL(url);
  jar = new Map();

  globalThis.window = {
    location: {
      hostname: parsed.hostname,
      pathname: parsed.pathname,
      search: parsed.search,
      protocol: parsed.protocol,
      href: parsed.href,
    },
  };
  globalThis.document = {
    title: "t",
    head: { appendChild() {} },
    createElement: () => ({}),
    get cookie() {
      return [...jar].map(([k, v]) => `${k}=${v}`).join("; ");
    },
    set cookie(value) {
      const [pair, ...attrs] = value.split(/;\s*/);
      const [name, ...rest] = pair.split("=");
      if (attrs.some((a) => a.toLowerCase() === "max-age=0")) jar.delete(name);
      else jar.set(name, rest.join("="));
    },
  };
}

let fresh = 0;
async function load(url, { flag = "true" } = {}) {
  installBrowser(url);
  process.env.NEXT_PUBLIC_ANALYTICS_ENABLED = flag;
  // A fresh module per page load, like the browser.
  return import(`../lib/tracking.ts?load=${fresh++}`);
}

/* What gtag.js would do with the queue: start or continue the GA4
   session, then answer "get session_id". */
let nextSessionId = 1790000000;
function runTag() {
  for (const entry of window.dataLayer.splice(0)) {
    const [command, , field, callback] = Array.from(entry);
    if (command !== "get" || field !== "session_id") continue;

    const cookie = jar.get(SESSION);
    const last = Number(cookie?.match(/\$t(\d+)/)?.[1] ?? 0) * 1000;
    let id = cookie?.match(/^GS\d\.\d\.s(\d+)/)?.[1];

    if (!id || Date.now() - last >= 30 * 60 * 1000) id = String(nextSessionId++);
    jar.set(SESSION, `GS2.1.s${id}$o1$g1$t${Math.floor(Date.now() / 1000)}$j0$l0$h0`);
    callback(id);
  }
}

function entries() {
  return (window.__gridbeaconEvents ?? []).filter((e) => e.name === "acquisition_entry");
}

beforeEach(() => {
  delete process.env.NEXT_PUBLIC_ANALYTICS_ENABLED;
});

describe("trackingAllowed", () => {
  it("needs the build flag and the production host", async () => {
    assert.equal((await load("https://gridbeaconhq.com/")).trackingAllowed(), true);
    assert.equal((await load("https://gridbeaconhq.com/", { flag: "" })).trackingAllowed(), false);
    assert.equal((await load("https://gridbeaconhq.com/", { flag: "false" })).trackingAllowed(), false);
    assert.equal((await load("http://localhost:3013/")).trackingAllowed(), false);
    assert.equal((await load("http://127.0.0.1:3014/")).trackingAllowed(), false); // deploy candidate
    assert.equal((await load("https://www.gridbeaconhq.com/")).trackingAllowed(), false);
  });

  it("is off in a browser the app marked as staff", async () => {
    const t = await load("https://gridbeaconhq.com/pricing");
    jar.set("gb_internal", "1");
    assert.equal(t.trackingAllowed(), false);
  });

  it("?gb_internal=1 marks the browser for the whole parent domain, =0 clears it", async () => {
    const cookies = [];
    let t = await load("https://gridbeaconhq.com/?gb_internal=1");
    const set = Object.getOwnPropertyDescriptor(document, "cookie").set;
    Object.defineProperty(document, "cookie", {
      get: () => [...jar].map(([k, v]) => `${k}=${v}`).join("; "),
      set: (v) => (cookies.push(v), set(v)),
    });
    assert.equal(t.trackingAllowed(), false);
    assert.match(cookies[0], /^gb_internal=1; .*domain=\.gridbeaconhq\.com/);

    const kept = new Map(jar);
    t = await load("https://gridbeaconhq.com/?gb_internal=0");
    jar = kept;
    assert.equal(t.trackingAllowed(), true);
    assert.equal(jar.has("gb_internal"), false);
  });
});

describe("acquisition_entry", () => {
  it("marks a session that starts on the marketing site", async () => {
    const t = await load("https://gridbeaconhq.com/google-maps-rank-tracker");
    t.loadGoogleAnalytics(t.GA_MEASUREMENT_ID);
    runTag();

    assert.deepEqual(entries().map((e) => e.params), [
      { entry_surface: "marketing", landing_path: "/google-maps-rank-tracker" },
    ]);
  });

  it("does not mark a later page of the same session", async () => {
    let t = await load("https://gridbeaconhq.com/");
    t.loadGoogleAnalytics(t.GA_MEASUREMENT_ID);
    runTag();

    const kept = new Map(jar);
    t = await load("https://gridbeaconhq.com/pricing");
    jar = kept;
    t.loadGoogleAnalytics(t.GA_MEASUREMENT_ID);
    runTag();

    assert.equal(entries().length, 0);
  });

  it("marks a returning visitor whose last session timed out", async () => {
    const t = await load("https://gridbeaconhq.com/");
    const old = Math.floor((Date.now() - 2 * 3600 * 1000) / 1000);
    jar.set(SESSION, `GS2.1.s1111111111$o3$g0$t${old}$j0$l0$h0`);

    t.loadGoogleAnalytics(t.GA_MEASUREMENT_ID);
    runTag();

    assert.equal(entries().length, 1);
  });

  it("marks a session restarted by a client-side move after the tab sat idle", async () => {
    const t = await load("https://gridbeaconhq.com/");
    t.loadGoogleAnalytics(t.GA_MEASUREMENT_ID);
    runTag();
    assert.equal(entries().length, 1);

    // Same tab, ordinary navigation: no new session.
    t.noteSessionAfterNavigation();
    runTag();
    assert.equal(entries().length, 1);

    // Idle past the timeout, then a navigation.
    const old = Math.floor((Date.now() - 31 * 60 * 1000) / 1000);
    jar.set(SESSION, jar.get(SESSION).replace(/\$t\d+/, `$t${old}`));
    window.location.pathname = "/features";
    t.noteSessionAfterNavigation();
    runTag();

    assert.equal(entries().length, 2);
    assert.equal(entries()[1].params.landing_path, "/features");
  });

  it("carries nothing personal", async () => {
    const t = await load("https://gridbeaconhq.com/?utm_source=google&email=a@b.c");
    t.loadGoogleAnalytics(t.GA_MEASUREMENT_ID);
    runTag();

    assert.deepEqual(Object.keys(entries()[0].params).sort(), ["entry_surface", "landing_path"]);
  });

  it("reads GA4's session cookie format", async () => {
    const t = await load("https://gridbeaconhq.com/");
    assert.equal(t.gaSessionId("a=1; _ga_3GR5ZT15NG=GS2.1.s1793000867$o2$g1$t1793000885$j42$l0$h0"), "1793000867");
    assert.equal(t.gaSessionId("_ga=GA1.1.1.2"), null);
  });
});
