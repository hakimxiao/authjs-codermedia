"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

const OAuthErrorAlert = () => {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    if (error !== 'OAuthAccountNotLinked') return null;

    return (
        <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
            role="alert"
        >
            <span className="font-medium">Account Already Use By Another Provider Please Use It</span>
        </div>

    )
}

export default OAuthErrorAlert;

