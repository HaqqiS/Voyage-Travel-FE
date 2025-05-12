import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import useDestination from "@/hooks/customHooks/useDestination"
import { Save } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { IDestination } from "@/types/destination"
import useOverviewTab from "./useOverviewTab"
import { Controller } from "react-hook-form"
import { useEffect, useState } from "react"
import { ITour } from "@/types/tour"
import { Button } from "@/components/ui/button"

export default function OverviewTab({
    dataTour,
    onUpdate,
    isPendingUpdate,
    isSuccessUpdate,
}: {
    dataTour: ITour
    onUpdate: (data: ITour) => void
    isPendingUpdate: boolean
    isSuccessUpdate: boolean
}) {
    const {
        controlUpdateInfo,
        errorsUpdateInfo,
        handleSubmitUpdateInfo,
        resetUpdateInfo,
        setValueUpdateInfo,
        watchUpdateInfo,
    } = useOverviewTab()
    const { dataDestinations, isLoadingDestinations } = useDestination()

    const [selectedDestinationName, setSelectedDestinationName] = useState<string>("")
    const watchedDestination = watchUpdateInfo("destination")

    // Find destination name for the selected ID
    useEffect(() => {
        if (dataDestinations?.data && watchedDestination) {
            const selectedDest = dataDestinations.data.find(
                (dest: IDestination) => dest._id === watchedDestination,
            )
            if (selectedDest) {
                setSelectedDestinationName(selectedDest.name)
            }
        }
    }, [dataDestinations?.data, watchedDestination])

    useEffect(() => {
        if (dataTour && dataDestinations?.data) {
            // Find destination name if destination ID exists
            let destName = ""
            if (dataTour.destination) {
                const selectedDest = dataDestinations.data.find(
                    (dest: IDestination) => dest._id === dataTour.destination,
                )
                if (selectedDest) {
                    destName = selectedDest.name
                    setSelectedDestinationName(destName)
                }
            }

            setValueUpdateInfo("title", `${dataTour.title}`)
            setValueUpdateInfo("slug", `${dataTour.slug}`)
            setValueUpdateInfo("description", `${dataTour.description}`)
            setValueUpdateInfo("duration", Number(dataTour.duration))
            setValueUpdateInfo("maxParticipant", Number(dataTour.maxParticipant))
            setValueUpdateInfo("destination", `${dataTour.destination}`)
            setValueUpdateInfo("price.adult", Number(dataTour.price?.adult))
            setValueUpdateInfo("price.child", Number(dataTour.price?.child))
        }
    }, [dataTour, setValueUpdateInfo, dataDestinations?.data])

    return (
        <TabsContent value="overview" className="mt-6">
            <form onSubmit={handleSubmitUpdateInfo(onUpdate)}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="md:col-span-3">
                        <CardHeader>
                            <CardTitle className="text-primary font-bold text-xl">Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="title" className="block text-sm font-semibold">
                                            Title
                                        </Label>
                                        <Controller
                                            name="title"
                                            control={controlUpdateInfo}
                                            render={({ field, fieldState }) => (
                                                <div className="space-y-1">
                                                    <Input
                                                        {...field}
                                                        id="title"
                                                        type="text"
                                                        value={field.value || ""}
                                                        required
                                                        autoComplete="off"
                                                        // disabled={!formInitialized}
                                                        aria-invalid={fieldState.error ? true : false}
                                                    />
                                                    {fieldState.error && (
                                                        <p className="text-sm font-semibold text-rose-400">
                                                            {fieldState.error.message}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="slug" className="block text-sm font-semibold">
                                            Slug
                                        </Label>
                                        <Controller
                                            name="slug"
                                            control={controlUpdateInfo}
                                            render={({ field, fieldState }) => (
                                                <div className="space-y-1">
                                                    <Input
                                                        {...field}
                                                        id="slug"
                                                        type="text"
                                                        value={field.value || ""}
                                                        required
                                                        autoComplete="off"
                                                        // disabled={!formInitialized}
                                                        aria-invalid={fieldState.error ? true : false}
                                                    />
                                                    {fieldState.error && (
                                                        <p className="text-sm font-semibold text-rose-400">
                                                            {fieldState.error.message}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </div>

                                    <div className="grid gap-2 md:col-span-2">
                                        <Label htmlFor="description" className="block text-sm font-semibold">
                                            Description
                                        </Label>
                                        <Controller
                                            name="description"
                                            control={controlUpdateInfo}
                                            render={({ field, fieldState }) => (
                                                <div className="space-y-1">
                                                    <Textarea
                                                        {...field}
                                                        id="description"
                                                        value={field.value || ""}
                                                        required
                                                        autoComplete="off"
                                                        // disabled={!formInitialized}
                                                        className="min-h-32"
                                                        aria-invalid={fieldState.error ? true : false}
                                                    />
                                                    {fieldState.error && (
                                                        <p className="text-sm font-semibold text-rose-400">
                                                            {fieldState.error.message}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-2">
                                            <Label
                                                htmlFor="duration"
                                                className="block text-sm font-semibold md:h-[20px]"
                                            >
                                                Duration (days)
                                            </Label>
                                            <Controller
                                                name="duration"
                                                control={controlUpdateInfo}
                                                render={({ field, fieldState }) => (
                                                    <div className="space-y-1">
                                                        <Input
                                                            {...field}
                                                            id="duration"
                                                            required
                                                            type="number"
                                                            min="1"
                                                            autoComplete="off"
                                                            aria-invalid={fieldState.error ? true : false}
                                                        />
                                                        {fieldState.error && (
                                                            <p className="text-sm font-semibold text-rose-400">
                                                                {fieldState.error.message}
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Label
                                                htmlFor="maxParticipant"
                                                className="block text-sm font-semibold md:h-[20px]"
                                            >
                                                Max Participant
                                            </Label>
                                            <Controller
                                                name="maxParticipant"
                                                control={controlUpdateInfo}
                                                render={({ field, fieldState }) => (
                                                    <div className="space-y-1">
                                                        <Input
                                                            {...field}
                                                            id="maxParticipant"
                                                            required
                                                            type="number"
                                                            min="1"
                                                            autoComplete="off"
                                                            aria-invalid={fieldState.error ? true : false}
                                                        />
                                                        {fieldState.error && (
                                                            <p className="text-sm font-semibold text-rose-400">
                                                                {fieldState.error.message}
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="priceAdult" className="block text-sm font-semibold">
                                            Price Adult
                                        </Label>
                                        <Controller
                                            name="price.adult"
                                            control={controlUpdateInfo}
                                            render={({ field, fieldState }) => (
                                                <div className="space-y-1">
                                                    <Input
                                                        {...field}
                                                        id="price.adult"
                                                        type="number"
                                                        value={field.value || 0}
                                                        onChange={(e) =>
                                                            field.onChange(
                                                                e.target.value === ""
                                                                    ? 0
                                                                    : parseFloat(e.target.value),
                                                            )
                                                        }
                                                        min="0"
                                                        step="0.01"
                                                        // disabled={!formInitialized}
                                                        required
                                                        autoComplete="off"
                                                        aria-invalid={fieldState.error ? true : false}
                                                    />
                                                    {fieldState.error && (
                                                        <p className="text-sm font-semibold text-rose-400">
                                                            {fieldState.error.message}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="priceChild" className="block text-sm font-semibold">
                                            Price Child
                                        </Label>
                                        <Controller
                                            name="price.child"
                                            control={controlUpdateInfo}
                                            render={({ field, fieldState }) => (
                                                <div className="space-y-1">
                                                    <Input
                                                        {...field}
                                                        id="price.child"
                                                        type="number"
                                                        value={field.value || 0}
                                                        onChange={(e) =>
                                                            field.onChange(
                                                                e.target.value === ""
                                                                    ? 0
                                                                    : parseFloat(e.target.value),
                                                            )
                                                        }
                                                        min="0"
                                                        step="0.01"
                                                        // disabled={!formInitialized}
                                                        required
                                                        autoComplete="off"
                                                        aria-invalid={fieldState.error ? true : false}
                                                    />
                                                    {fieldState.error && (
                                                        <p className="text-sm font-semibold text-rose-400">
                                                            {fieldState.error.message}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-primary font-bold text-xl">Destination</CardTitle>
                            <CardDescription>Select the primary destination for this tour</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="destination" className="block text-sm font-semibold">
                                    Destination
                                </Label>
                                <Controller
                                    name="destination"
                                    control={controlUpdateInfo}
                                    render={({ field }) => (
                                        <div className="space-y-1">
                                            {isLoadingDestinations ? (
                                                <div className="py-2 px-3 border rounded-md bg-muted/50">
                                                    Loading destinations...
                                                </div>
                                            ) : (
                                                <Select
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value)
                                                        const selectedDest = dataDestinations?.data.find(
                                                            (dest: IDestination) => dest._id === value,
                                                        )
                                                        if (selectedDest) {
                                                            setSelectedDestinationName(selectedDest.name)
                                                        }
                                                    }}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select a destination" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Destinations</SelectLabel>
                                                            {dataDestinations?.data.map(
                                                                (destination: IDestination) => (
                                                                    <SelectItem
                                                                        key={destination._id}
                                                                        value={destination._id}
                                                                    >
                                                                        {destination.name}
                                                                    </SelectItem>
                                                                ),
                                                            )}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        </div>
                                    )}
                                />
                            </div>

                            <div className="pt-4 border-t mt-4">
                                <Button type="submit" className="w-full flex items-center gap-2">
                                    <Save className="w-4 h-4" /> Save Tour
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </TabsContent>
    )
}
