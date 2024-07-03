/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.course-api.com',
                pathname: '/images/people/**'
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/diqqf3eq2/image/upload/**'
            },
            {
                protocol: 'https',
                hostname: 'www.course-api.com',
                pathname: '/images/tours/**'
            }
        ]
    }
};

export default nextConfig;
