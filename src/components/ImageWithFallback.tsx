import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
}

export const ImageWithFallback = ({
  src,
  alt,
  className,
}: ImageWithFallbackProps) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`grid aspect-[4/5] place-items-center bg-ink text-center text-paper ${className ?? ''}`}
      >
        <span className="max-w-40 text-sm font-semibold">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={() => setFailed(true)}
    />
  );
};
