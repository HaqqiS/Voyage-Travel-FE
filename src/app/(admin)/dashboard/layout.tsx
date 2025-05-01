import { AppSidebar } from "@/components/commons/AppSidebar"

import { SidebarProvider } from "@/components/ui/sidebar"
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
