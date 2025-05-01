import endpoint from "@/constants/endpoint.constant"
import instance from "@/libs/axios/instance"
import { ILogin, IRegister } from "@/types/auth"

const authServices = {
    register: (payload: IRegister) => instance.post(`${endpoint.AUTH}/register`, payload),
    login: (payload: ILogin) => instance.post(`${endpoint.AUTH}/login`, payload),
    getProfileWithToken: (token: string) =>
        instance.get(`${endpoint.AUTH}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
}

export default authServices
