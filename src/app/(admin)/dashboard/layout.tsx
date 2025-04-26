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
import { ReactNode } from "react"
import DashboardNavbar from "./@navbar/page"

interface navItems {
    title: string
    url: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    isActive: boolean
}

interface PropTypes {
    navItems: navItems[]
    children: ReactNode
}

export default function DashboardLayout(props: PropTypes) {
    const { navItems, children } = props

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "240px",
                } as React.CSSProperties
            }
        >
            <AppSidebar />

            <DashboardNavbar>{children}</DashboardNavbar>
        </SidebarProvider>
    )
}
