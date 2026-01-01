import type {AxiosResponse} from "axios";

export type IResponseType<T> = Promise<AxiosResponse<T>>