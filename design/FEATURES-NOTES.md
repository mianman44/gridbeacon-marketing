# Features page redesign — 2026-09-09

Source: user-supplied Stitch `code.html`, `screen.png`, and `DESIGN.md` from the `stitch_gmb_rank_tracker_website` export. The HTML is the visual source of truth where its styling differs from the general design guide.

- `/features` preserves the original eight sections, inline SVG icons, feature screenshots, comparison table and footer.
- The shared marketing header matches the export and includes route-aware active links and a mobile menu. It is also used by the homepage.
- Export scripts are removed. Placeholder links are mapped to existing routes or sections.
- Original images and Plus Jakarta Sans weights 300–800 are self-hosted in `public/features-assets`.
- `design/features-tailwind.cjs` and `components/marketing/stitch-features.html` are the inputs for the separately compiled, scoped `public/features-utilities.css`. This preserves Tailwind 3 rendering without changing the application's Tailwind 4 dependencies.
- Local preview remains on port 3002. No local stack configuration or public deployment was changed.

After compiling export utilities, namespace all `--tw-` variables (`--sf-` for Features, `--sh-` for Home) to avoid conflicts with Tailwind 4 typed custom properties.
