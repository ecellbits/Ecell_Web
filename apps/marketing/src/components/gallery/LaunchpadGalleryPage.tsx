import React from 'react';
import DomeGallery from './DomeGallery';
import SEO from '@/components/common/SEO';

// Import optimized gallery images (compressed from 404MB to 7.5MB)
import img1 from '@/assets/Gallery-optimized/1f4814c7-a5cd-4a44-96e8-4cd4956d33a1.jpg';
import img2 from '@/assets/Gallery-optimized/2bc82188-5eaa-4975-a051-0858f493c8c8.jpg';
import img3 from '@/assets/Gallery-optimized/7dec7ad9-75a7-4ac1-bbc0-7f6133c408ba.jpg';
import img4 from '@/assets/Gallery-optimized/A7C01434.jpg';
import img5 from '@/assets/Gallery-optimized/A7C01482.jpg';
import img6 from '@/assets/Gallery-optimized/A7C01490.jpg';
import img7 from '@/assets/Gallery-optimized/A7C01516.jpg';
import img8 from '@/assets/Gallery-optimized/A7C01533.jpg';
import img9 from '@/assets/Gallery-optimized/A7C07547.jpg';
import img10 from '@/assets/Gallery-optimized/A7C07609.jpg';
import img11 from '@/assets/Gallery-optimized/A7C07679.jpg';
import img12 from '@/assets/Gallery-optimized/DSC08244.jpg';
import img13 from '@/assets/Gallery-optimized/DSC08248.jpg';
import img14 from '@/assets/Gallery-optimized/IMG-20250403-WA0073.jpg';
import img15 from '@/assets/Gallery-optimized/IMG-20250403-WA0074.jpg';
import img16 from '@/assets/Gallery-optimized/IMG-20250403-WA0075.jpg';
import img17 from '@/assets/Gallery-optimized/IMG-20250403-WA0076.jpg';
import img18 from '@/assets/Gallery-optimized/IMG-20250403-WA0077.jpg';
import img19 from '@/assets/Gallery-optimized/IMG-20250403-WA0078.jpg';
import img20 from '@/assets/Gallery-optimized/IMG-20250403-WA0079.jpg';
import img21 from '@/assets/Gallery-optimized/IMG-20250403-WA0080.jpg';
import img22 from '@/assets/Gallery-optimized/IMG-20250403-WA0081.jpg';
import img23 from '@/assets/Gallery-optimized/IMG-20250403-WA0082.jpg';
import img24 from '@/assets/Gallery-optimized/IMG-20250403-WA0083.jpg';
import img25 from '@/assets/Gallery-optimized/ZAK06284.jpg';
import img26 from '@/assets/Gallery-optimized/ZAK06380.jpg';
import img27 from '@/assets/Gallery-optimized/ZAK06519.jpg';
import img28 from '@/assets/Gallery-optimized/ZAK06787.jpg';
import img29 from '@/assets/Gallery-optimized/ZAK06891.jpg';
import img30 from '@/assets/Gallery-optimized/ZAK06906.jpg';
import img31 from '@/assets/Gallery-optimized/ZAK06914.jpg';
import img32 from '@/assets/Gallery-optimized/ZAK06930.jpg';
import img33 from '@/assets/Gallery-optimized/ZAK07592.jpg';
import img34 from '@/assets/Gallery-optimized/ZAK08249.jpg';
import img35 from '@/assets/Gallery-optimized/ZAK09026.jpg';

export default function LaunchpadGallery() {
    const images = [
        { src: img1, alt: 'Launchpad Gallery Image 1' },
        { src: img2, alt: 'Launchpad Gallery Image 2' },
        { src: img3, alt: 'Launchpad Gallery Image 3' },
        { src: img4, alt: 'Launchpad Gallery Image 4' },
        { src: img5, alt: 'Launchpad Gallery Image 5' },
        { src: img6, alt: 'Launchpad Gallery Image 6' },
        { src: img7, alt: 'Launchpad Gallery Image 7' },
        { src: img8, alt: 'Launchpad Gallery Image 8' },
        { src: img9, alt: 'Launchpad Gallery Image 9' },
        { src: img10, alt: 'Launchpad Gallery Image 10' },
        { src: img11, alt: 'Launchpad Gallery Image 11' },
        { src: img12, alt: 'Launchpad Gallery Image 12' },
        { src: img13, alt: 'Launchpad Gallery Image 13' },
        { src: img14, alt: 'Launchpad Gallery Image 14' },
        { src: img15, alt: 'Launchpad Gallery Image 15' },
        { src: img16, alt: 'Launchpad Gallery Image 16' },
        { src: img17, alt: 'Launchpad Gallery Image 17' },
        { src: img18, alt: 'Launchpad Gallery Image 18' },
        { src: img19, alt: 'Launchpad Gallery Image 19' },
        { src: img20, alt: 'Launchpad Gallery Image 20' },
        { src: img21, alt: 'Launchpad Gallery Image 21' },
        { src: img22, alt: 'Launchpad Gallery Image 22' },
        { src: img23, alt: 'Launchpad Gallery Image 23' },
        { src: img24, alt: 'Launchpad Gallery Image 24' },
        { src: img25, alt: 'Launchpad Gallery Image 25' },
        { src: img26, alt: 'Launchpad Gallery Image 26' },
        { src: img27, alt: 'Launchpad Gallery Image 27' },
        { src: img28, alt: 'Launchpad Gallery Image 28' },
        { src: img29, alt: 'Launchpad Gallery Image 29' },
        { src: img30, alt: 'Launchpad Gallery Image 30' },
        { src: img31, alt: 'Launchpad Gallery Image 31' },
        { src: img32, alt: 'Launchpad Gallery Image 32' },
        { src: img33, alt: 'Launchpad Gallery Image 33' },
        { src: img34, alt: 'Launchpad Gallery Image 34' },
        { src: img35, alt: 'Launchpad Gallery Image 35' },
    ];

    return (
        <div style={{ width: '100%', height: '100dvh', background: '#000' }}>
            <SEO
                title="Gallery | Launchpad 2026"
                description="Explore the memories of Launchpad 2026. Highlights from BITS Pilani Hyderabad's flagship entrepreneurship event."
                keywords={['Launchpad 2026', 'Gallery', 'BITS Pilani Hyderabad', 'E-Cell', 'Entrepreneurship Events']}
                url="https://ecellbphc.in/launchpad/gallery"
            />
            <DomeGallery images={images} grayscale={false} />
        </div>
    );
}

export { LaunchpadGallery as Comp };
