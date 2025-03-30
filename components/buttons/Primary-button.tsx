import Link from "next/link";
import React from "react";

type ButtonProps = {
    children?: React.ReactNode;
    href?: string;
    onclick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
}

export default function PrimaryButton({
    children,
    href,
    onclick,
    className,
    type = "button",
}: ButtonProps) {
    const baseClasses =
        'text-white bg-secondary hover:bg-tertiary px-4 py-2 rounded-md transition';

    if (href) {
        return (
            <Link href={href} className={`${baseClasses} ${className}`}>{children}</Link>
        )
    }

    return (
        <button
            type={type}
            onClick={onclick}
            className={`${baseClasses} ${className}`}
        >
            {children}
        </button>
    )
}