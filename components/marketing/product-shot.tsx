import Image from "next/image";

type ProductShotProps = {
  src: string;
  alt: string;
  width: number;
  height: number;

  /** Draws browser chrome above the image. */
  chrome?: boolean;

  /** Loads eagerly. Set on the hero shot only. */
  priority?: boolean;

  className?: string;
};

/*
 * A real screenshot of GridBeacon.
 *
 * The old home page drew its own heatmap out of coloured divs.
 * That was a picture OF the product rather than the product, and
 * for a tool whose whole value is what the map looks like, the
 * screenshot is the argument. Everything here exists to let the
 * image carry it: the frame is quiet, the chrome is optional, and
 * nothing is layered on top.
 *
 * `alt` is written as a claim rather than a label -- "a nine by
 * nine grid where rank falls from 1 downtown to 14 four miles
 * east" -- because a reader who cannot see the image should still
 * get the point the image is making.
 */
export function ProductShot({
  src,
  alt,
  width,
  height,
  chrome = false,
  priority = false,
  className = "",
}: ProductShotProps) {
  return (
    <figure
      className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_70px_-24px_rgba(15,23,42,0.28)] ${className}`}
    >
      {chrome && (
        <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        </div>
      )}

      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="block h-auto w-full"
      />
    </figure>
  );
}
