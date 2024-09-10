/** @type {import('next').NextConfig} */
const dayjs = require("dayjs");

const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: ["oeuawisnjdipwirnemhf.supabase.co"],
    },
    redirects: async () => {
        return [
            {
                source: "/",
                destination: `/diaries/${dayjs().format("YYYY-MM-DD")}`,
                permanent: true,
            },
            {
                source: "/diaries",
                destination: `/diaries/${dayjs().format("YYYY-MM-DD")}`,
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
