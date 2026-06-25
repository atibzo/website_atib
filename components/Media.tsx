import Image from "next/image";
import type { Media as MediaType } from "@/config/site";

/**
 * Renders a config media item (image or video) filling its parent. Videos use
 * native controls + a poster so they work before/without autoplay; images use
 * next/image. Parent should be `relative` with a fixed aspect ratio.
 */
export default function Media({
  media,
  className = "",
  priority = false,
}: {
  media: MediaType;
  className?: string;
  priority?: boolean;
}) {
  if (media.type === "video") {
    return (
      <video
        className={`h-full w-full object-cover ${className}`}
        poster={media.poster}
        controls
        playsInline
        preload="metadata"
        aria-label={media.alt}
      >
        <source src={media.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }
  return (
    <Image
      src={media.src}
      alt={media.alt}
      fill
      priority={priority}
      sizes="(max-width: 640px) 80vw, 360px"
      className={`object-cover ${className}`}
    />
  );
}
