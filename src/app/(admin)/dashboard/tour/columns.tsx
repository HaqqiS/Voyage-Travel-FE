import DataTableAction from "@/components/commons/DataTableAction"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ITour } from "@/types/tour"
import { formatCurrency, formatDate } from "@/utils/format"
import { ColumnDef } from "@tanstack/react-table"
import { ChevronDownIcon, ChevronsUpDown, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// export const columns: ColumnDef<ITour>[] = [
export const columns = (onViewDetail: (tour: ITour) => void): ColumnDef<ITour>[] => [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Title
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            )
        },
    },
    {
        accessorKey: "slug",
        header: "Slug",
    },
    {
        accessorKey: "itinerary",
        header: "Itenary",
        cell: ({ row }) => {
            return (
                <Carousel opts={{ loop: true }} className="w-full max-w-[100px]">
                    <CarouselContent>
                        {row.original.itinerary.map((item) => (
                            <CarouselItem key={item.day}>
                                <div className="p-1">
                                    <Image
                                        src={item.image}
                                        alt={`Day ${item.day}`}
                                        width={100}
                                        height={100}
                                        className="rounded-md object-cover"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            )
        },
    },
    {
        accessorKey: "destination",
        header: "Destination",
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Price <ChevronsUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div>
                <div>{formatCurrency(row.original.price.adult)}</div>
                <div className="text-xs text-muted-foreground">
                    Child: {formatCurrency(row.original.price.child)}
                </div>
            </div>
        ),
        sortingFn: (rowA, rowB) => {
            return rowA.original.price.adult - rowB.original.price.adult
        },
    },
    {
        accessorKey: "duration",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Duration
                    <ChevronsUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="text-center">{row.getValue("duration")} days</div>,
    },
    {
        accessorKey: "maxParticipant",
        header: "Max Participant",
        cell: ({ row }) => {
            return <div>{row.getValue("maxParticipant")} people</div>
        },
    },
    {
        accessorKey: "isRecurring",
        header: ({ column }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="ml-auto">
                            Type <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => column.setFilterValue(undefined)}>
                            All
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => column.setFilterValue(true)}
                            className="text-red-500 "
                        >
                            Recurring
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => column.setFilterValue(false)}
                            className="text-blue-500"
                        >
                            Fixed Dates
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
        cell: ({ row }) => {
            return (
                <div>
                    {row.original.isRecurring ? (
                        <Badge className="bg-red-700">Recurring</Badge>
                    ) : (
                        <Badge className="bg-blue-700">Fixed Dates</Badge>
                    )}
                </div>
            )
        },
    },
    {
        accessorKey: "availability",
        header: "Availability",
        cell: ({ row }) => {
            return row.original.isRecurring ? (
                <div className="flex flex-wrap gap-2">
                    {row.original.availability.availableDays.map((day: string) => {
                        return <div key={day}>{day}</div>
                    })}
                </div>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {row.original.availability.fixedDates.map((date: string) => {
                        return <div key={date}>{formatDate(date)}</div>
                    })}
                </div>
            )
        },
    },
    // {
    //     accessorKey: "createdAt",
    //     header: "Created At",
    //     cell: ({ row }) => <div>{formatDate(row.getValue("createdAt"))}</div>,
    // },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return <DataTableAction row={row} type="tour" onViewDetail={() => onViewDetail(row.original)} />
        },
    },
]
