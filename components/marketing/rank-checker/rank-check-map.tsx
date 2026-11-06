"use client";

/*
 * The free rank checker's heatmap, drawn the way the app draws it: a
 * real Google map, the same teardrop pins and colour scale, faint
 * connector lines between neighbouring points and the business marker
 * at the centre. A visitor sees what their account would look like.
 *
 * Built from the coordinates the result API already returns. If Maps
 * cannot load (no key on this build, the key refused, a blocked
 * script) `onUnavailable` fires and the caller shows its drawn grid
 * instead, so the result is never blank.
 */

import { useEffect, useRef, useState } from "react";
import { importLibrary, setOptions } from "@googlemaps/js-api-loader";
import { ArrowRight, X } from "lucide-react";

import { RANK_BANDS, rankColor, rankFill } from "@/lib/rank-colors";
import type { CheckResult } from "@/lib/free-rank-checker";
import styles from "./rank-check-map.module.css";

type Point = CheckResult["points"][number];

type MappedPoint = Point & { latitude: number; longitude: number };

let loaderConfigured = false;

function configureLoader(key: string) {
  if (loaderConfigured) return;
  setOptions({ key, v: "weekly" });
  loaderConfigured = true;
}

function hasCoordinates(point: Point): point is MappedPoint {
  return (
    typeof point.latitude === "number"
    && typeof point.longitude === "number"
    && Number.isFinite(point.latitude)
    && Number.isFinite(point.longitude)
  );
}

function pointKey(point: Point) {
  return `${point.grid_row}-${point.grid_col}`;
}

/* The app's connector colour: the ramp between the two ranks it joins. */
function connectorColor(a: number | null, b: number | null) {
  if (a === null || b === null) return rankFill(null);
  return rankFill((a + b) / 2);
}

const BUSINESS_ICON = `
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 10.5V20h14v-9.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M4 10.5h16L18.5 5h-13L4 10.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M8 20v-5h8v5" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M4.5 10.5c.2 1.2 1 2 2.1 2 1 0 1.8-.6 2.2-1.5.4.9 1.2 1.5 2.2 1.5s1.8-.6 2.2-1.5c.4.9 1.2 1.5 2.2 1.5 1.1 0 1.9-.8 2.1-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`;

function paintPin(wrapper: HTMLElement, point: Point) {
  const colors = rankColor(point.rank);
  const label = point.rank === null ? "NR" : String(point.rank);

  wrapper.style.setProperty("--rank-fill", colors.fill);
  wrapper.style.setProperty("--rank-border", colors.border);
  wrapper.style.setProperty("--rank-text", colors.text);
  wrapper.setAttribute(
    "aria-label",
    point.rank === null ? "Not ranked at this point" : `Rank ${point.rank} at this point`,
  );
  wrapper.innerHTML = `
    <span class="${styles.outer}">
      <span class="${styles.glow}"></span>
      <span class="${styles.pin}"></span>
      <span class="${styles.core}">${label}</span>
    </span>`;
}

