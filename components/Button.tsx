'use client'

import { useFormStatus } from "react-dom"


export const RegisterButton = () => {
    const { pending } = useFormStatus()
    console.log(pending)
    return (<button
        type="submit"
        disabled={pending}
        className="w-full text-white bg-blue-700 font-medium rounded-lg my-5 px-5 py-2.5 text-center uppercase hover:bg-blue-800"
    >
        {pending ? 'Registering...' : 'Register'}
    </button>)
}

export const LoginButton = () => {
    const { pending } = useFormStatus()
    console.log(pending)
    return (<button
        suppressHydrationWarning
        type="submit"
        disabled={pending}
        className="w-full text-white bg-blue-700 font-medium rounded-lg my-5 px-5 py-2.5 text-center uppercase hover:bg-blue-800"
    >
        {pending ? 'Authenticating...' : 'Sign in'}
    </button>)
}