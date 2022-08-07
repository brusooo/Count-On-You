import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"


export default NextAuth({
  session: {
    jwt : true
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "username", type: "text" },
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        let result = await fetch(
          `${process.env.NEXTAUTH_URL}/api/auth/emaillogin?name=${credentials.name}&email=${credentials.email}&password=${credentials.password}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        let user = await result.json();
        return user;
      },
    }),
  ],

  jwt: {
    secret: process.env.SECRET_KEY
  },

  

  database: process.env.MONGODB_URI,

  pages: {
    error: "/",
    signIn: "/",
  },
});
