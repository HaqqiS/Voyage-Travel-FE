"use client"

import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { ITour } from "@/types/tour"
import { formatDate } from "@/utils/format"
import Image from "next/image"

interface TourDetailSheetProps {
    tour: ITour | null
    onClose: () => void
}

export function TourDetailSheet({ tour, onClose }: TourDetailSheetProps) {
    return (
        <Sheet open={!!tour} onOpenChange={(open) => !open && onClose()}>
            <SheetContent side="left" className="md:w-[50vw]">
                <SheetHeader>
                    <SheetTitle>Tour Details</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4 px-4 overflow-y-auto h-[calc(100vh-10rem)]">
                    <div className="grid md:grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input
                            id="title"
                            value={tour?.title || ""}
                            className="col-span-3 disabled:opacity-80"
                            disabled
                        />
                    </div>
                    <div className="grid md:grid-cols-4 items-center gap-4">
                        <Label htmlFor="slug" className="text-right">
                            Slug
                        </Label>
                        <Input
                            id="slug"
                            value={tour?.slug || ""}
                            className="col-span-3 disabled:opacity-80"
                            disabled
                        />
                    </div>
                    <div className="grid md:grid-cols-4 items-center gap-4">
                        <Label htmlFor="destination" className="text-right">
                            Destination
                        </Label>
                        <Input
                            id="destination"
                            value={tour?.destination || ""}
                            className="col-span-3 disabled:opacity-80"
                            disabled
                        />
                    </div>
                    <div className="grid md:grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            value={tour?.description || ""}
                            className="col-span-3 disabled:opacity-80"
                            disabled
                        />
                    </div>
                    <div className="grid md:grid-cols-4 items-center gap-4">
                        <Label htmlFor="itinerary" className="text-right">
                            Itinerary
                        </Label>
                        <div className="col-span-3">
                            <Carousel opts={{ loop: true }} className="w-full max-w-[250px]">
                                <CarouselContent>
                                    {tour?.itinerary.map((item) => (
                                        <CarouselItem key={item.day}>
                                            <div className="p-1">
                                                <Image
                                                    src={item.image}
                                                    alt={`Day ${item.day}`}
                                                    width={250}
                                                    height={250}
                                                    className="rounded-md object-cover"
                                                />
                                                <p className="text-center opacity-50">Day {item.day}</p>
                                                <p className="text-left opacity-80">{item.detail}</p>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-4 items-center gap-4">
                        <Label htmlFor="maxParticipant" className="text-right ">
                            Max Participant
                        </Label>
                        <Input
                            id="maxParticipant"
                            value={tour?.maxParticipant || ""}
                            className="col-span-3 disabled:opacity-80"
                            disabled
                        />
                    </div>
                    <div className="grid md:grid-cols-4 items-center gap-4">
                        <Label htmlFor="isRecurring" className="text-right">
                            isRecurring
                        </Label>
                        <Badge className={tour?.isRecurring ? "bg-red-600" : "bg-blue-600"}>
                            {tour?.isRecurring ? "Recurring" : "Fixed Dates"}
                        </Badge>
                    </div>
                    <div className="grid md:grid-cols-4 items-center gap-4">
                        <Label htmlFor="duration" className="text-right">
                            Duration
                        </Label>
                        <Input
                            id="duration"
                            value={tour?.duration || ""}
                            className="col-span-3 disabled:opacity-80"
                            disabled
                        />
                    </div>
                    <div className="grid md:grid-cols-4 items-center gap-4">
                        <Label htmlFor="aviability" className="text-right">
                            Aviability
                        </Label>
                        <div className="flex flex-wrap gap-2">
                            {tour?.isRecurring
                                ? tour?.availability?.availableDays.map((item: string) => (
                                      <Badge key={item}>{item}</Badge>
                                  ))
                                : tour?.availability?.fixedDates.map((item: string) => (
                                      <Badge key={item}>{formatDate(item)}</Badge>
                                  ))}
                        </div>
                    </div>
                    <div className="grid md:grid-cols-4 items-center gap-4">
                        <Label htmlFor="priceAdult" className="text-right">
                            Price Adult
                        </Label>
                        <Input
                            id="priceAdult"
                            value={tour?.price?.adult || ""}
                            className="col-span-3 disabled:opacity-80"
                            disabled
                        />
                    </div>
                    <div className="grid md:grid-cols-4 items-center gap-4">
                        <Label htmlFor="priceChild" className="text-right">
                            Price Child
                        </Label>
                        <Input
                            id="priceChild"
                            value={tour?.price?.child || ""}
                            className="col-span-3 disabled:opacity-80"
                            disabled
                        />
                    </div>
                    <div className="grid md:grid-cols-4 items-center gap-4">
                        <Label htmlFor="createdAt" className="text-right">
                            Created At
                        </Label>
                        <p className="col-span-3">{formatDate(tour?.createdAt || "")}</p>
                    </div>
                    <div className="grid md:grid-cols-4 items-center gap-4">
                        <Label htmlFor="updatedAt" className="text-right">
                            Updated At
                        </Label>
                        <p className="col-span-3">{formatDate(tour?.updatedAt || "")}</p>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
