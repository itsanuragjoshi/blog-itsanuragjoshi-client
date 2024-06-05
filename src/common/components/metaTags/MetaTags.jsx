// Import dependencies
import React from 'react';
import { Helmet } from 'react-helmet-async';

// Define MetaTags component
const MetaTags = ({ title, description }) => (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
    </Helmet>
);

// Export MetaTags component
export default MetaTags;
