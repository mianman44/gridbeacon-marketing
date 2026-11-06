/* Copied from the app (frontend/lib/rank-colors.ts) so the free rank
   checker paints exactly the colours a customer sees after signing up.
   Keep the two in step. */

/**
 * One colour per rank, for the grid points.
 *
 * The four bands stay exactly where they were -- 1-3 green, 4-10
 * blue, 11-20 amber, 21+ red, unranked grey -- because the band
 * is what carries the meaning: green is the map pack, red is off
 * the first page. What changes is that a rank now has its own
 * shade inside its band instead of sharing one flat fill with its
 * neighbours, so #1 and #3 are no longer the same dot.
 *
 * The scale DIVERGES: it is boldest at both ends and lightest in
 * the middle. #1 is the darkest green and lightens through #3, as
 * asked; blue keeps lightening to #10; then amber starts pale and
 * DARKENS through #20 into a deep red at #30.
 *
 * The turn in the middle is the point. A ramp that only ever
 * lightened would make #39 the palest dot on the grid -- the
 * worst rank looking like the gentlest thing on the map, and a
 * mediocre #21 looking more alarming than it is. Running it back
 * the other way keeps intensity meaning "this is a strong signal"
 * at both ends: deep green where you win, deep red where you
 * lose, and the washed-out middle is genuinely the middle.
 *
 * Label colour is picked per shade rather than fixed to white,
 * because the pale centre of the ramp cannot carry white text.
 */

type Hsl = {
  h: number;
  s: number;
  l: number;
};

type Band = {
  /** Inclusive rank range this band covers. */
  from: number;
  to: number;
  /** Shade at the band's best rank. */
  best: Hsl;
  /** Shade at the band's worst rank. */
  worst: Hsl;
};

/**
 * `to` on the last band is where the ramp stops, not where the
 * band stops: #30 and #300 are equally far off the first page,
 * and there is nothing left to say by darkening further.
 *
 * Each band's endpoints are chosen so the joins are seamless --
 * the worst shade of one band sits next to the best shade of the
 * next, so #3 → #4 and #10 → #11 change hue without jumping in
 * weight.
 */
const BANDS: Band[] = [
  // 1-3 · deep green lightening. The old flat colour was #16b364,
  // which is roughly where #3 now lands.
  {
    from: 1,
    to: 3,
    best: { h: 157, s: 88, l: 20 },
    worst: { h: 152, s: 76, l: 38 },
  },
  // 4-10 · keeps lightening, through blue.
  {
    from: 4,
    to: 10,
    best: { h: 217, s: 78, l: 38 },
    worst: { h: 205, s: 88, l: 57 },
  },
  // 11-20 · the turn. Starts pale and gathers weight.
  {
    from: 11,
    to: 20,
    best: { h: 43, s: 92, l: 58 },
    worst: { h: 26, s: 92, l: 44 },
  },
  // 21+ · straight on into deep red.
  {
    from: 21,
    to: 30,
    best: { h: 5, s: 82, l: 54 },
    worst: { h: 348, s: 78, l: 32 },
  },
];

const UNRANKED: Hsl = { h: 213, s: 12, l: 65 };

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/**
 * Hue is a circle, so it is interpolated the short way round.
 *
 * The red band runs from 5 degrees to 348, which are 17 degrees
 * apart across zero. Mixed as plain numbers it travels the other
 * 343 degrees instead, and the dots between #21 and #30 come out
 * green, blue and purple.
 */
function mixHue(a: number, b: number, t: number) {
  const delta = ((((b - a) % 360) + 540) % 360) - 180;

  return (((a + delta * t) % 360) + 360) % 360;
}

