import { MapPin, Binoculars, Users } from "lucide-react"

const SIDEBAR_ADMIN = [
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
    {
        title: "Participant",
        url: "/dashboard/participant",
        icon: Users,
    },
]

export { SIDEBAR_ADMIN }
