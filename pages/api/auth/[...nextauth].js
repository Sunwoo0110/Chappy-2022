import NextAuth from 'next-auth'

import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id:"id-password-credential",
      credentials: {
        id: { label: "ID", type: "text" },
        pwd: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // console.log("credentials: ",credentials)
        const res = await fetch("http://localhost:3000/api/user/profile/login", {
          method: 'POST',
          headers: {
              "Content-Type": 'application/json',
          },
          body: JSON.stringify({
              "id": credentials.id,
              "pwd": credentials.pwd,    
          }),
        })

        const user = await res.json()

        if (res.ok && user.data!=-1) {
          console.log("user: ",user)
          return user
        }
        throw new Error("login failed");
      }
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user }) {
  //     token.id = user.data
  //     console.log("token: ",token)
  //     return token
  //   },
  //   async session({ session, token }) {
  //     // session.accessToken = token.accessToken
  //     // session.user.id = token.id
  //     console.log("callbacks: ",session)
  //     console.log("callbacks: ",token)
  //     return session
  //   },
  // },
  pages: {
    signIn: "/login",
  },
})

