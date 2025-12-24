import {type SubmitHandler, useForm} from "react-hook-form";
import type {IAuth} from "../../models/IAuth.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks.ts";
import {useNavigate} from "react-router-dom";
import {authActions} from "../../redux/slices/auth.slice.ts";
import {Card, CardContent} from "../ui/card.tsx";
import {Label} from "../ui/label.tsx";
import {Input} from "../ui/input.tsx";
import {Button} from "../ui/button.tsx";

export const LoginComponent = () => {
    const {register, handleSubmit} = useForm<IAuth>();
    const {error} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const logIn: SubmitHandler<IAuth> = async (user) => {
        const {meta: {requestStatus}} = await dispatch(authActions.login({user}))

        if (requestStatus === "fulfilled") {
            navigate("/")
        }
    }

    return (
        <div className="h-screen flex items-center justify-center bg-[#79b35a]">
            <Card className="w-[320px] rounded-xl shadow-lg">
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit(logIn)} className="space-y-4">
                        <div className="space-y-1.5">
                            <Label>Email</Label>
                            <Input
                                type="email"
                                placeholder="name@mail.com"
                                {...register("email")}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label>Password</Label>
                            <Input
                                type="password"
                                placeholder="password"
                                {...register("password")}
                            />
                        </div>
                        <br/>
                        <Button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700"
                        >
                            LOGIN
                        </Button>
                        {error && (
                            <p className="text-center text-sm text-red-600">
                                Username or password incorrect.
                            </p>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}