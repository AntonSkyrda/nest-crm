import {createBrowserRouter, Navigate} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout.tsx";
import {LoginPage} from "../pages/LoginPage.tsx";
import {OrdersPage} from "../pages/OrdersPage.tsx";
import {appRoutes} from "../constants/app-routes.ts";

export const router = createBrowserRouter(
    [
        {
            path: appRoutes.INDEX,
            element: <MainLayout/>,
            children: [
                {
                    index: true,
                    element: <Navigate to={appRoutes.ORDERS}/>
                },
                {
                    path: appRoutes.ORDERS,
                    element: <OrdersPage/>
                }
            ]
        },
        {
            path: appRoutes.LOGIN,
            element: <LoginPage/>
        }
    ]
)