import connectToDatabase from "@/lib/mongodb";
import { userModel } from "@/model/userModel";
import bcrypt from "bcryptjs";
import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

type Credentials = { email: string; password: string };

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials: any): Promise<{ id: string } | null> {
        // Add logic here to look up the user from the credentials supplied
        
        try {
          await connectToDatabase();
          const user = await userModel.findOne({ email: credentials.email });
          console.log("email:",credentials.email)
          
          if (user) {
            console.log("idhr aya")
             const isPasswordCorrect = await bcrypt.compare(credentials.password, user.get('password'));
            // if (credentials.password === user.get('password')) {
            //     console.log("password match")
            //     return user;
            // }
            console.log(credentials.password, user.get('password'))
            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Incorrect password");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          throw error;
        }
      }
    })
  ],  
  callbacks: {
      async session({ session, token }:{session:Session, token:JWT}) {
      if(session.user){
        session.user.id= token.id as string
      }
      return session
    },
    async jwt({ token, user}:{user?:{id:string}, token:JWT}) {
      if(user){
        token.id = user.id
      }

      return token
    }
  },
  session: {
    strategy: "jwt"
  },
   pages:{
    signIn: '/signin',
    signOut: '/signout',
 },
  secret: process.env.NEXTAUTH_SECRET
}
