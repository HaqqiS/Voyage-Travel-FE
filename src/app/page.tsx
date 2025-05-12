"use client"

import { Button } from "@/components/ui/button"
import useTour from "@/hooks/customHooks/useTour"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

import { Users, DollarSign, Star, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency } from "@/utils/format"

export default function Home() {
    const [activeTab, setActiveTab] = useState("overview")

    const { dataTours } = useTour()
    const data = dataTours?.data[0]


    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <h1>Home</h1>
            <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button onClick={() => signOut()}>Logout</Button>
            <Button
                variant="secondary"
                onClick={() =>
                    toast("Event has been created", {
                        style: {
                            background: "orange",
                            color: "white",
                        },
                        description: "Sunday, December 03, 2023 at 9:00 AM",
                        action: {
                            label: "Undo",
                            onClick: () => console.log("Undo"),
                        },
                    })
                }
            >
                Show Toast
            </Button>

            <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">{data?.title}</h1>
                    {/* <div className="flex items-center gap-2 mt-2">
                        <Badge variant={tour.status === "active" ? "default" : "secondary"}>
                            {tour.status}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 mr-1" />
                            {tour.destinations?.length || 0} destinations
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4 mr-1" />
                            {tour.duration} days
                        </div>
                    </div> */}

                </div>
                <div className="text-right">
                    <p className="text-3xl font-bold text-primary">{formatCurrency(data?.price.adult)}</p>
                    <p className="text-sm text-muted-foreground">per person</p>
                </div>
            </div>

            {/* Main content with tabs */}
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4 w-full max-w-3xl">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                    <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Description</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{data?.description}</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Facts</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Calendar className="w-5 h-5 mr-2 text-muted-foreground" />
                                        <span>Duration</span>
                                    </div>
                                    <span className="font-medium">{data?.duration} days</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Users className="w-5 h-5 mr-2 text-muted-foreground" />
                                        <span>Group Size</span>
                                    </div>
                                    {/* <span className="font-medium">{tour.groupSize || "N/A"}</span> */}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <DollarSign className="w-5 h-5 mr-2 text-muted-foreground" />
                                        <span>Price</span>
                                    </div>
                                    <span className="font-medium">
                                        ${data?.price.toLocaleString()}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Star className="w-5 h-5 mr-2 text-muted-foreground" />
                                        <span>Rating</span>
                                    </div>
                                    {/* <span className="font-medium">{tour.rating || "N/A"}/5</span> */}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Destinations section */}
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Destinations</CardTitle>
                            <CardDescription>Places you will visit during this tour</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {tour.destinations?.map((destination, index) => (
                                    <div key={index} className="p-4 border rounded-lg">
                                        <div className="flex items-center">
                                            <MapPin className="w-4 h-4 mr-2 text-primary" />
                                            <span>{destination}</span>
                                        </div>
                                    </div>
                                ))}
                            </div> */}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="itinerary" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tour Itinerary</CardTitle>
                            <CardDescription>Day by day schedule of activities</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* {dataTourById?.itinerary ? ( */}
                            {/* <div className="space-y-6"> */}
                            {/* {dataTourById?.itinerary.map((itinerary, index) => ( */}
                            {/* <div key={index} className="border-b pb-4 last:border-b-0"> */}
                            {/* <h3 className="text-lg font-medium">Day {index + 1}</h3> */}
                            {/* <p className="mt-2">{day.description}</p> */}
                            {/* </div> */}
                            {/* ))} */}
                            {/* </div> */}
                            {/* ) : ( */}
                            {/* <p className="text-muted-foreground">Itinerary details not available</p> */}
                            {/* )} */}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="inclusions" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>What is Included</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-lg font-medium mb-4">Included</h3>
                                    {/* <ul className="space-y-2">
                                        {tour.inclusions?.map((item, index) => (
                                            <li key={index} className="flex items-start">
                                                <div className="mr-2 mt-1 text-green-600">✓</div>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul> */}
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-4">Not Included</h3>
                                    {/* <ul className="space-y-2">
                                        {tour.exclusions?.map((item, index) => (
                                            <li key={index} className="flex items-start">
                                                <div className="mr-2 mt-1 text-red-600">✗</div>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul> */}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Customer Reviews</CardTitle>
                        </CardHeader>
                        {/* <CardContent>
                            {tour.reviews && tour.reviews.length > 0 ? (
                                <div className="space-y-6">
                                    {tour.reviews.map((review, index) => (
                                        <div key={index} className="border-b pb-4 last:border-b-0">
                                            <div className="flex items-center justify-between">
                                                <div className="font-medium">{review.userName}</div>
                                                <div className="flex items-center">
                                                    {Array(5)
                                                        .fill(0)
                                                        .map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`w-4 h-4 ${
                                                                    i < review.rating
                                                                        ? "text-yellow-500 fill-yellow-500"
                                                                        : "text-gray-300"
                                                                }`}
                                                            />
                                                        ))}
                                                </div>
                                            </div>
                                            <p className="mt-2 text-sm">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">No reviews available yet</p>
                            )}
                        </CardContent> */}
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
        </div>
    )
}
