"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  Copy,
  Download,
  ExternalLink,
  Loader2,
  MapPin,
  MessageSquareText,
  Radar,
  Search,
  Star,
} from "lucide-react";

import {
  CheckerError,
  searchBusinesses,
  type BusinessCandidate,
} from "@/lib/free-rank-checker";
import {
  REVIEW_EVENTS,
  fileSlug,
  messageTemplates,
  readReviewsUrl,
  trackReviewTool,
  writeReviewUrl,
} from "@/lib/review-link";
import styles from "./review-link.module.css";

type Qr = { png: string; svg: string };

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    /* Older browsers, or a page without clipboard permission. */
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  }
}

export function ReviewLinkTool() {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [candidates, setCandidates] = useState<BusinessCandidate[]>([]);
  const [selected, setSelected] = useState<BusinessCandidate | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");
  const [qr, setQr] = useState<Qr | null>(null);

  const link = selected ? writeReviewUrl(selected.place_id) : "";

  /* The QR code is drawn in the browser; the library loads only once a
     business has been picked. */
  useEffect(() => {
    if (!link) return;
    let cancelled = false;

    (async () => {
      const QRCode = (await import("qrcode")).default;
      const options = { margin: 2, errorCorrectionLevel: "M" as const };
      const [png, svg] = await Promise.all([
        QRCode.toDataURL(link, { ...options, width: 1024 }),
        QRCode.toString(link, { ...options, type: "svg" }),
      ]);
      if (!cancelled) setQr({ png, svg });
    })().catch(() => {
      if (!cancelled) setQr(null);
    });

    return () => {
      cancelled = true;
    };
  }, [link]);

  async function find(event: FormEvent) {
    event.preventDefault();
    const text = query.trim();
    if (searching || text.length < 2) return;

    setSearching(true);
    setError("");
    setSelected(null);
    setQr(null);
    trackReviewTool(REVIEW_EVENTS.searched);

    try {
      const found = await searchBusinesses(text);
      setCandidates(found.businesses);
      if (!found.businesses.length) {
        setError("No Google Business Profile matched that. Try the exact business name and city.");
      }
    } catch (caught) {
      setCandidates([]);
      setError(
        caught instanceof CheckerError
          ? caught.message
          : "Search is unavailable right now. Please try again shortly.",
      );
    } finally {
      setSearching(false);
    }
  }

  function choose(business: BusinessCandidate) {
    setSelected(business);
    setCandidates([]);
    setCopied("");
    trackReviewTool(REVIEW_EVENTS.generated);
  }

  async function copy(key: string, text: string) {
    if (await copyText(text)) {
      setCopied(key);
      trackReviewTool(REVIEW_EVENTS.copied, { what: key });
      window.setTimeout(() => setCopied((current) => (current === key ? "" : current)), 2000);
    }
  }

  const slug = selected ? fileSlug(selected.business_name) : "";
  const templates = selected ? messageTemplates(selected.business_name, link) : null;

  return (
    <div className={styles.tool} id="review-tool">
      <form className={styles.search} onSubmit={find} role="search" aria-label="Find your Google Business Profile">
        <label htmlFor="review-business" className={styles.label}>
          Find your business on Google
        </label>
        <div className={styles.searchRow}>
          <input
            id="review-business"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Business name and city"
            maxLength={160}
            autoComplete="organization"
          />
          <button type="submit" disabled={searching || query.trim().length < 2}>
            {searching ? <Loader2 size={16} className={styles.spin} aria-hidden="true" /> : <Search size={16} aria-hidden="true" />}
            Search
          </button>
        </div>
        <p className={styles.hint}>Free, no account needed. Works for any business listed on Google Maps.</p>
      </form>

      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}

      {candidates.length ? (
        <ul className={styles.candidates} aria-label="Matching businesses">
          {candidates.map((business) => (
            <li key={business.place_id}>
              <button type="button" onClick={() => choose(business)}>
                <strong>{business.business_name}</strong>
                <span>
                  <MapPin size={12} aria-hidden="true" /> {business.formatted_address || "Address hidden on Google"}
                </span>
                {business.rating ? (
                  <span className={styles.rating}>
                    <Star size={12} aria-hidden="true" /> {business.rating.toFixed(1)}
                    {business.reviews != null ? ` · ${business.reviews.toLocaleString()} reviews` : ""}
                  </span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {selected && templates ? (
        <div className={styles.result} aria-live="polite">
          <div className={styles.business}>
            <Check size={16} aria-hidden="true" />
            <div>
              <strong>{selected.business_name}</strong>
              <span>{selected.formatted_address || "Address hidden on Google"}</span>
            </div>
          </div>

          <label className={styles.label} htmlFor="review-link">
            Your Google review link
          </label>
          <div className={styles.linkRow}>
            <input id="review-link" readOnly value={link} onFocus={(event) => event.currentTarget.select()} />
            <button type="button" className={styles.primary} onClick={() => copy("link", link)}>
              {copied === "link" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
              {copied === "link" ? "Copied" : "Copy"}
            </button>
          </div>
          <div className={styles.inlineLinks}>
            <a href={link} target="_blank" rel="noopener nofollow">
              Test the link <ExternalLink size={13} aria-hidden="true" />
            </a>
            <a href={readReviewsUrl(selected.place_id)} target="_blank" rel="noopener nofollow">
              See current reviews <ExternalLink size={13} aria-hidden="true" />
            </a>
          </div>

          <div className={styles.qrRow}>
            <div className={styles.qrBox}>
              {qr ? (
                // A data URL generated in the browser; next/image has nothing to optimise.
                // eslint-disable-next-line @next/next/no-img-element
                <img src={qr.png} alt={`QR code that opens the Google review form for ${selected.business_name}`} width={168} height={168} />
              ) : (
                <Loader2 size={22} className={styles.spin} aria-label="Drawing QR code" />
              )}
            </div>
            <div className={styles.qrText}>
              <strong>QR code for print</strong>
              <span>Counter signs, receipts, invoices and table cards. Customers scan it and land on your review form.</span>
              <div className={styles.qrButtons}>
                <a
                  className={styles.secondary}
                  href={qr?.png}
                  download={`${slug}-google-review-qr.png`}
                  aria-disabled={!qr}
                  onClick={() => trackReviewTool(REVIEW_EVENTS.qrDownloaded, { format: "png" })}
                >
                  <Download size={14} aria-hidden="true" /> PNG
                </a>
                <a
                  className={styles.secondary}
                  href={qr ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(qr.svg)}` : undefined}
                  download={`${slug}-google-review-qr.svg`}
                  aria-disabled={!qr}
                  onClick={() => trackReviewTool(REVIEW_EVENTS.qrDownloaded, { format: "svg" })}
                >
                  <Download size={14} aria-hidden="true" /> SVG
                </a>
              </div>
            </div>
          </div>

          <details className={styles.templates}>
            <summary>
              <MessageSquareText size={15} aria-hidden="true" /> Ready-to-send messages
            </summary>
            <div className={styles.template}>
              <div className={styles.templateHead}>
                <span>Text message</span>
                <button type="button" onClick={() => copy("sms", templates.sms)}>
                  {copied === "sms" ? "Copied" : "Copy"}
                </button>
              </div>
              <p>{templates.sms}</p>
            </div>
            <div className={styles.template}>
              <div className={styles.templateHead}>
                <span>Email</span>
                <button type="button" onClick={() => copy("email", templates.email)}>
                  {copied === "email" ? "Copied" : "Copy"}
                </button>
              </div>
              <p className={styles.pre}>{templates.email}</p>
            </div>
          </details>

          <a
            className={styles.next}
            href={`/google-maps-rank-checker?business=${encodeURIComponent(selected.business_name)}`}
            onClick={() => trackReviewTool(REVIEW_EVENTS.rankCheckClick)}
          >
            <Radar size={18} aria-hidden="true" />
            <span>
              <strong>Reviews done. Now, where do you rank?</strong>
              <span>See {selected.business_name}&apos;s Google Maps rank at 9 points around it, free.</span>
            </span>
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      ) : null}
    </div>
  );
}
