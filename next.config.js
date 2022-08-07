/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    ORIGIN: 'https://count-on-you.netlify.app',
    NEXTAUTH_SECRET : 'f20f360415671afb7200f42f79f6e373',
    NEXTAUTH_URL :'https://count-on-you.netlify.app'
  },
}

module.exports = nextConfig
