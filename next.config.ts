/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['api.colordrive.by'],
    },
    async rewrites() {
        return [
            {
                source: '/api_proxy/:path*',
                destination: 'https://api.colordrive.by/api/:path*',
            },
        ];
    },
    eslint: {
        ignoreDuringBuilds: true, // Игнорируем линтинг во время сборки
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

module.exports = nextConfig;
