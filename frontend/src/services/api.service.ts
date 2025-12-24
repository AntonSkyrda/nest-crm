import axios, {AxiosError} from "axios";
import {authService} from "./auth.service.ts";
import {router} from "../routes/Routes.tsx";
import {urls} from "../constants/ursl.ts";

const apiService = axios.create({baseURL: '/api'});

let isRefreshing = false
type IWaitList = () => void
const waitList: IWaitList[] = []

apiService.interceptors.request.use(req => {
    const accessToken = authService.getAccessToken();

    if (accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`
    }

    return req
})

apiService.interceptors.response.use(res => {
        return res
    },
    async (error: AxiosError) => {
        const originalRequest = error.config;

        if (error.response.status === 401) {

            if (!isRefreshing) {
                isRefreshing = true

                try {
                    await authService.refresh()
                    runAfterRefresh()
                    isRefreshing = false
                    return apiService(originalRequest)
                } catch {
                    authService.deleteTokens()
                    isRefreshing = false
                    await router.navigate('/login?sessionExpired=true')
                    return Promise.reject(error)
                }
            }

            if (originalRequest.url === urls.auth.refresh) {
                return Promise.reject(error)
            }

            return new Promise(resolve => {
                subscribeToWaitList(()=>{
                    resolve(apiService(originalRequest))
                })
            })


        }
        return Promise.reject(error)
    }
)

const subscribeToWaitList = (cb: IWaitList): void => {
    waitList.push(cb)
}

const runAfterRefresh = ():void=>{
    while (waitList.length){
        const cb = waitList.pop();
        cb()
    }
}

export {
    apiService
}