import DomeGallery from './DomeGallery';

const imageModules = import.meta.glob<string>(
  '../../assets/lp event wise/*.{jpg,jpeg,JPG,JPEG,png,PNG,gif,GIF,webp,WEBP}',
  { eager: true, query: '?url', import: 'default' }
);

const images = Object.entries(imageModules).map(([path, src]) => ({
  src,
  alt: path.split('/').pop() ?? 'E-Cell Gallery Image'
}));

export default function Gallery() {
  return (
    <div className="h-dvh w-full">
      <DomeGallery
        images={images}
        grayscale={false}
        openedImageWidth={null}
        openedImageHeight={null}
      />
    </div>
  );
}

export { Gallery as Comp };
