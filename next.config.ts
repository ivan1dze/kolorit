/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost'],
    },
    async rewrites() {
        return [
            {
                source: '/api_proxy/:path*',
                destination: 'http://localhost/api/:path*',
            },
        ];
    },
};

module.exports = nextConfig;
