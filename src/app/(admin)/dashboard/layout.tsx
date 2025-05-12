import { AppSidebar } from "@/components/commons/AppSidebar"

import { SidebarProvider } from "@/components/ui/sidebar"
import { ReactNode } from "react"
import DashboardNavbar from "./@navbar/page"
import { Metadata } from "next"

interface navItems {
    title: string
    url: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    isActive: boolean
}

interface PropTypes {
    children: ReactNode
    modal: ReactNode
}

export const metadata: Metadata= {
    title: "Dashboard | Voyage Travel",
    description: "A travel booking platform",
}

export default function DashboardLayout(props: PropTypes) {
    const { children, modal } = props

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "240px",
                } as React.CSSProperties
            }
        >
            <AppSidebar />


            <DashboardNavbar>
                {children}
                {modal}
            </DashboardNavbar>
        </SidebarProvider>
    )
}
