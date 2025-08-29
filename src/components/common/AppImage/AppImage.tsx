import { FunctionComponent } from 'react';
import NextImage, { ImageProps } from 'next/image';

interface AppImageProps extends Omit<ImageProps, 'alt'> {
  alt?: string; // Make property optional as it was before NextJs v13
}

/**
 * Application wrapper around NextJS image with some default props
 * @component AppImage
 */
const AppImage: FunctionComponent<AppImageProps> = ({
  title, // Note: value has be destructed before usage as default value for other property
  alt = title ?? 'Image',
  src,
  height = 256,
  width = 256,
  ...rest
}) => {
  // Provide defaults only when width/height not supplied and not using fill
  const isFill = (rest as any).fill;
  const finalWidth = isFill ? undefined : (width ?? 256);
  const finalHeight = isFill ? undefined : (height ?? 256);

  return (
    <NextImage
      src={src}
      alt={alt}
      title={title}
      width={finalWidth}
      height={finalHeight}
      unoptimized
      {...rest}
    />
  );
};

export default AppImage;
