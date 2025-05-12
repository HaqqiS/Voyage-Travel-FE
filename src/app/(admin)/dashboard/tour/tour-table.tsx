// components/tour/tour-table.tsx
"use client"

import { columns } from "./columns"
import useTour from "@/hooks/customHooks/useTour"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import useChangeUrl from "@/hooks/use-change-url"
import { Card, CardContent } from "@/components/ui/card"
import { Suspense, useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/commons/DataTable"
import { ITour } from "@/types/tour"
import { TourDetailSheet } from "./(viewDetail)/TourDetailSheet"

export function TourTable() {
    const router = useRouter()
    const { dataTours, isLoadingTours, isRefetchingTours, refetchTours } = useTour()
    const { handleChangePage, handleChangeLimit, currentPage, currentLimit } = useChangeUrl()

    const [selectedTour, setSelectedTour] = useState<ITour | null>(null)

    const isLoading = isLoadingTours || isRefetchingTours

    if (isLoading) {
        return <TableSkeleton />
    }

    const tours = dataTours?.data || []
    const pageCount = dataTours?.pagination?.totalPages || 1
    const currentPageIndex = (dataTours?.pagination?.current || 1) - 1 // 0-based index
    const pageSize = currentLimit ? Number(currentLimit) : 10

    return (
        <div className="px-6 space-y-6 ">
            <div className="flex items-center md:justify-between flex-col gap-3 items-start md:flex-row">
                <div>
                    <h2 className="text-xl md:text-3xl font-bold tracking-tight">Tour Management</h2>
                    <p className="text-muted-foreground hidden md:block">
                        Manage and organize all your tour packages in one place.
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <Button onClick={() => router.push("/dashboard/tours/add")}>
                        <Plus className="mr-2 h-4 w-4" /> Add Tour
                    </Button>
                </div>
            </div>

            <Card>
                <CardContent>
                    <Suspense fallback={<TableSkeleton />}>
                        <DataTable
                            columns={columns((tour) => setSelectedTour(tour))}
                            data={tours}
                            pageCount={pageCount}
                            pageIndex={currentPageIndex}
                            pageSize={pageSize}
                            onPageChange={handleChangePage}
                            onPageLimitChange={handleChangeLimit}
                        />
                    </Suspense>
                </CardContent>
            </Card>

            <TourDetailSheet tour={selectedTour} onClose={() => setSelectedTour(null)} />
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
