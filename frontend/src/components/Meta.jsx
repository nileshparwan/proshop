import React from 'react';
import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet prioritizeSeoTags={true}>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
    </Helmet>
  )
};

Meta.defaultProps = {
  title: 'Welcome to ProShop',
  description: 'We sell the best products for cheap',
  keywords: 'Electronics, buy electronic, cheap electronics'
};

export default Meta