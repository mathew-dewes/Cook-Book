import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"


import { supabase } from "../supabase-client";
import bcrypt from "bcryptjs";


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string;
          password: string
        }
        return authenticate({ email, password })

      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {

      if (user?.id) {
        token.user_id = user.id;
      }
      return token
    },

    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub
      }
      return session
    }
  },

  session: {
    strategy: "jwt"
  }

})


async function authenticate({ email, password }:
  { email: string, password: string }) {

  try {
    const { data: user, error } = await supabase.from("users").select().eq("email", email).single()


    if (error || !user) {
      console.error("User not found or Supabase error:", error);
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      console.log('Incorrect password');
      return null
    }


    return user

} catch (error) {
    console.error("Authenticate error", error);
    return null

  }
}