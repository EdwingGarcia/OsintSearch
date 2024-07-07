/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://api.domainsdb.info/v1/:path*',
            },
        ]
    },
};

export default nextConfig;
