import Link from "next/link";
import React from "react";

type ButtonProps = {
    children?: React.ReactNode;
    href?: string;
    onclick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
    justify?: "start" | "center" | "end";
}

export default function PrimaryButton({
    children,
    href,
    onclick,
    className,
    type = "button",
    justify = "start",
}: ButtonProps) {
    const justifyClass = `justify-self-${justify}`;
    const baseClasses =
        `text-xl font-geologica lg:text-lg bg-secondary px-4 py-2 rounded-md hover:bg-tertiary ${justifyClass}`;

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