function hslToHex({ h, s, l }: Hsl): string {
  const saturation = s / 100;
  const lightness = l / 100;

  const chroma =
    (1 - Math.abs(2 * lightness - 1)) * saturation;

  const secondary =
    chroma * (1 - Math.abs(((h / 60) % 2) - 1));

  const base = lightness - chroma / 2;

  const [r, g, b] =
    h < 60
      ? [chroma, secondary, 0]
      : h < 120
        ? [secondary, chroma, 0]
        : h < 180
          ? [0, chroma, secondary]
          : h < 240
            ? [0, secondary, chroma]
            : h < 300
              ? [secondary, 0, chroma]
              : [chroma, 0, secondary];

  const hex = (value: number) =>
    Math.round((value + base) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${hex(r)}${hex(g)}${hex(b)}`;
}

/** A step darker, for the marker's ring. */
function darken({ h, s, l }: Hsl, by: number): Hsl {
  return { h, s, l: Math.max(0, l - by) };
}

function toneFor(rank: number | null): Hsl {
  if (rank === null || !Number.isFinite(rank)) {
    return UNRANKED;
  }

  const band =
    BANDS.find((candidate) => rank <= candidate.to)
    ?? BANDS[BANDS.length - 1];

  // Every rank past the last band's `to` shares its deepest
  // shade. Clamped rather than extrapolated: there is no useful
  // difference between #40 and #90.
  const position = Math.min(
    Math.max(rank, band.from),
    band.to,
  );

  const steps = band.to - band.from;

  const t = steps === 0 ? 0 : (position - band.from) / steps;

  return {
    h: mixHue(band.best.h, band.worst.h, t),
    s: mix(band.best.s, band.worst.s, t),
    l: mix(band.best.l, band.worst.l, t),
  };
}

export type RankColor = {
  fill: string;
  border: string;
  text: string;
};

/**
 * The fill, ring and label colour for one grid point.
 *
 * `null` is a point where the business did not rank at all, which
 * is not the same as ranking badly and so is not on the ramp.
 */
export function rankColor(rank: number | null): RankColor {
  const tone = toneFor(rank);
  const fill = hslToHex(tone);

  return {
    fill,
    border: hslToHex(darken(tone, 8)),
    text: labelOn(fill),
  };
}

/** Relative luminance, per WCAG. */
function luminance(hex: string): number {
  const channels = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) =>
      v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4,
    );

  return (
    0.2126 * channels[0]
    + 0.7152 * channels[1]
    + 0.0722 * channels[2]
  );
}

/** Near-black, for the pale shades in the middle of the ramp. */
const DARK_LABEL = "#1e2530";

/**
 * Whichever of white or near-black reads better on this fill.
 *
 * The old scheme could hardcode white because every fill was
 * mid-dark. A diverging ramp has a pale centre -- #10 and #11 in
 * particular -- where white text all but disappears, so the label
 * has to follow the fill rather than the other way round.
 */
function labelOn(fill: string): string {
  const l = luminance(fill);

  const onWhite = 1.05 / (l + 0.05);
  const onDark = (l + 0.05) / (luminance(DARK_LABEL) + 0.05);

  return onDark > onWhite ? DARK_LABEL : "#ffffff";
}

/** Just the fill, for the many places that only need one colour. */
export function rankFill(rank: number | null): string {
  return hslToHex(toneFor(rank));
}

/**
 * The legend still describes bands, not thirty shades.
 *
 * A reader does not need to be told that #2 is darker than #3 --
 * they can see it. What they need is what the hue means, so each
 * swatch shows the band's range using its mid shade.
 */
export const RANK_BANDS = [
  { label: "1 – 3", color: rankFill(2) },
  { label: "4 – 10", color: rankFill(7) },
  { label: "11 – 20", color: rankFill(15) },
  { label: "21+", color: rankFill(25) },
  { label: "Not ranked", color: rankFill(null) },
] as const;

/*
 * THE GAP SCALE
 *
 * A different question from the rank scale, so a different scale.
 *
 * On the rank grid the colour answers "how well am I doing here";
 * on the gap grid it answers "who is winning here, and by how
 * much". Reusing the rank ramp would say green at #3 and green at
 * "+3 ahead" while meaning two unrelated things, so this diverges
 * around a neutral middle instead: green where the tracked
 * business leads, red where the competitor does, and a flat slate
 * where they are level.
 *
 * Depth is the size of the lead, capped -- past ten positions the
 * difference between a big gap and a bigger one is not worth a
 * shade, and the colour has to stay readable.
 */

const GAP_CAP = 10;

const GAP_AHEAD_NEAR: Hsl = { h: 152, s: 76, l: 42 };
const GAP_AHEAD_FAR: Hsl = { h: 157, s: 88, l: 22 };

const GAP_BEHIND_NEAR: Hsl = { h: 5, s: 82, l: 56 };
const GAP_BEHIND_FAR: Hsl = { h: 348, s: 78, l: 34 };

/** Level, or nothing to compare. */
const GAP_LEVEL: Hsl = { h: 213, s: 12, l: 62 };

/**
 * `gap` is the tracked business's lead in positions: positive
 * means it ranks better here, negative means the competitor does.
 * `null` is a point where one of the two was not recorded, which
 * is not a tie and must not be coloured as one.
 */
export function gapColor(
  gap: number | null | undefined,
): RankColor {
  if (gap == null || !Number.isFinite(gap) || gap === 0) {
    const fill = hslToHex(GAP_LEVEL);

    return {
      fill,
      border: hslToHex(darken(GAP_LEVEL, 8)),
      text: labelOn(fill),
    };
  }

  const t = Math.min(Math.abs(gap), GAP_CAP) / GAP_CAP;

  const [near, far] =
    gap > 0
      ? [GAP_AHEAD_NEAR, GAP_AHEAD_FAR]
      : [GAP_BEHIND_NEAR, GAP_BEHIND_FAR];

  const tone: Hsl = {
    h: mixHue(near.h, far.h, t),
    s: mix(near.s, far.s, t),
    l: mix(near.l, far.l, t),
  };

  const fill = hslToHex(tone);

  return {
    fill,
    border: hslToHex(darken(tone, 8)),
    text: labelOn(fill),
  };
}

/**
 * The tracked business's lead over a competitor at one point.
 *
 * Absent from the results is still a result: whoever is missing sits
 * somewhere past the recorded depth, so the other one is ahead by at
 * least that much, and the label says "at least". Only a point where
 * neither was recorded has nothing to compare.
 */
export function competitorGap(
  ownRank: number | null,
  theirRank: number | null,
  searchDepth: number,
): { gap: number | null; gapLabel?: string } {
  if (ownRank == null && theirRank == null) {
    return { gap: null };
  }

  if (ownRank == null || theirRank == null) {
    const beyondResults = searchDepth + 1;
    const gap =
      ownRank == null
        ? (theirRank as number) - beyondResults
        : beyondResults - ownRank;

    return { gap, gapLabel: `${formatGap(gap)}+` };
  }

  return { gap: theirRank - ownRank };
}

/** "+7", "−4", "level", "—". The minus is a real minus sign. */
export function formatGap(
  gap: number | null | undefined,
): string {
  if (gap == null || !Number.isFinite(gap)) return "—";
  if (gap === 0) return "=";

  return gap > 0 ? `+${gap}` : `−${Math.abs(gap)}`;
}
