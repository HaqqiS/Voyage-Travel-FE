import { Metadata } from "next"
import { DestinationTable } from "./destination-table"

export const metadata: Metadata = {
    title: "Destination | Voyage Travel",
    description: "A travel booking platform",
}

export default function DestinationPage() {
    return (
        <div className="container mx-auto">
            <DestinationTable />
        </div>
    )
}
