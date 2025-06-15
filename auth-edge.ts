import NextAuth from "next-auth"

export const { auth } = NextAuth({
  providers: [], // kosongkan, atau tambahkan mock jika dibutuhkan
})