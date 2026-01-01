export const baseUrl = import.meta.env.VITE_API_URL;

const auth = `${baseUrl}/auth`

export const urls = {
    auth: {
        login: `${auth}/login`,
        register: `${auth}/register`,
        refresh: `${auth}/refresh`,
        me: `${auth}/me`,
        logout: `${auth}/logout`,
    }
}