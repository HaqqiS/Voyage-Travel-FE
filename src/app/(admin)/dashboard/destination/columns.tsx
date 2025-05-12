import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { attraction, IDestination } from "@/types/destination";
import { formatDate } from "@/utils/format";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export const columns: ColumnDef<IDestination>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "country",
        header: "Country",
    },
    {
        accessorKey: "images",
        header: "Images",
        cell: ({ row }) => {
            return (
                <Carousel opts={{ loop: true,  }} className="w-full max-w-[100px]">
                    <CarouselContent>
                        {row.original.images.map((image) => (
                            <CarouselItem key={image}>
                                <div className="p-1">
                                    <Image 
                                        src={image} 
                                        alt={image} 
                                        width={100} 
                                        height={100} 
                                        className="rounded-md object-cover"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            )
        }
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey:"attractions",
        header:"Attractions",
        cell: ({ row }) => {
            return (
                <div className="flex flex-wrap gap-2">
                    {row.original.attractions.map((item: attraction)=> (
                        <Badge key={item._id} >
                            {item.name}
                        </Badge>
                    ))}
                </div>
            )
        }   
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => <div>{formatDate(row.getValue("createdAt"))}</div>,
    },
]

