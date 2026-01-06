export const baseUrl = import.meta.env.VITE_API_URL;

const auth = `${baseUrl}/auth`
const orders = `${baseUrl}/orders`
const groups = `${baseUrl}/groups`

export const urls = {
    auth: {
        login: `${auth}/login`,
        register: `${auth}/register`,
        refresh: `${auth}/refresh`,
        me: `${auth}/me`,
        logout: `${auth}/logout`,
    },
    orders: {
        allOrders: orders,
        orderById: (id: number | string) => `${orders}/${id}`,
        orderComment: (id: number | string) => `${orders}/${id}/comments`,
        orderGroup: (id: number | string) => `${orders}/${id}/group`,
    },
    groups: {
        allGroups: groups,
    }
}