// app/api/auth/[...nextauth]/route.ts

import NextAuth, { type NextAuthOptions, DefaultSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma" // ✅ Prisma client の正しいパスに注意

// 🔧 セッションとユーザーの型を拡張（ロールとIDを追加）
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }

  interface User {
    role: string
  }
}

// ✅ 認証オプション定義（NextAuthOptions）
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",     // 未ログイン時にリダイレクト
    newUser: "/mypage",   // 初回ログイン時に遷移
    error: "/login",      // 認証エラー時の遷移先
  },
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30日
    updateAge: 24 * 60 * 60,   // 毎日セッション更新
  },
  callbacks: {
    // セッションにユーザーの id と role を追加する
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        session.user.role = user.role ?? "USER"
        session.user.bio = user.bio ?? "" // ✅ これを追加！
      }
      return session
    },
  },
  debug: process.env.NODE_ENV === "development",
}

// ✅ エクスポート形式に注意！
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