export function RankCheckMap({
  result,
  signupUrl,
  onSignupClick,
  onUnavailable,
}: {
  result: CheckResult;
  signupUrl: string;
  onSignupClick?: () => void;
  onUnavailable: () => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinsRef = useRef(new Map<string, HTMLElement>());
  const onUnavailableRef = useRef(onUnavailable);
  const [selected, setSelected] = useState<Point | null>(null);

  useEffect(() => {
    onUnavailableRef.current = onUnavailable;
  }, [onUnavailable]);

  const points = result.points.filter(hasCoordinates);
  const size = result.grid_size || 3;
  const centre = Math.floor(size / 2);
  const pointsSignature = points
    .map((p) => `${pointKey(p)}:${p.rank}:${p.latitude}:${p.longitude}`)
    .join("|");

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID?.trim() || "DEMO_MAP_ID";

    if (!key || points.length === 0 || !containerRef.current) {
      onUnavailableRef.current();
      return;
    }

    let cancelled = false;
    const markers: google.maps.marker.AdvancedMarkerElement[] = [];
    const lines: google.maps.Polyline[] = [];
    const pins = pinsRef.current;

    /* Google calls this global when the key is refused, for example a
       referrer the key does not allow. The map would otherwise sit
       there as a grey "for development purposes only" box. */
    const authWindow = window as unknown as { gm_authFailure?: () => void };
    const previousAuthFailure = authWindow.gm_authFailure;
    authWindow.gm_authFailure = () => {
      previousAuthFailure?.();
      if (!cancelled) onUnavailableRef.current();
    };

    async function draw() {
      configureLoader(key!);

      const { Map: GoogleMap } = await importLibrary("maps");
      const { AdvancedMarkerElement } = await importLibrary("marker");

      if (cancelled || !containerRef.current) return;

      const map = new GoogleMap(containerRef.current, {
        center: { lat: points[0].latitude, lng: points[0].longitude },
        zoom: 12,
        mapId,
        /* A marketing page scrolls; one finger or a bare wheel must
           not get trapped panning the map. */
        gestureHandling: "cooperative",
        streetViewControl: false,
        fullscreenControl: true,
        fullscreenControlOptions: {
          position: google.maps.ControlPosition.RIGHT_BOTTOM,
        },
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          position: google.maps.ControlPosition.TOP_RIGHT,
          mapTypeIds: [
            google.maps.MapTypeId.ROADMAP,
            google.maps.MapTypeId.SATELLITE,
            google.maps.MapTypeId.HYBRID,
          ],
        },
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP,
        },
        clickableIcons: false,
      });

      map.addListener("click", () => setSelected(null));

      const lookup = new Map(points.map((p) => [pointKey(p), p]));

      for (const point of points) {
        for (const neighbour of [
          lookup.get(`${point.grid_row}-${point.grid_col + 1}`),
          lookup.get(`${point.grid_row + 1}-${point.grid_col}`),
        ]) {
          if (!neighbour) continue;

          lines.push(
            new google.maps.Polyline({
              map,
              path: [
                { lat: point.latitude, lng: point.longitude },
                { lat: neighbour.latitude, lng: neighbour.longitude },
              ],
              strokeColor: connectorColor(point.rank, neighbour.rank),
              strokeOpacity: 0.28,
              strokeWeight: 1.25,
              clickable: false,
              zIndex: 10,
            }),
          );
        }
      }

      for (const point of points) {
        const wrapper = document.createElement("button");
        wrapper.type = "button";
        wrapper.className = styles.marker;
        paintPin(wrapper, point);
        wrapper.addEventListener("click", (event) => {
          event.stopPropagation();
          setSelected(point);
        });
        pins.set(pointKey(point), wrapper);

        markers.push(
          new AdvancedMarkerElement({
            map,
            position: { lat: point.latitude, lng: point.longitude },
            content: wrapper,
            zIndex: 1000 - (point.rank ?? 100),
          }),
        );
      }

      /* The free check is drawn around the business, so its pin sits on
         the centre point; the badge marks it the way the app does. */
      const middle = lookup.get(`${centre}-${centre}`);
      if (middle) {
        const badge = document.createElement("div");
        badge.className = styles.business;
        badge.setAttribute("aria-label", `${result.business_name} location`);
        badge.innerHTML = `<span class="${styles.businessCore}">${BUSINESS_ICON}</span>`;

        markers.push(
          new AdvancedMarkerElement({
            map,
            position: { lat: middle.latitude, lng: middle.longitude },
            content: badge,
            title: result.business_name,
            zIndex: 2000,
          }),
        );
      }

      const bounds = new google.maps.LatLngBounds();
      points.forEach((p) => bounds.extend({ lat: p.latitude, lng: p.longitude }));

      const small = window.innerWidth < 768;
      map.fitBounds(
        bounds,
        small ? { top: 70, right: 36, bottom: 50, left: 36 } : 90,
      );
      google.maps.event.addListenerOnce(map, "idle", () => {
        const zoom = map.getZoom();
        if (zoom && zoom > 15) map.setZoom(15);
      });
    }

    draw().catch(() => {
      if (!cancelled) onUnavailableRef.current();
    });

    return () => {
      cancelled = true;
      authWindow.gm_authFailure = previousAuthFailure;
      markers.forEach((marker) => {
        marker.map = null;
      });
      lines.forEach((line) => line.setMap(null));
      pins.clear();
    };
    // pointsSignature stands in for the points array, which is a new
    // array on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointsSignature, result.business_name, centre]);

  /* Highlight the chosen pin the way the app does: ring plus a
     breathing glow, without rebuilding the markers. */
  useEffect(() => {
    const chosen = selected ? pointKey(selected) : null;
    pinsRef.current.forEach((pin, key) => {
      pin.classList.toggle(styles.selected, key === chosen);
    });
  }, [selected]);

  const ahead =
    selected?.rank != null ? Math.max(selected.rank - 1, 0) : null;

  return (
    <div className={styles.frame}>
      <div ref={containerRef} className={styles.map} />

      <div className={styles.legend} aria-label="Rank colours">
        <p>Google Maps rank</p>
        <ul>
          {RANK_BANDS.map((band) => (
            <li key={band.label}>
              <i style={{ background: band.color }} aria-hidden="true" />
              {band.label}
            </li>
          ))}
        </ul>
      </div>

      {selected ? (
        <div className={styles.pointCard} role="dialog" aria-label="This grid point">
          <button
            type="button"
            className={styles.pointClose}
            onClick={() => setSelected(null)}
            aria-label="Close"
          >
            <X size={14} aria-hidden="true" />
          </button>

          <span className={styles.pointEyebrow}>
            {selected.grid_row === centre && selected.grid_col === centre
              ? "At your business"
              : "At this grid point"}
          </span>

          <strong className={styles.pointRank}>
            {selected.rank === null ? "Not ranked" : `#${selected.rank}`}
          </strong>

          <p>
            {selected.rank === null
              ? `${result.business_name} does not show up in the Google Maps results here.`
              : ahead === 0
                ? `${result.business_name} is the first result here.`
                : `${ahead} ${ahead === 1 ? "business ranks" : "businesses rank"} above ${result.business_name} here.`}
          </p>

          <a
            className={styles.pointCta}
            href={signupUrl}
            onClick={onSignupClick}
          >
            {ahead === 0 ? "Track this every week" : "See who ranks here"}
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>
      ) : (
        <p className={styles.hint}>Click a pin to see that spot</p>
      )}
    </div>
  );
}
