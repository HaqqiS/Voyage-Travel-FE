import { Command } from "lucide-react"
import { ReactNode } from "react"
import { cn } from "@/libs/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthLayout({
    children,
    className,
    ...props
}: {
    children: ReactNode
    className?: string
}) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center font-medium">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <Command className="size-4" />
                    </div>
                    Voyage Travel.
                </a>
                <div className={cn("flex flex-col gap-6", className)} {...props}>
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">Welcome back</CardTitle>
                            <CardDescription>Login with your Apple or Google account</CardDescription>
                        </CardHeader>
                        <CardContent>{children}</CardContent>
                    </Card>
                </div>
                {/* {children} */}
            </div>
        </div>
    )
}
