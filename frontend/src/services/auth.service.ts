import type {IAuth} from "../models/IAuth.ts";
import type {IUser} from "../models/IUser.ts";
import type {ITokens} from "../models/IToken.ts";
import {apiService} from "./api.service.ts";
import type {IResponseType} from "../types/response.type.ts";
import {urls} from "../constants/ursl.ts";

const _accessToken = "accessToken";
const _refreshToken = "refreshToken";

export const authService = {
    async login(user: IAuth): Promise<IUser> {
        const {data} = await apiService.post<ITokens>(urls.auth.login, user);
        this.setTokens(data);
        const { data: me } = await this.me()
        return me
    },

    async refresh(): Promise<void> {
        const refreshToken = this.getRefreshToken();
        if (refreshToken) {
            const {data} = await apiService.post<ITokens>(urls.auth.refresh, {refreshToken});
            this.setTokens(data);
        }
    },

    async logout(): Promise<void> {
        const refreshToken = this.getRefreshToken();

        try {
            if (!refreshToken) return;

            await apiService.post<void>(urls.auth.logout, {refreshToken});
        } finally {
            this.deleteTokens()
        }
    },

    setTokens({accessToken, refreshToken}: ITokens): void {
        localStorage.setItem(_accessToken, accessToken);
        localStorage.setItem(_refreshToken, refreshToken);
    },

    deleteTokens(): void {
        localStorage.removeItem(_accessToken);
        localStorage.removeItem(_refreshToken);
    },

    getAccessToken(): string {
        return localStorage.getItem(_accessToken) || "";
    },

    getRefreshToken(): string {
        return localStorage.getItem(_refreshToken) || "";
    },

    me(): IResponseType<IUser> {
        return apiService.get(urls.auth.me);
    }

}