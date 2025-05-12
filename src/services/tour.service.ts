import endpoint from "@/constants/endpoint.constant"
import instance from "@/libs/axios/instance"
import { ITour } from "@/types/tour"

const tourServices = {
    getTours: (params?: string) => instance.get(`${endpoint.TOUR}?${params}`),
    getTourById: (id: string) => instance.get(`${endpoint.TOUR}/${id}`),
    getTourBySlug: (slug: string) => instance.get(`${endpoint.TOUR}/${slug}/slug`),
    addTour: (payload: ITour) => instance.post(endpoint.TOUR, payload),
    deleteTour: (id: string) => instance.delete(`${endpoint.TOUR}/${id}`),
    updateTour: (id: string, payload: ITour) => instance.put(`${endpoint.TOUR}/${id}`, payload),
}

export default tourServices
