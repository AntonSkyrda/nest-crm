import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks.ts";
import {useNavigate} from "react-router-dom";
import {useMemo} from "react";
import {authActions} from "../../redux/slices/auth.slice.ts";
import type {IUser} from "../../models/IUser.ts";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu.tsx";
import {Avatar, AvatarFallback} from "../ui/avatar.tsx";

function getDisplayName(user: unknown): { name: string; initials: string } {
    let name = "User";

    if (user && typeof user === "object") {
        const first = "firstName" in user ? (user as IUser).firstName : "";
        const last = "lastName" in user ? (user as IUser).lastName : "";
        const email = "email" in user ? (user as IUser).email : "";

        name = `${first} ${last}`.trim() || email || "User";
    }

    const parts = name.split(" ").filter(Boolean);
    const initials =
        parts.length >= 2
            ? `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase()
            : (parts[0]?.slice(0, 2) ?? "US").toUpperCase();

    return { name, initials };
}

export const HeaderComponent = () => {
    const me = useAppSelector(state => state.auth.me);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { name, initials } = useMemo(() => getDisplayName(me), [me]);

    const onLogout = async () => {
        await dispatch(authActions.logout())
        navigate("/login", { replace: true });
    }

    return (
        <header className="border-b bg-background">
            <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
                <div className="font-semibold">
                    Nest CRM
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                        <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-shadow-xs">{initials}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel className="truncate">
                            {name}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem onClick={onLogout} className="cursor-pointer">
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </header>
    )
}