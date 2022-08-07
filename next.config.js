/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    ORIGIN: 'https://countonyou.netlify.app',
    NEXTAUTH_SECRET : 'f20f360415671afb7200f42f79f6e373',
    NEXTAUTH_URL : 'https://countonyou.netlify.app',
    SECRET_KEY : 'f20f360415671afb7200f42f7'
  },
}

module.exports = nextConfig
