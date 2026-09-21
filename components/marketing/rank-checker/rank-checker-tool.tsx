"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  ArrowRight,
  Check,
  Grid3X3,
  Loader2,
  LockKeyhole,
  Mail,
  MapPin,
  Radar,
  Search,
  Store,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  CheckerError,
  EVENTS,
  GRID_SIZE,
  RADIUS_OPTIONS,
  TURNSTILE_SITE_KEY,
  readResult,
  resendCode,
  searchBusinesses,
  startCheck,
  trackChecker,
  verifyCheck,
  type BusinessCandidate,
  type CheckResult,
  type CheckerState,
} from "@/lib/free-rank-checker";
import { RankCheckResult } from "./rank-check-result";
import styles from "./rank-checker.module.css";

const POLL_MS = 6000;

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: { sitekey: string; callback: (token: string) => void },
      ) => string;
    };
  }
}

function Turnstile({ onToken }: { onToken: (token: string) => void }) {
  const holder = useRef<HTMLDivElement | null>(null);
  const rendered = useRef(false);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || rendered.current) return;

    function render() {
      if (!holder.current || rendered.current || !window.turnstile) return;
      rendered.current = true;
      window.turnstile.render(holder.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: onToken,
      });
    }

    if (window.turnstile) {
      render();
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = render;
    document.head.appendChild(script);
  }, [onToken]);

  if (!TURNSTILE_SITE_KEY) return null;

  return <div ref={holder} className={styles.turnstile} />;
}

