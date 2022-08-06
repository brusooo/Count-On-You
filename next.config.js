/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    ORIGIN: 'http://localhost:3000',
    NEXTAUTH_SECRET : 'f20f360415671afb7200f42f79f6e373'
    
  },
}

module.exports = nextConfig
