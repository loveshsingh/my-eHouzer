/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // exportTrailingSlash: true,
  images: {
    unoptimized: true
  },
  future: {
    webpack5: true,
  },
  //todo just to testing. we have to fix this after this release
 /* typescript: {
    ignoreBuildErrors: true
  }*/
}

module.exports = nextConfig
