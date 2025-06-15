import { object, string } from "zod";

export const signInSchema = object({
    email: string().email('Invalid Email'),
    password: string()
        .min(8, 'Password must be more 8 characters')
        .max(32, 'Password must be lest then 32 characters'),
} 
);

export const registerSchema = object({
    name: string().min(1, 'Name must be more one character'),
    email: string().email('Invalid Email'),
    password: string()
        .min(8, 'Password must be more 8 characters')
        .max(32, 'Password must be lest then 32 characters'),
    ConfirmPassword: string()
        .min(8, 'Password must be more 8 characters')
        .max(32, 'Password must be lest then 32 characters'),
}).refine((data) => data.password === data.ConfirmPassword, {
    message: 'Password doesn"t not match',
    path: ['ConfirmPassword'] 
} 
);