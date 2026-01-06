import type {IGroup} from "../models/IGroup.ts";
import {apiService} from "./api.service.ts";
import {urls} from "../constants/urls.ts";
import {getApiErrorMessage} from "../utils/api-error.ts";

export const groupsService = {
    async getAllGroups(): Promise<IGroup[]> {
        try {
            const { data } = await apiService.get<IGroup[]>(urls.groups.allGroups);
            return data
        } catch (error) {
            throw new Error(getApiErrorMessage(error, "Failed to get groups"));
        }
    },

    async createGroup(name: string): Promise<IGroup> {
        try {
            const { data } = await apiService.post<IGroup>(urls.groups.allGroups, {name})
            return data
        } catch (error) {
            throw new Error(getApiErrorMessage(error, "Failed to create group"));
        }
    }
}