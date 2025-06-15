import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./lib/zod"
import { compareSync } from "bcrypt-ts"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {strategy: "jwt"},
  pages: {
    signIn: '/login',
  },
  providers: [
    Google,
    GitHub,
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        const validatedFields = signInSchema.safeParse(credentials);

        if(!validatedFields.success) {
          return null;
        }

        const {email, password} = validatedFields.data;

        const user = await prisma.user.findUnique({
          where: {email}
        })

        if(!user || !user.password) {
          throw new Error('No user found');
        }

        const passwordMatch = compareSync(password, user.password);

        if(!passwordMatch) {
          return null
        }

        return user
      }
    })
  ],
  callbacks: {
    jwt({token, user}) {
      if(user) token.role = user.role;
      return token;
    },

    session({session, token}) {
      session.user.id = token.sub;
      session.user.role = token.role;
      return session;
    }
  }
  
})