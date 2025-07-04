import React from 'react'
import { IoLogoGoogle, IoLogoGithub } from 'react-icons/io5';
import { signIn } from '@/auth';

export const GoogleButton = () => {
    return (
        <form action={async () => {
            'use server';

            await signIn('google', {
                redirectTo: '/dashboard'
            });
        }}>
            <button suppressHydrationWarning type='submit' className='flex items-center justify-center gap-1 py-2.5 rounded-lg uppercase text-white font-medium  text-sm bg-blue-500 w-full hover:cursor-pointer'>
                <IoLogoGoogle />
                Sign In WIth Google</button>
        </form>
    )
}

export const GithubButton = () => {
    return (
        <form action={async () => {
            'use server';

            await signIn('github', {
                redirectTo: '/dashboard'
            });
        }}>
            <button suppressHydrationWarning type='submit' className='flex items-center justify-center gap-1 py-2.5 rounded-lg uppercase text-white font-medium  text-sm bg-gray-500 w-full hover:cursor-pointer'>
                <IoLogoGithub />
                Sign In WIth Github</button>
        </form>
    )
}

