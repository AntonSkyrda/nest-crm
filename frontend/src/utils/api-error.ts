import axios from "axios";

type ApiErrorData =
    | { message?: string, error?: string; errors?: unknown }
    | string
    | undefined
    | null;

export const getApiErrorMessage = (
    error: unknown,
    fallback = "Something went wrong"
) => {
    if (axios.isAxiosError<ApiErrorData>(error)) {
        const data = error.response?.data;

        if (typeof data === "string") return data;

        if (data && typeof data === "object") {
            if (typeof data.message === "string") return data.message;
            if (typeof data.error === "string") return data.error;
        }

        if (!error.response) return "Server connection error";

        return fallback;
    }

    if (error instanceof Error) return error.message;
    return fallback;
}