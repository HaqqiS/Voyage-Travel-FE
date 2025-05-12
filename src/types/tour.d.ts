export interface ITour {
    _id?: string
    title?: string
    slug?: string
    destination?: string
    description?: string
    itinerary?: Array<{
        day: number
        detail: string
        image: string
    }>
    maxParticipant?: number 
    isRecurring?: boolean
    duration?: number 
    availability?: {
        availableDays?: string[]
        fixedDates?: string[]
    }
    price?: {
        adult: number
        child: number
    }
    createdAt?: string
    updatedAt?: string
}

export interface TourTableData {
    tours: ITour[]
    pagination: {
        current: number
        total: number
        totalPages: number
    }
}