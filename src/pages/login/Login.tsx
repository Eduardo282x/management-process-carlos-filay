import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScreenLoader } from "../../components/loaders/ScreenLoader";
import ErrorMessage from "../../components/ErrorMessage";
import Logo from "../../components/Logo";
import { defaultValues, LoginSchema, UserLoginForm } from "./login.data";
import { postDataApi } from "../../backend/basicAPI";
import { BaseResponse, BaseResponseLogin } from "../../interfaces/base.interface";
import { useNavigate } from "react-router-dom";
import { SnackbarComponent } from "../../components/SnackbarComponent";

export const Login = () => {
    const navigate = useNavigate();    
    const [open, setOpen] = useState(false);
    const [responseApi, setResponseApi] = useState<BaseResponseLogin>({ message: '', success: false, userData: '' });
    const [loader, setLoader] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm<UserLoginForm>({
        defaultValues,
        resolver: zodResolver(LoginSchema)
    });

    async function successfulLogin(formData: UserLoginForm) {
        setLoader(true);
        await postDataApi('/auth', formData).then((response: BaseResponseLogin | BaseResponse) => {
            const returnApi = response as BaseResponseLogin;
            setResponseApi(response as BaseResponseLogin);
            setOpen(true);
            if (response.success) {
                localStorage.setItem('userData', JSON.stringify(returnApi.userData));
                setTimeout(() => {
                    navigate('/inicio')
                }, 1500);
            }
            setLoader(false);
        });
    }

    return (

        <div className="bg-blue-600 h-screen w-screen flex items-center justify-center">
            <div className="bg-white rounded-lg px-4 py-6 w-[25rem]">
                {loader && (
                    <ScreenLoader></ScreenLoader>
                )}
                <div className="flex justify-center items-center">
                    <Logo widthLogo="w-35" heightLogo="h-35" />
                </div>
                <form onSubmit={handleSubmit(successfulLogin)} className="space-y-6 p-4" noValidate>
                    <div className="flex flex-col gap-2">
                        <label className="font-normal text-lg">Nombre de Usuario</label>
                        <input type="username" placeholder="Usuario"
                            className="w-full p-3 border-gray-300 border outline-none rounded-lg"
                            {...register("username")}
                        />
                        {errors.username && (<ErrorMessage>{errors.username.message}</ErrorMessage>)}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-normal text-lg">Contraseña</label>
                        <input type="password" placeholder="********"
                            className="w-full p-3  border-gray-300 border outline-none rounded-lg"
                            {...register("password")}
                        />
                        {errors.password && (<ErrorMessage>{errors.password.message}</ErrorMessage>)}
                    </div>

                    <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Iniciar Sesión</button>

                </form>
            </div>
            <SnackbarComponent baseResponse={responseApi} open={open} setOpen={setOpen}></SnackbarComponent>
        </div>
    );

}
