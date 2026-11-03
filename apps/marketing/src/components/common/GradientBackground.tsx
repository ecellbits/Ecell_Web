import React from 'react';

export default function GradientBackground({ children }) {
    return (
        <div className="relative min-h-screen w-full bg-page">
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
