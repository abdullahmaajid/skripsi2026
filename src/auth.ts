import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
          include: { 
            profile: { 
              select: { 
                aiStyle: true, 
                aiEnergy: true, 
                aiLength: true, 
                targetMajor1: { select: { name: true, university: { select: { name: true } } } } 
              } 
            } 
          }
        });
        
        if (!user) return null;
        
        const isMatch = await bcrypt.compare(credentials.password as string, user.password);
        if (!isMatch) return null;

        let targetMajor = undefined;
        if (user.profile?.targetMajor1) {
          targetMajor = `${user.profile.targetMajor1.name} — ${user.profile.targetMajor1.university.name}`;
        }
        
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          aiStyle: user.profile?.aiStyle || "default",
          aiEnergy: user.profile?.aiEnergy || "default",
          aiLength: user.profile?.aiLength || "normal",
          targetMajor: targetMajor
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.aiStyle = (user as any).aiStyle;
        token.aiEnergy = (user as any).aiEnergy;
        token.aiLength = (user as any).aiLength;
        token.targetMajor = (user as any).targetMajor;
      }
      if (trigger === "update" && session) {
        if (session.aiStyle !== undefined) token.aiStyle = session.aiStyle;
        if (session.aiEnergy !== undefined) token.aiEnergy = session.aiEnergy;
        if (session.aiLength !== undefined) token.aiLength = session.aiLength;
        if (session.targetMajor !== undefined) token.targetMajor = session.targetMajor;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role as string;
        (session.user as any).aiStyle = token.aiStyle;
        (session.user as any).aiEnergy = token.aiEnergy;
        (session.user as any).aiLength = token.aiLength;
        (session.user as any).targetMajor = token.targetMajor;
      }
      return session;
    }
  }
})
