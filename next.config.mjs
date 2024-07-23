/** @type {import('next').NextConfig} */

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  // output: 'export', // Use this if you want to create "static generated website" (SSG), result in "/out" folder
  trailingSlash: true,
  images: { unoptimized: true },

  // i18n: {
  //   locales: ['en', 'fr'],
  //   defaultLocale: 'en',
  // },

  env: {
    // TODO: You can add custom env variables here, also check .env.xxx file
    AUTHOR: 'JPE',
    // npm_package_name: process.env.npm_package_name,
    // npm_package_version: process.env.npm_package_version,
  },

  reactStrictMode: true,
};

export default withNextIntl(nextConfig);
