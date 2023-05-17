/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // loader: 'custom',
        // loaderFile: './Utils/CustomImageLoader.ts',
        // deviceSizes: [640, 768, 1024],
        domains: ['res.cloudinary.com'],
      },
}

module.exports = nextConfig

