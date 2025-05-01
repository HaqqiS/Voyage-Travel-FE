import type { Metadata } from "next"
import { Kreon } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/commons/ThemeProvider"
import { QueryProvider } from "@/components/commons/QueryProvider"

const kreon = Kreon({
    variable: "--font-kreon",
    subsets: ["latin"],
})


export const metadata: Metadata = {
    title: "Home | Voyage Travel",
    description: "A travel booking platform",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${kreon.variable} antialiased`} suppressHydrationWarning>
                <QueryProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </QueryProvider>
            </body>
        </html>
    )
}
