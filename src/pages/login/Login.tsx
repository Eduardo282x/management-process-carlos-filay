import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginSchema, UserLoginForm } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScreenLoader } from "../../components/loaders/ScreenLoader";
import ErrorMessage from "../../components/ErrorMessage";
import Logo from "../../components/Logo";


export const Login = () => {

    const [loader, setLoader] = useState<boolean>(false);

    const defaultValues: UserLoginForm = {
        username: '',
        password: ''
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues,
        resolver: zodResolver(LoginSchema)
    });

    function successfulLogin(formData: UserLoginForm) {
        setLoader(true);
        if (formData.username === 'admin' && formData.password === 'admin') {
            reset();
            console.log('Login successful');
        } else {
            reset();
            console.log('User Not Found');
        }

        setTimeout(() => {
            setLoader(false);
        }, 1000);
    }

    return (

        <div className="bg-white rounded-lg px-4 py-6">
            
            {loader && (
                <ScreenLoader></ScreenLoader>
            )}

            <div className="flex justify-center items-center">
                
                <Logo widthLogo="w-35" heightLogo="h-35" />

            </div>

            <form onSubmit={handleSubmit(successfulLogin)} className="space-y-6 p-4" noValidate>
                
                <div className="flex flex-col gap-2">
                    <label className="font-normal text-lg">Nombre de Usuario</label>
                    <input type="username" placeholder="Arcenio24Y"
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

                <div className="flex items-center justify-between">

                    <div className="flex items-start">
                        
                        <div className="flex items-center h-5">
                            <input type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50"/>
                        </div>
                        <div className="ml-3 text-sm">
                            <label className="text-gray-500">Mantener sesión activa</label>
                        </div>

                    </div>

                    <a href="#" className="text-sm font-medium hover:underline">¿Olvidaste tu contraseña?</a>

                </div>

                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Iniciar Sesión</button>

                <p className="text-sm font-light text-gray-500 text-center">
                    ¿No tienes una cuenta aún? <a href="#" className="font-medium hover:underline text-gray-600">Regístrate ahora</a>
                </p>

            </form>

        </div>
    );

}
