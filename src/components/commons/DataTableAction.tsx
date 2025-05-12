import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { Eye, Pencil, Trash2, MoreHorizontal } from "lucide-react"
import { Row } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface IBaseData {
    _id: string // or whatever type your _id is (string, number, etc.)
}

interface PropTypes<TData extends IBaseData> {
    row: Row<TData>
    type: string
    onViewDetail: (data: TData) => void // function to handle view detail action
}

export default function DataTableAction<TData extends IBaseData>({
    row,
    type,
    onViewDetail,
}: PropTypes<TData>) {
    const data = row.original
    const router = useRouter()

    const close = () => router.back()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() => onViewDetail(data)}
                    className="cursor-pointer"
                >
                    <Eye className="mr-2 h-4 w-4" />
                    View details
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => router.push(`/dashboard/${type}/detail/${data._id}`)}
                    className="cursor-pointer"
                >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
