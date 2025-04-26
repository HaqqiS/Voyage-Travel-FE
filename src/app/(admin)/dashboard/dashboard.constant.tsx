import { MapPin, Binoculars, Command } from "lucide-react"

const SIDEBAR_ADMIN = [
    // {
    //     title: "Dashboard",
    //     url: "/dashboard",
    //     icon: Command,
    // },
    {
        title: "Tour",
        url: "/dashboard/tour",
        icon: Binoculars,
    },
    {
        title: "Destination",
        url: "/dashboard/destination",
        icon: MapPin,
    },
]

export { SIDEBAR_ADMIN }
