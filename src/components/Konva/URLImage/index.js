import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

export default function URLImage({ src, ...props }) {
  const [image] = useImage(src);
  return <Image image={image} {...props} />;
}
