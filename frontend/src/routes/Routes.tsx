import {createBrowserRouter} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout.tsx";
import {LoginPage} from "../pages/LoginPage.tsx";
import {MainPage} from "../pages/MainPage.tsx";

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <MainLayout/>,
            children: [
                {
                    index: true,
                    element: <MainPage/>
                }
            ]
        },
        {
            path: "/login",
            element: <LoginPage/>
        }
    ]
)