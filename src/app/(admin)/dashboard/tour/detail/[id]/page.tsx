"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import useTour from "@/hooks/customHooks/useTour"
import useInfoTab from "./(tabs)/useOverviewTab"
import useDestination from "@/hooks/customHooks/useDestination"
import { Calendar, MapPin } from "lucide-react" // Import icons
import { IDestination } from "@/types/destination"
import OverviewTab from "./(tabs)/OverviewTab"

export default function TourDetailPage() {
    const { id } = useParams<{ id: string }>()
    const [activeTab, setActiveTab] = useState("overview")
    const [selectedDestinationName, setSelectedDestinationName] = useState<string>("")
    const [formInitialized, setFormInitialized] = useState(false)

    const { dataTourById, isLoadingTourById, handleUpdateTour, isPendingMutateUpdateTour, isSuccessMutateUpdateTour } = useTour()
    const {
        controlUpdateInfo,
        errorsUpdateInfo,
        handleSubmitUpdateInfo,
        resetUpdateInfo,
        setValueUpdateInfo,
        watchUpdateInfo,
    } = useInfoTab()

    const { dataDestinations, isLoadingDestinations } = useDestination()
    const watchedDestination = watchUpdateInfo("destination")

    // Find destination name for the selected ID
    useEffect(() => {
        if (dataDestinations?.data && watchedDestination) {
            const selectedDest = dataDestinations.data.find(
                (dest: IDestination) => dest._id === watchedDestination
            )
            if (selectedDest) {
                setSelectedDestinationName(selectedDest.name)
            }
        }
    }, [dataDestinations?.data, watchedDestination])

    // Set initial form values when data is loaded
    useEffect(() => {
        if (dataTourById && !formInitialized && dataDestinations?.data) {
            // Find destination name if destination ID exists
            let destName = ""
            if (dataTourById.destination) {
                const selectedDest = dataDestinations.data.find(
                    (dest: IDestination) => dest._id === dataTourById.destination
                )
                if (selectedDest) {
                    destName = selectedDest.name
                    setSelectedDestinationName(destName)
                }
            }
            
            // Ensure all form values are defined (not undefined)
            resetUpdateInfo({
                title: dataTourById.title || "",
                slug: dataTourById.slug || "",
                description: dataTourById.description || "",
                duration: dataTourById.duration || 1,
                maxParticipant: dataTourById.maxParticipant || 1,
                destination: dataTourById.destination || "",
                price: {
                    adult: dataTourById.price?.adult || 0,
                    child: dataTourById.price?.child || 0,
                },
            })
            
            setFormInitialized(true)
        }
    }, [dataTourById, resetUpdateInfo, dataDestinations?.data, formInitialized])

    // const onSubmit = handleSubmitUpdateInfo((data) => {
    //     console.log("Form submitted:", data)
    //     // Implement your save logic here
    // })

    if (isLoadingTourById || !dataTourById || isLoadingDestinations) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-96">
                <h2 className="text-2xl font-bold">Loading tour data...</h2>
                <p className="text-muted-foreground mt-2">
                    Please wait while we fetch the tour information.
                </p>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Edit Tour</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 mr-1" />
                            {selectedDestinationName || "No destination selected"}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4 mr-1" />
                            {dataTourById.duration} days
                        </div>
                    </div>
                </div>
                {/* <div className="text-right">
                    <p className="text-3xl font-bold text-primary">
                        {formatCurrency ? formatCurrency(dataTourById?.price?.adult) : `$${dataTourById?.price?.adult}`}
                    </p>
                    <p className="text-sm text-muted-foreground">per person</p>
                </div> */}
            </div>

            {/* Main content with tabs */}
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 w-full max-w-3xl">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                </TabsList>

                <OverviewTab
                    dataTour={dataTourById}
                    onUpdate={handleUpdateTour}
                    isPendingUpdate={isPendingMutateUpdateTour}
                    isSuccessUpdate={isSuccessMutateUpdateTour}
                />

                <TabsContent value="itinerary" className="mt-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Tour Itinerary</CardTitle>
                                <CardDescription>Day by day schedule of activities</CardDescription>
                            </div>
                            <Button variant="outline">Add Day</Button>
                        </CardHeader>
                        <CardContent>
                            {/* {dataTourById?.itinerary && dataTourById.itinerary.length > 0 ? (
                                <div className="space-y-6">
                                    {dataTourById.itinerary.map((day, index) => (
                                        <div key={index} className="border-b pb-4 last:border-b-0">
                                            <h3 className="text-lg font-medium">Day {index + 1}</h3>
                                            <p className="mt-2">{day.description}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 border rounded-md bg-muted/20">
                                    <p className="text-muted-foreground">No itinerary details available</p>
                                    <p className="text-sm mt-2">Click 'Add Day' to create your first itinerary item</p>
                                </div>
                            )} */}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}