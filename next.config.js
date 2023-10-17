/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        SITE_URL: process.env.SITE_URL,
        RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    }
}

module.exports = nextConfig
