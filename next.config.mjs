/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
                hostname: 'edgestore.dev/',
            }
        ]
    },
    images: {
        domains: ['files.edgestore.dev'],
    },
};

export default nextConfig;