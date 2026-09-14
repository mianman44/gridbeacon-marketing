import type { Metadata } from "next";

/* The one place the public URLs live. Canonicals, social tags,
   structured data and the sign-in links all read from here, so the
   domain cannot drift between them. */
export const SITE_URL = "https://gridbeaconhq.com";

/* The app is a separate host. Linking to it directly skips the
   301 that Caddy answers /login and /signup with on this domain. */
export const APP_URL = "https://app.gridbeaconhq.com";
export const LOGIN_URL = `${APP_URL}/login`;
export const SIGNUP_URL = `${APP_URL}/signup`;

const SOCIAL_IMAGE = {
  url: "/artwork/local-advantage-city.png",
  // The asset's true size. Social scrapers crop to their own ratio;
  // declaring a size it is not makes them crop the wrong region.
  width: 1536,
  height: 1024,
  alt: "A geographic grid laid over a city, showing local ranking coverage",
};

interface PageMetadataInput {
  path: string;
  title: string;
  description: string;
  /* Set for a title that already carries the brand, so the
     layout's "%s | GridBeacon" template is not applied twice. */
  absoluteTitle?: boolean;
}

/* Metadata for one public page.

   Every page sets its own canonical and og:url. Next merges
   metadata shallowly, so a canonical or openGraph object set in the
   root layout is inherited whole by any page that does not replace
   it -- which is how /about, /contact and the legal pages all ended
   up declaring the home page as their canonical URL. */
export function pageMetadata({
  path,
  title,
  description,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const fullTitle = absoluteTitle ? title : `${title} | GridBeacon`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "GridBeacon",
      url,
      title: fullTitle,
      description,
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [SOCIAL_IMAGE.url],
    },
  };
}
