/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    ORIGIN: "http://localhost:3000",
    NEXTAUTH_SECRET: "f20f360415671afb7200f42f79f6e373",
    NEXTAUTH_URL: "https://count-on-you.netlify.app",
    GOOGLE_ID:
      "566841125763-debuci6rs2fnjeau9upfskh1m2aobvtu.apps.googleusercontent.com",
    GOOGLE_SECRET: "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",
    MONGODB_URI:
      "mongodb+srv://brusooo:Jeni2002@cluster0.bcpu8.mongodb.net/?retryWrites=true&w=majority",
  },
};

module.exports = nextConfig;
