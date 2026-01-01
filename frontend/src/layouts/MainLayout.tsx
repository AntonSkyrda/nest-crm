import {Navigate, Outlet} from "react-router-dom";
import {useAuthGuard} from "../hooks/useAuthGuard.ts";
import {HeaderComponent} from "../components/header-component/HeaderComponent.tsx";


export const MainLayout = () => {
    const { isAuthenticated } = useAuthGuard()

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return(
        <div className="min-h-svh bg-background">
            <HeaderComponent/>
            <main className="mx-auto max-w-5xl p-4">
                <Outlet/>
            </main>
        </div>
    )
}