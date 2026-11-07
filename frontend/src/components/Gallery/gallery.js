import React, { useMemo } from 'react';
import DomeGallery from './DomeGallery';

/**
 * Import all images from lp event wise folder dynamically
 */
function importAllImages() {
  try {
    // Use require.context to import all images from the folder
    const context = require.context(
      '../../assets/lp event wise',
      false, // Don't search subdirectories
      /\.(jpe?g|png|gif|webp)$/i
    );

    const images = context.keys().map((key) => {
      const filename = key.replace('./', '');
      return {
        src: context(key),
        alt: filename
      };
    });

    console.log('Loaded images from lp event wise:', images.length, images);
    return images;
  } catch (error) {
    console.error('Error loading images:', error);
    return [];
  }
}

export default function Gallery() {
  // Load all images from lp event wise folder
  const images = useMemo(() => importAllImages(), []);

  return (
    <div style={{ width: '100%', height: '100dvh', overflow: 'hidden' }}>
      <DomeGallery
        images={images}
        grayscale={false}
        openedImageWidth={null}
        openedImageHeight={null}
      />
    </div>
  );
}
