import { Table } from "@tanstack/react-table"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DataTablePaginationProps<TData> {
    table: Table<TData>
    pageIndex: number
    pageCount: number
    pageSize: number
    onPageChange: (page: number) => void
    onPageLimitChange: (size: number) => void
}

export function DataTablePagination<TData>({
    table,
    pageIndex,
    pageCount,
    pageSize,
    onPageChange,
    onPageLimitChange,
}: DataTablePaginationProps<TData>) {
    return (
        <>
            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {pageIndex + 1} of {pageCount}
                </div>
                <div className="flex items-center space-x-2">
                    <p className="text-sm text-muted-foreground hidden sm:block">Rows per page</p>
                    <Select
                        value={`${pageSize}`}
                        onValueChange={(value) => {
                            onPageLimitChange(Number(value))
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[1, 10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => onPageChange(0)}
                        disabled={pageIndex === 0}
                    >
                        <span className="sr-only">Go to first page</span>
                        <ChevronsLeft />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => onPageChange(pageIndex - 1)}
                        disabled={pageIndex === 0}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeft />
                    </Button>
                    <div className="flex items-center space-x-1">
                        {Array.from({ length: Math.min(5, pageCount) }).map((_, i) => {
                            const pageNumber = pageIndex - 2 + i
                            if (pageNumber >= 0 && pageNumber < pageCount) {
                                return (
                                    <Button
                                        key={pageNumber}
                                        variant={pageNumber === pageIndex ? "default" : "outline"}
                                        className="h-8 w-8 p-0"
                                        onClick={() => onPageChange(pageNumber)}
                                    >
                                        {pageNumber + 1}
                                    </Button>
                                )
                            }
                            return null
                        })}
                    </div>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => onPageChange(pageIndex + 1)}
                        disabled={pageIndex === pageCount - 1}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRight />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => onPageChange(pageCount - 1)}
                        disabled={pageIndex === pageCount - 1}
                    >
                        <span className="sr-only">Go to last page</span>
                        <ChevronsRight />
                    </Button>
                </div>
            </div>
        </>
    )
}
