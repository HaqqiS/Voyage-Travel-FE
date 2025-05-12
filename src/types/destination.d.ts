export interface attraction{
    _id: string
    name: string
}

export interface IDestination {
    _id:string
    name: string
    description: string
    images: string[]
    attractions: attraction[]
    createdAt: string
    updatedAt: string
}

export interface IDestinationTableData {
    destinations: IDestination[]
    pagination: {
        current: number
        total: number
        totalPages: number
    }    
}