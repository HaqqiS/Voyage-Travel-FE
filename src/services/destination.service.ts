import instance from "@/libs/axios/instance"
import endpoint from "@/constants/endpoint.constant"
import { IDestination } from "@/types/destination"

const destinationSevices = {
    getDestinations: (params?: string) => instance.get(`${endpoint.DESTINATION}?${params}`),//kalau ada error gunakan ``
    getDestinationById: (id: string) => instance.get(`${endpoint.DESTINATION}/${id}`),
    addDestination: (payload: IDestination) => instance.post(endpoint.DESTINATION, payload),
    updateDestination: (id: string, payload: IDestination) => instance.put(`${endpoint.DESTINATION}/${id}`, payload),
    deleteDestination: (id: string) => instance.delete(`${endpoint.DESTINATION}/${id}`),
}

export default destinationSevices
