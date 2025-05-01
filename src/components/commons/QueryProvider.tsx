"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"
import { onErrorHandler } from "@/libs/axios/responseHandler"
import { SessionProvider } from "next-auth/react"

interface QueryProviderProps {
    children: ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                        retry: false,
                        throwOnError(error) {
                            onErrorHandler(error)
                            return false
                        },
                    },
                    mutations: {
                        onError: onErrorHandler,
                    },
                },
            }),
    )

    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </SessionProvider>
    )
}
