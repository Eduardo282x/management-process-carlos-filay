import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScreenLoader } from "../../components/loaders/ScreenLoader";
import ErrorMessage from "../../components/ErrorMessage";
import Logo from "../../components/Logo";
import { putDataApiNormal } from "../../backend/basicAPI";
import { BaseResponse, BaseResponseLogin } from "../../interfaces/base.interface";
import { useNavigate } from "react-router-dom";
import { SnackbarComponent } from "../../components/SnackbarComponent";
import { defaultValues, ReturnPasswordFrom, returnPasswordSchema } from "./password.data";

export const Password = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [responseApi, setResponseApi] = useState<BaseResponseLogin>({ message: '', success: false, userData: '' });
    const [loader, setLoader] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm<ReturnPasswordFrom>({
        defaultValues,
        resolver: zodResolver(returnPasswordSchema)
    });

    async function successfulLogin(formData: ReturnPasswordFrom) {
        setLoader(true);
        await putDataApiNormal('/auth', formData).then((response: BaseResponseLogin | BaseResponse) => {
            setResponseApi(response as BaseResponseLogin);
            setOpen(true);
            if (response.success) {
                setTimeout(() => {
                    navigate(-1)
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
                <h2 className="text-center text-xl font-semibold">Recuperar contraseña</h2>
                <form onSubmit={handleSubmit(successfulLogin)} className="space-y-6 p-4" noValidate>
                    <div className="flex flex-col gap-2">
                        <label className="font-normal text-md">Nombre de Usuario</label>
                        <input type="text"
                            className="w-full p-3 border-gray-300 border outline-none rounded-lg"
                            {...register("username")}
                        />
                        {errors.username && (<ErrorMessage>{errors.username.message}</ErrorMessage>)}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-normal text-md">Cédula</label>
                        <input type="text"
                            className="w-full p-3 border-gray-300 border outline-none rounded-lg"
                            {...register("identify")}
                        />
                        {errors.username && (<ErrorMessage>{errors.username.message}</ErrorMessage>)}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-normal text-md">Contraseña</label>
                        <input type="text"
                            className="w-full p-3 border-gray-300 border outline-none rounded-lg"
                            {...register("password")}
                        />
                        {errors.username && (<ErrorMessage>{errors.username.message}</ErrorMessage>)}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-normal text-md">Confirmar Contraseña</label>
                        <input type="text"
                            className="w-full p-3  border-gray-300 border outline-none rounded-lg"
                            {...register("confirmPassword")}
                        />
                        {errors.password && (<ErrorMessage>{errors.password.message}</ErrorMessage>)}
                    </div>

                    <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Recuperar contraseña</button>

                </form>
            </div>
            <SnackbarComponent baseResponse={responseApi} open={open} setOpen={setOpen}></SnackbarComponent>
        </div>
    )
}
