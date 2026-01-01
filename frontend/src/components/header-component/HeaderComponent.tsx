import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks.ts";
import {useNavigate} from "react-router-dom";
import {useMemo} from "react";
import {authActions} from "../../redux/slices/auth.slice.ts";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu.tsx";
import {Avatar, AvatarFallback} from "../ui/avatar.tsx";
import {getDisplayName} from "../../utils/utils.ts";
import {appRoutes} from "../../constants/app-routes.ts";

export const HeaderComponent = () => {
    const me = useAppSelector(state => state.auth.me);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { name, initials } = useMemo(() => getDisplayName(me), [me]);

    const onLogout = async () => {
        await dispatch(authActions.logout())
        navigate(appRoutes.LOGIN, { replace: true });
    }

    return (
        <header className="border-b bg-[#79b35a]">
            <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
                <div className="font-semibold text-white">
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