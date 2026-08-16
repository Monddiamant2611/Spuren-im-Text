import type { ButtonHTMLAttributes, ReactNode } from "react";
export function Button({ children, variant = "primary", className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; variant?: "primary" | "secondary" }) { return <button className={`archive-button archive-button--${variant} ${className}`.trim()} {...props}>{children}</button>; }
