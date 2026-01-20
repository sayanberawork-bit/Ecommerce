import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        // Mock users - in production use database
        const users: Record<string, { id: string; name: string; email: string; role: string }> = {
          "admin@test.com": { id: "1", name: "Admin User", email: "admin@test.com", role: "admin" },
          "user@test.com": { id: "2", name: "John Doe", email: "user@test.com", role: "user" },
          "support@test.com": { id: "3", name: "Support Agent", email: "support@test.com", role: "support" },
        };

        if (credentials?.email && users[credentials.email]) {
          return users[credentials.email];
        }

        // Allow any email for demo purposes
        if (credentials?.email && credentials?.password) {
          return {
            id: Math.random().toString(),
            name: credentials.email.split("@")[0],
            email: credentials.email,
            role: credentials.role || "user",
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
