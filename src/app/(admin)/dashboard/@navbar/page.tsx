"use client"
import { ModeToggle } from "@/components/commons/ModeToggle"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { capitalizeFirstLetter } from "@/utils/format"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { usePathname } from "next/navigation"

export default function DashboardNavbar({ ...props }: React.ComponentProps<typeof SidebarInset>) {
    const { children } = props
    const pathname = usePathname()
    return (
        <SidebarInset>
            <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 justify-between">
                <div className="flex  justify-start items-center h-full">
                    <SidebarTrigger className="-ml-1" />
                    <Separator className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>
                                    {pathname.split("/").pop() !== "dashboard"
                                        ? capitalizeFirstLetter(
                                              pathname
                                                  .split("/")
                                                  .filter((segment) => segment)
                                                  .pop() || "",
                                          )
                                        : null}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className="flex h-full justify-end items-center space-x-1.5">
                    {/* <Input type="text" placeholder="Search" className="md:w-xs w-fit" /> */}
                    <Separator className=" h-4" />
                    <ModeToggle></ModeToggle>
                </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
        </SidebarInset>
    )
}
