# How It Works redesign

The user-supplied Stitch export from `stitch_gmb_rank_tracker_website (2)` supplies the page layout, copy, SVG icons and five original images. Its header and footer are replaced by the shared marketing components as requested.

The grid selector supports 3×3, 5×5, 9×9, 13×13 and 21×21. It updates credits, suggested radius, illustrative scan duration and business fit. The selector is keyboard accessible. All jump links resolve to page sections; signup and live-demo actions use existing routes.

Styles use the original Tailwind 3 configuration, scoped to `#stitch-how`. After compilation, rename `--tw-` custom properties to `--sw-` to avoid Tailwind 4 property conflicts. Original export scripts are removed; behavior is implemented in the scoped React component.
