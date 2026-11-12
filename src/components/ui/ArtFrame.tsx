import Image from "next/image";
import { cn } from "@/lib/utils";

export function ArtFrame({
  src,
  alt,
  caption,
  ratio = "aspect-square",
  sizes,
  preload = false,
  className,
  objectPosition = "center",
}: {
  src: string;
  alt: string;
  caption: string;
  ratio?: string;
  sizes: string;
  preload?: boolean;
  className?: string;
  objectPosition?: string;
}) {
  return (
    <figure className={cn("group relative overflow-hidden rounded-[1.2rem]", className)}>
      <div className={cn("relative bg-navy-800", ratio)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          quality={88}
          className="object-cover motion-safe:transition motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.03]"
          style={{ objectPosition }}
        />
      </div>
      <figcaption className="sr-only">{caption}</figcaption>
    </figure>
  );
}
