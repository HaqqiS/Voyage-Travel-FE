"use client"

import * as React from "react"
import { Eye, EyeClosed } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/libs/utils"

const PasswordInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false)

        const togglePasswordVisibility = () => {
            setShowPassword((prev) => !prev)
        }

        return (
            <div className="relative">
                <Input
                    type={showPassword ? "text" : "password"}
                    className={cn("pr-10", className)}
                    ref={ref}
                    {...props}
                />
                <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={togglePasswordVisibility}
                    tabIndex={-1}
                >
                    {showPassword ? <Eye className="h-5 w-5" /> : <EyeClosed className="h-5 w-5" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </button>
            </div>
        )
    },
)

PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
