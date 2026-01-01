import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { authService } from "./auth.service";
import { router } from "../routes/Routes";
import { baseUrl, urls } from "../constants/ursl";

export const apiService = axios.create({ baseURL: baseUrl });

let isRefreshing = false;

type Waiter = (tokenRefreshed: boolean) => void;
const waitList: Waiter[] = [];

apiService.interceptors.request.use((req) => {
    const accessToken = authService.getAccessToken();

    if (accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`;
    }

    return req;
});

apiService.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
        if (!error.response) {
            return Promise.reject(error);
        }

        const status = error.response.status;

        const originalRequest = error.config as InternalAxiosRequestConfig | undefined;

        if (status !== 401) {
            return Promise.reject(error);
        }

        if (!originalRequest) {
            return Promise.reject(error);
        }

        if (originalRequest.url?.includes(urls.auth.refresh)) {
            authService.deleteTokens();
            await router.navigate("/login?sessionExpired=true");
            return Promise.reject(error);
        }

        const reqWithRetry = originalRequest as InternalAxiosRequestConfig & { _retry?: boolean };
        if (reqWithRetry._retry) {
            return Promise.reject(error);
        }
        reqWithRetry._retry = true;

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                subscribeToWaitList((ok) => {
                    if (!ok) return reject(error);
                    resolve(apiService(reqWithRetry));
                });
            });
        }

        isRefreshing = true;
        try {
            await authService.refresh();
            isRefreshing = false;

            runAfterRefresh(true);

            return apiService(reqWithRetry);
        } catch (e) {
            isRefreshing = false;

            runAfterRefresh(false);

            authService.deleteTokens();
            await router.navigate("/login?sessionExpired=true");
            return Promise.reject(e);
        }
    }
);

function subscribeToWaitList(cb: Waiter): void {
    waitList.push(cb);
}

function runAfterRefresh(ok: boolean): void {
    while (waitList.length) {
        const cb = waitList.pop();
        if (cb) cb(ok);
    }
}
