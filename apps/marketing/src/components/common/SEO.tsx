import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO Component for managing page metadata and structured data.
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Meta description
 * @param {string} props.keywords - Meta keywords (array or comma-separated string)
 * @param {string} props.image - Social media sharing image URL
 * @param {string} props.url - Canonical URL for the page
 * @param {Object} props.schemaData - JSON-LD structured data object
 */
const SEO = ({
    title,
    description,
    keywords,
    image = 'https://ecellbphc.in/navbarlogo.png',
    url = 'https://ecellbphc.in',
    schemaData
}) => {
    const siteTitle = 'E-Cell BITS Hyderabad';
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

    const keywordString = Array.isArray(keywords)
        ? keywords.join(', ')
        : keywords;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywordString && <meta name="keywords" content={keywordString} />}
            <link rel="canonical" href={url} />

            {/* OpenGraph Meta Tags */}
            <meta property="og:title" content={title || siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={siteTitle} />

            {/* Twitter Card Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title || siteTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* JSON-LD Structured Data */}
            {schemaData && (
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
