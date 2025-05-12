"use client"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet"
import { toast } from "sonner"

export default function DashboardPage() {
    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="col-span-3 aspect-video h-36 w-full rounded-lg bg-muted/50 flex items-center justify-center gap-3">
                1
            </div>

            <div className="aspect-video h-36 w-full rounded-lg bg-muted/50 flex items-center justify-center gap-3 flex-col">
                <h1> Haqqi Sukmara</h1>
                <Button
                    onClick={() =>
                        toast("Test", {
                            richColors: true,
                            position: "top-right",
                            style: {
                                background: "var(--success)",
                                color: "var(--success-foreground)",
                            },
                        })
                    }
                >
                    Success
                </Button>
                <Button
                    onClick={() =>
                        toast("Test", {
                            richColors: true,
                            position: "top-right",
                            style: {
                                background: "var(--warning)",
                                color: "var(--warning-foreground)",
                            },
                        })
                    }
                >
                    Warning
                </Button>
                <Button
                    onClick={() =>
                        toast("Test", {
                            richColors: true,
                            position: "top-right",
                            style: {
                                background: "var(--destructive)",
                                color: "var(--destructive-foreground)",
                            },
                        })
                    }
                >
                    Error
                </Button>
            </div>
            <div className="aspect-video h-36 w-full rounded-lg bg-muted/50 flex items-center justify-center gap-3">
                2
                <Sheet onOpenChange={(open) => !open}>
                    <SheetTrigger asChild>
                        <Button variant="outline">Open</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Edit profile</SheetTitle>
                            <SheetDescription>
                                Make changes to your profile here. Click save when you&apos;re done.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4"></div>
                            <div className="grid grid-cols-4 items-center gap-4"></div>
                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button type="submit">Save changes</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
            <div className="aspect-video h-36 w-full rounded-lg bg-muted/50 flex items-center justify-center gap-3">
                3
                <Select
                    value="test"
                    onValueChange={(value) => console.log(value)}
                >
                    <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Select a destination" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Destinations</SelectLabel>
                            <SelectItem value="test">test</SelectItem>
                            <SelectItem value="test2">test2</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="col-span-2 aspect-video h-36 w-full rounded-lg bg-muted/50 flex items-center justify-center gap-3">
                4
            </div>
            <div className="col-start-3 aspect-video h-36 w-full rounded-lg bg-muted/50 flex items-center justify-center gap-3">
                5
            </div>

            <div className="aspect-video h-36 w-full rounded-lg bg-muted/50 flex items-center justify-center gap-3">
                6
            </div>
            <div className="col-span-2 aspect-video h-36 w-full rounded-lg bg-muted/50 flex items-center justify-center gap-3">
                7
            </div>

            <div className="col-span-3  aspect-video h-36 w-full rounded-lg bg-muted/50 flex items-center justify-center gap-3">
                8
            </div>

            <div className="col-span-3 aspect-video h-64 w-full rounded-lg bg-muted/50 flex items-center justify-center gap-3">
                9
            </div>
        </div>
    )
}
