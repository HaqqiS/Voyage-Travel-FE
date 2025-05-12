// components/tour/tour-table.tsx
"use client"

import { columns } from "./columns"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import useChangeUrl from "@/hooks/use-change-url"
import { Card, CardContent } from "@/components/ui/card"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import useDestination from "@/hooks/customHooks/useDestination"
import { DataTable } from "@/components/commons/DataTable"

export function DestinationTable() {
    const router = useRouter()
    const { dataDestinations, isLoadingDestinations, isRefetchingDestinations, refetchDestinations } = useDestination()
    const { handleChangePage, handleChangeLimit, currentPage, currentLimit } = useChangeUrl()

    const isLoading = isLoadingDestinations || isRefetchingDestinations

    if (isLoading) {
        return <TableSkeleton />
    }

    const destinations = dataDestinations?.data || []
    const pageCount = dataDestinations?.pagination?.totalPages || 1
    const currentPageIndex = (dataDestinations?.pagination?.current || 1) - 1 // 0-based index
    const pageSize = currentLimit ? Number(currentLimit) : 10


    return (
        <div className="px-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl md:text-3xl font-bold tracking-tight">Destinations Management</h2>
                    <p className="text-muted-foreground hidden md:block">
                        Manage and organize all your destination in one place.
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <Button onClick={() => router.push("/dashboard/tours/add")}>
                        <Plus className="mr-2 h-4 w-4" /> Add Destination
                    </Button>
                </div>
            </div>

            <Card>
                <CardContent>
                    <Suspense fallback={<TableSkeleton />}>
                        <DataTable
                            columns={columns}
                            data={destinations}
                            pageCount={pageCount}
                            pageIndex={currentPageIndex}
                            pageSize={pageSize}
                            onPageChange={handleChangePage}
                            onPageLimitChange={handleChangeLimit}
                        />
                    </Suspense>
                </CardContent>
            </Card>
        </div>
    )
}

// Komponen Skeleton untuk loading state
function TableSkeleton() {
    return (
        <div className="w-full space-y-6">
            <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-[250px]" />
                <Skeleton className="h-10 w-[200px]" />
            </div>
            <div className="rounded-md border">
                <Skeleton className="h-[500px] w-full" />
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Skeleton className="h-8 w-[250px]" />
                <Skeleton className="h-8 w-[100px]" />
                <Skeleton className="h-8 w-[100px]" />
            </div>
        </div>
    )
}
