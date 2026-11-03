import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const BlurImage = ({ src, alt, className, style }) => {
    // Initial state should ideally be false if we can detect it, 
    // but in SSR or first mount we can't always. 
    // We'll use a very fast transition to minimize flicker.
    const imgRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (imgRef.current?.complete) {
            setIsLoading(false);
        }
    }, [src]);

    return (
        <div className={`relative overflow-hidden ${className}`} style={style}>
            <motion.img
                ref={imgRef}
                src={src}
                alt={alt}
                initial={{ filter: 'blur(4px)', opacity: 0.8 }}
                animate={{
                    filter: isLoading ? 'blur(4px)' : 'blur(0px)',
                    opacity: 1,
                    scale: isLoading ? 1.02 : 1,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full h-full object-cover"
                onLoad={() => setIsLoading(false)}
            />
        </div>
    );
};

export default BlurImage;

