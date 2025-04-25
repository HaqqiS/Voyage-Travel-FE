import { AppSidebar } from "@/components/commons/AppSidebar"
import { ModeToggle } from "@/components/commons/ModeToggle"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Page() {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "240px",
                } as React.CSSProperties
            }
        >
            <AppSidebar />
            <SidebarInset>
                <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 justify-between">
                    <div className="flex  justify-start items-center h-full">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">All Inboxes</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Inbox</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="flex h-full justify-end items-center space-x-1.5">
                        <Input type="text" placeholder="Search" className="w-xs" />
                        <Separator orientation="vertical" className=" h-4" />
                        <ModeToggle></ModeToggle>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    {Array.from({ length: 24 }).map((_, index) => (
                        <div key={index} className="aspect-video h-12 w-full rounded-lg bg-muted/50" />
                    ))}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
