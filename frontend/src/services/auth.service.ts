import type {IAuth} from "../models/IAuth.ts";
import type {IUser} from "../models/IUser.ts";
import type {ITokens} from "../models/IToken.ts";
import {apiService} from "./api.service.ts";
import type {IResponseType} from "../types/response.type.ts";
import {urls} from "../constants/urls.ts";
import {getApiErrorMessage} from "../utils/api-error.ts";

const _accessToken = "accessToken";
const _refreshToken = "refreshToken";

export const authService = {
    async login(user: IAuth): Promise<IUser> {
        try {
            const {data} = await apiService.post<ITokens>(urls.auth.login, user);
            this.setTokens(data);
            const { data: me } = await this.me()
            return me
        } catch (error: unknown) {
            this.deleteTokens()
            throw new Error(getApiErrorMessage(error, "Login failed."))
        }
    },

    async refresh(): Promise<void> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) return;

        try {
            const { data } = await apiService.post<ITokens>(urls.auth.refresh, { refreshToken });
            this.setTokens(data);
        } catch (error: unknown) {
            this.deleteTokens();
            throw new Error(getApiErrorMessage(error, "Session refresh failed."));
        }
    },

    async logout(): Promise<void> {
        const refreshToken = this.getRefreshToken();

        try {
            if (!refreshToken) return;

            await apiService.post<void>(urls.auth.logout, {refreshToken});
        } catch (error: unknown) {
            throw new Error(getApiErrorMessage(error, "Logout failed."));
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