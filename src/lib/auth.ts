import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connect from "@/utils/db";
import { userLog } from "@/utils/server-actoions/log";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    providers: [
      CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials: any) {
          await connect();
          try {
            const user = await User.findOne({ email: credentials.email });
            if (user) {
              const isPasswordCorrect = await bcrypt.compare(
                credentials.password,
                user.password
              );
              if (isPasswordCorrect) {
               userLog(credentials.email, "login")
                return user;
              }
            }
          } catch (err: any) {
            throw new Error(err);
          }
        },
      }),
      // ...add more providers here
    ],
  };