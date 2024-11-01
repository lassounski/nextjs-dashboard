// In your seed.js file, you used a package called bcrypt to hash the user's password before storing it in the database. 
// You will use it again later in this chapter to compare that the password entered by the user matches the one in the database. 
// However, you will need to create a separate file for the bcrypt package. 
// This is because bcrypt relies on Node.js APIs not available in Next.js Middleware.
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from 'zod';
import { sql } from "@vercel/postgres";
import type { User } from '@/app/lib/definitions'
import bcrypt from 'bcrypt'

//gets the user from the DB
async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User> `SELECT * FROM users WHERE email=${email}`
        return user.rows[0]
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials)
                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    
                    // no user in DB - can't login
                    if (!user) return null;
                    
                    const passwordsMatch = await bcrypt.compare(password, user.password)
                    
                    if(passwordsMatch) return user
                }
                console.log('Invalid credentials');
                return null;
            }
        })]
})