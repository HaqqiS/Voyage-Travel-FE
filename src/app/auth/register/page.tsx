"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"
import useRegister from "@/hooks/customHooks/useRegister"
import Link from "next/link"
import { Controller } from "react-hook-form"

export default function RegisterPage() {
    const { control, handleSubmit, errors, handleRegister, isPendingRegister } = useRegister()

    return (
        <div>
            <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                    <Button variant="outline" className="w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                fill="currentColor"
                            />
                        </svg>
                        Sign In with Google
                    </Button>
                </div>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                {errors.root ? (
                        <p className="font-semibold text-rose-400 ">{errors?.root?.message}</p>
                    ) : (
                        <span className="relative z-10 bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    )}
                </div>
                <div>
                    <form onSubmit={handleSubmit(handleRegister)}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="fullname">Full Name</Label>
                                <Controller
                                    name="fullname"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <div className="space-y-1">
                                            <Input
                                                {...field}
                                                id="fullname"
                                                type="text"
                                                placeholder="John Doe"
                                                required
                                                autoComplete="off"
                                                className={`${fieldState.error ? 'border-rose-500 focus-visible:ring-rose-500' : ''}`}
                                            />
                                            {fieldState.error && (
                                                <p className="text-sm font-semibold text-rose-400">
                                                    {fieldState.error.message}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Controller
                                    name="username"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <div className="space-y-1">
                                            <Input
                                                {...field}
                                                id="username"
                                                type="text"
                                                placeholder="johndoe"
                                                required
                                                autoComplete="off"
                                                className={`${fieldState.error ? 'border-rose-500 focus-visible:ring-rose-500' : ''}`}
                                            />
                                            {fieldState.error && (
                                                <p className="text-sm font-semibold text-rose-400">
                                                    {fieldState.error.message}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <div className="space-y-1">
                                            <Input
                                                {...field}
                                                id="email"
                                                type="text"
                                                placeholder="john@mail.com"
                                                required
                                                autoComplete="off"
                                                className={`${fieldState.error ? 'border-rose-500 focus-visible:ring-rose-500' : ''}`}
                                            />
                                            {fieldState.error && (
                                                <p className="text-sm font-semibold text-rose-400">
                                                    {fieldState.error.message}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <div className="space-y-1">
                                            <PasswordInput
                                                {...field}
                                                id="password"
                                                required
                                                autoComplete="off"
                                                className={`${fieldState.error ? 'border-rose-500 focus-visible:ring-rose-500' : ''}`}
                                            />
                                            {fieldState.error && (
                                                <p className="text-sm font-semibold text-rose-400">
                                                    {fieldState.error.message}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                </div>
                                <Controller
                                    name="confirmPassword"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <div className="space-y-1">
                                            <PasswordInput
                                                {...field}
                                                id="confirmPassword"
                                                required
                                                autoComplete="off"
                                                className={`${fieldState.error ? 'border-rose-500 focus-visible:ring-rose-500' : ''}`}
                                            />
                                            {fieldState.error && (
                                                <p className="text-sm font-semibold text-rose-400">
                                                    {fieldState.error.message}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isPendingRegister}>
                                {isPendingRegister ? "Loading..." : "Register"}
                            </Button>
                        </div>
                    </form>
                    <div className="text-center text-sm mt-3">
                        Already have an account?{" "}
                        <Link href="/auth/login" className="underline underline-offset-4">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
