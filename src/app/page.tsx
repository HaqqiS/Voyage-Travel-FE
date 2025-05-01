"use client"

import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <h1>Home</h1>
            <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button onClick={()=> signOut()}>
                Logout
            </Button>
        </div>
    )
}
