'use server';
import { registerSchema, signInSchema } from "@/lib/zod"
import { hashSync } from "bcrypt-ts";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const signUpCredentials = async(prevState: unknown, formData: FormData) => {

    const validateField = registerSchema.safeParse(Object.fromEntries(formData.entries()));

    if(!validateField.success) {
        return {
            error: validateField.error.flatten().fieldErrors
        }
    }

    const {name, email, password} = validateField.data
    const hashedPassword = hashSync(password, 10);

    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
    } catch (error) {
        if (error instanceof Error) {
            return {  
      
                message: 'Failed to register user'
            }
        }
    }
    redirect('/login')
}


// sign in credentials action
export const signInCredenntials = async(prevState:unknown, formData:FormData) => {
    const validateField = signInSchema.safeParse(Object.fromEntries(formData.entries()));

    if(!validateField.success) {
        return {
            error: validateField.error.flatten().fieldErrors
        }
    }

    const {email, password} = validateField.data;

    // jika berhasil kita akan signin
    try {
        await signIn('credentials', {email, password, redirectTo: "/dashboard"})
    } catch (error) {
        if(error instanceof AuthError) {
            switch(error.type) {
                case "CredentialsSignin":
                    return {message: "Invalid Credentials"}
    

                default:
                    return {message: "Someng went wrong with"}
            }
        }
        throw error
    }
}