export function RankCheckerTool() {
  const [state, setState] = useState<CheckerState>("CONFIGURING");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // step 1: the business
  const [query, setQuery] = useState("");
  const [candidates, setCandidates] = useState<BusinessCandidate[]>([]);
  const [selected, setSelected] = useState<BusinessCandidate | null>(null);
  const [searching, setSearching] = useState(false);

  // step 1: the scan
  const [keyword, setKeyword] = useState("");
  const [radius, setRadius] = useState<number>(3);

  // step 2: the visitor
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  // step 3 onwards
  const [code, setCode] = useState("");
  const [token, setToken] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);

  useEffect(() => {
    trackChecker(EVENTS.view);
  }, []);

  function fail(caught: unknown) {
    const message =
      caught instanceof CheckerError
        ? caught.message
        : "Something went wrong. Please try again.";

    if (caught instanceof CheckerError && caught.code === "limit_reached") {
      setState("LIMIT_REACHED");
    }

    setError(message);
  }

  async function findBusinesses(event: FormEvent) {
    event.preventDefault();
    if (query.trim().length < 2) return;

    setSearching(true);
    setError("");

    try {
      const found = await searchBusinesses(query.trim());
      setCandidates(found.businesses);

      if (!found.businesses.length) {
        setError(
          "No Google Business Profile matched that. Try the exact business name and city.",
        );
      }
    } catch (caught) {
      fail(caught);
    } finally {
      setSearching(false);
    }
  }

  function choose(business: BusinessCandidate) {
    setSelected(business);
    setCandidates([]);
    setQuery(business.business_name);
    trackChecker(EVENTS.businessSelected);
  }

  function openEmailStep(event: FormEvent) {
    event.preventDefault();

    if (!selected) {
      setError("Search for your business and pick it from the list.");
      return;
    }

    if (keyword.trim().length < 2) {
      setError("Enter the keyword you want to check.");
      return;
    }

    setError("");
    trackChecker(EVENTS.formCompleted, {
      radius_miles: radius,
      grid_size: GRID_SIZE,
    });
    setState("EMAIL_REQUIRED");
  }

  async function submitEmail(event: FormEvent) {
    event.preventDefault();
    if (!selected) return;

    setBusy(true);
    setError("");

    try {
      const started = await startCheck({
        query: query.trim(),
        place_id: selected.place_id,
        keyword: keyword.trim(),
        radius_miles: radius,
        email: email.trim(),
        marketing_consent: consent,
        turnstile_token: turnstileToken || undefined,
      });

      setToken(started.token);
      trackChecker(EVENTS.emailSubmitted, { radius_miles: radius });
      setState("VERIFYING_EMAIL");
    } catch (caught) {
      fail(caught);
    } finally {
      setBusy(false);
    }
  }

  async function submitCode(event: FormEvent) {
    event.preventDefault();

    setBusy(true);
    setError("");

    try {
      const verified = await verifyCheck(token, code.trim());
      setHasAccount(verified.has_account);
      trackChecker(EVENTS.emailVerified);
      trackChecker(EVENTS.scanStarted, {
        radius_miles: radius,
        grid_size: GRID_SIZE,
      });
      setState("SCANNING");
    } catch (caught) {
      fail(caught);
    } finally {
      setBusy(false);
    }
  }

  async function askForAnotherCode() {
    setBusy(true);
    setError("");

    try {
      await resendCode(token);
      setError("A new code is on its way.");
    } catch (caught) {
      fail(caught);
    } finally {
      setBusy(false);
    }
  }

  /* Polls while the scan runs, and stops the moment it is finished,
     failed or gone. No progress percentage is invented: the stages
     come from what the job has actually recorded. */
  const poll = useCallback(async () => {
    try {
      const latest = await readResult(token);
      setResult(latest);

      if (latest.status === "completed") {
        setState("COMPLETED");
        trackChecker(EVENTS.scanCompleted, { radius_miles: radius });
        trackChecker(EVENTS.resultViewed);
        return true;
      }

      if (latest.status === "failed") {
        setState("FAILED");
        trackChecker(EVENTS.scanFailed, { reason: "scan_failed" });
        return true;
      }
    } catch (caught) {
      if (caught instanceof CheckerError && caught.code === "not_found") {
        setState("FAILED");
        setError("This rank check is no longer available.");
        return true;
      }
    }

    return false;
  }, [radius, token]);

  useEffect(() => {
    if (state !== "SCANNING" || !token) return;

    let active = true;
    let timer: ReturnType<typeof setTimeout>;

    async function tick() {
      const done = await poll();
      if (!active || done) return;
      timer = setTimeout(tick, POLL_MS);
    }

    tick();

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [poll, state, token]);

  /* The shareable link, absolute so "Copy Report Link" hands over
     something that works outside this tab. */
  const absoluteResultUrl =
    token && typeof window !== "undefined"
      ? `${window.location.origin}/google-maps-rank-checker/result/${token}`
      : "";

  return (
    <section
      id="rank-checker"
      className={styles.scannerSection}
      aria-labelledby="checker-heading"
    >
      <div className={styles.container}>
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>LOCATION-BASED RANK CHECK</span>
          <h2 id="checker-heading">Run Your Free Google Maps Rank Check</h2>
          <p>
            Pick your Google Business Profile, choose a keyword and see how
            your ranking changes across a 3×3 grid of real coordinates.
          </p>
        </div>

        <div
          className={`${styles.card} ${styles.scanner} ${
            state === "COMPLETED" ? styles.resultCard : ""
          }`}
        >
          <div className={styles.scannerHeader}>
            <span>
              <Radar size={19} aria-hidden="true" /> Google Maps Rank Checker
            </span>
            <span className={styles.headerBadge}>FREE TOOL</span>
          </div>

          {/* ---------------------------------------------- step 1 */}
          {state === "CONFIGURING" ? (
            <form className={styles.form} onSubmit={openEmailStep}>
              <div className={styles.formGrid}>
                <label className={styles.field}>
                  <span>
                    <Store size={15} aria-hidden="true" /> Business
                  </span>
                  <div className={styles.searchRow}>
                    <input
                      value={query}
                      onChange={(event) => {
                        setQuery(event.target.value);
                        setSelected(null);
                      }}
                      placeholder="Business name and city"
                      maxLength={160}
                      autoComplete="organization"
                    />
                    <button
                      type="button"
                      className={styles.searchButton}
                      onClick={findBusinesses}
                      disabled={searching || query.trim().length < 2}
                    >
                      {searching ? (
                        <Loader2 size={15} className={styles.spin} />
                      ) : (
                        <Search size={15} />
                      )}
                      Search
                    </button>
                  </div>
                </label>

                <label className={styles.field}>
                  <span>
                    <Search size={15} aria-hidden="true" /> Target keyword
                  </span>
                  <input
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                    placeholder="e.g. emergency dentist"
                    maxLength={120}
                  />
                </label>
              </div>

              {candidates.length ? (
                <ul className={styles.candidates}>
                  {candidates.map((business) => (
                    <li key={business.place_id}>
                      <button type="button" onClick={() => choose(business)}>
                        <strong>{business.business_name}</strong>
                        <span>
                          <MapPin size={12} aria-hidden="true" />{" "}
                          {business.formatted_address}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}

              {selected ? (
                <div className={styles.selectedBusiness}>
                  <Check size={15} aria-hidden="true" />
                  <div>
                    <strong>{selected.business_name}</strong>
                    <span>{selected.formatted_address}</span>
                  </div>
                </div>
              ) : null}

              <fieldset className={styles.radius}>
                <legend>Scan radius</legend>
                <div className={styles.segments}>
                  {RADIUS_OPTIONS.map((option) => (
                    <label key={option}>
                      <input
                        type="radio"
                        name="radius"
                        value={option}
                        checked={radius === option}
                        onChange={() => setRadius(option)}
                      />
                      <span>
                        {option} {option === 1 ? "mile" : "miles"}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className={styles.gridSize}>
                <legend>
                  <Grid3X3 size={15} aria-hidden="true" /> Grid size
                </legend>
                <div className={styles.gridOptions}>
                  <label className={styles.selectedGrid}>
                    <input type="radio" name="grid" value="3" defaultChecked />
                    <span>
                      <strong>
                        3×3 <small>FREE</small>
                      </strong>
                      <span>9 neighbourhood points</span>
                    </span>
                    <Check size={16} aria-hidden="true" />
                  </label>
                  {[5, 7].map((size) => (
                    <div key={size} className={styles.lockedGrid}>
                      <strong>
                        {size}×{size}
                        <LockKeyhole size={14} aria-hidden="true" />
                      </strong>
                      <span>Available in GridBeacon</span>
                    </div>
                  ))}
                </div>
              </fieldset>

              <div className={styles.formActions}>
                <Button type="submit" className={styles.primary}>
                  Run Free Rank Check{" "}
                  <ArrowRight size={17} aria-hidden="true" />
                </Button>
                <p>
                  <Check size={13} aria-hidden="true" /> No credit card
                  required <span>·</span> Results in about a minute
                </p>
              </div>
            </form>
          ) : null}

          {/* ---------------------------------------------- step 2 */}
          {state === "EMAIL_REQUIRED" ? (
            <form className={styles.form} onSubmit={submitEmail}>
              <div className={styles.emailStep}>
                <h3>Where should we send your rank report?</h3>
                <p>
                  Enter your email to run your free 3×3 Google Maps rank
                  check.
                </p>

                <label className={styles.field}>
                  <span>
                    <Mail size={15} aria-hidden="true" /> Email address
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@company.com"
                    autoComplete="email"
                    required
                    maxLength={320}
                  />
                </label>

                <label className={styles.consent}>
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(event) => setConsent(event.target.checked)}
                  />
                  <span>
                    Send me occasional GridBeacon local SEO tips and product
                    updates
                  </span>
                </label>

                <Turnstile onToken={setTurnstileToken} />

                <Button
                  type="submit"
                  className={styles.primary}
                  disabled={busy}
                >
                  {busy ? (
                    <Loader2 size={16} className={styles.spin} />
                  ) : null}
                  Run My Free Scan
                </Button>

                <ul className={styles.assurances}>
                  <li>
                    <Check size={13} aria-hidden="true" /> No credit card
                    required
                  </li>
                  <li>
                    <Check size={13} aria-hidden="true" /> Results available
                    online
                  </li>
                  <li>
                    <Check size={13} aria-hidden="true" /> We&rsquo;ll email
                    you when the scan is ready
                  </li>
                </ul>
              </div>
            </form>
          ) : null}

          {/* ---------------------------------------------- step 3 */}
          {state === "VERIFYING_EMAIL" ? (
            <form className={styles.form} onSubmit={submitCode}>
              <div className={styles.emailStep}>
                <h3>Enter your six-digit code</h3>
                <p>
                  We sent a code to <strong>{email}</strong>. It expires in
                  10 minutes.
                </p>

                <label className={styles.field}>
                  <span>Verification code</span>
                  <input
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    placeholder="123456"
                    maxLength={6}
                    required
                  />
                </label>

                <Button
                  type="submit"
                  className={styles.primary}
                  disabled={busy}
                >
                  {busy ? (
                    <Loader2 size={16} className={styles.spin} />
                  ) : null}
                  Verify and start my scan
                </Button>

                <button
                  type="button"
                  className={styles.linkButton}
                  onClick={askForAnotherCode}
                  disabled={busy}
                >
                  Send another code
                </button>
              </div>
            </form>
          ) : null}

          {/* ---------------------------------------------- scanning */}
          {state === "SCANNING" ? (
            <div className={styles.form}>
              <div className={styles.progress}>
                <h3>
                  <Loader2 size={18} className={styles.spin} /> Scanning
                  Google Maps rankings…
                </h3>
                <dl className={styles.progressMeta}>
                  <div>
                    <dt>Business</dt>
                    <dd>{selected?.business_name}</dd>
                  </div>
                  <div>
                    <dt>Keyword</dt>
                    <dd>{keyword}</dd>
                  </div>
                  <div>
                    <dt>Location</dt>
                    <dd>{selected?.formatted_address}</dd>
                  </div>
                </dl>

                <ul className={styles.stages}>
                  {(result?.stages || []).map((stage) => (
                    <li key={stage.key} data-state={stage.state}>
                      <span aria-hidden="true">
                        {stage.state === "done"
                          ? "✓"
                          : stage.state === "active"
                            ? "●"
                            : "○"}
                      </span>
                      {stage.label}
                      {stage.state === "active" &&
                      stage.total_points ? (
                        <small>
                          {stage.completed_points} of {stage.total_points}
                        </small>
                      ) : null}
                    </li>
                  ))}
                </ul>

                {hasAccount ? (
                  <p className={styles.accountNote}>
                    You already have a GridBeacon account — this check will be
                    waiting in it when you sign in.
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}

          {/* ---------------------------------------------- results */}
          {state === "COMPLETED" && result ? (
            <div className={styles.resultBody}>
              <RankCheckResult
                result={result}
                resultUrl={absoluteResultUrl}
              />
            </div>
          ) : null}

          {state === "FAILED" ? (
            <div className={styles.form}>
              <div className={styles.failure}>
                <h3>That scan did not finish</h3>
                <p>
                  Something went wrong while checking the rankings, and your
                  free check for today has not been used. Please try again.
                </p>
                <Button
                  className={styles.primary}
                  onClick={() => {
                    setState("CONFIGURING");
                    setResult(null);
                    setCode("");
                    setError("");
                  }}
                >
                  Start again
                </Button>
              </div>
            </div>
          ) : null}

          {state === "LIMIT_REACHED" ? (
            <div className={styles.form}>
              <div className={styles.failure}>
                <h3>You have had your free check today</h3>
                <p>
                  The free tool runs one 3×3 scan per email each day. A free
                  GridBeacon account lifts that, with bigger grids and saved
                  history.
                </p>
              </div>
            </div>
          ) : null}

          {error ? (
            <p role="status" className={styles.errorNote}>
              {error}
            </p>
          ) : null}

          <div className={styles.scannerFoot}>
            3×3 local ranking grid
            <span>Real Google Maps results · One free scan per day</span>
          </div>
        </div>
      </div>
    </section>
  );
}
