import {createBrowserRouter, Navigate} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout.tsx";
import {LoginPage} from "../pages/LoginPage.tsx";

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <MainLayout/>,
            children: [
                {
                    index: true,
                    element: <Navigate to={"login"}/>
                },
                {
                    path: "login",
                    element: <LoginPage/>
                }
            ]
        }
    ]
)