/*
 * The people behind GridBeacon, for /about, /contact and the
 * Organization structured data. Only what the founders asked to be
 * public: names, roles, photos, and social profiles where given
 * (the co-founder asked for none).
 */

export interface TeamMember {
  name: string;
  role: string;
  /* A photo under /public/company, or none (initials are shown). */
  photo?: { src: string; width: number; height: number };
  profiles: { label: string; url: string }[];
}

export const TEAM: TeamMember[] = [
  {
    name: "Shehriyar Tahir",
    role: "Founder",
    photo: { src: "/company/shehriyar-tahir-founder-20261103.webp", width: 480, height: 600 },
    profiles: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/shehriyar-tahir-80196112b/" },
      { label: "X", url: "https://x.com/shehr43251" },
      { label: "Facebook", url: "https://www.facebook.com/profile.php?id=61595231125000" },
    ],
  },
  {
    name: "Asfand Yar Tahir",
    role: "Co-founder",
    photo: { src: "/company/asfand-yar-tahir-cofounder-20261103.webp", width: 384, height: 480 },
    profiles: [],
  },
];

export const initials = (name: string) =>
  name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
