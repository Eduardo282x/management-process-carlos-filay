/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IOptions } from '../interfaces/base.interface';
import { IForm, FormValues, IDataForm } from '../interfaces/form.interface';
import { X } from 'lucide-react';
import { IconButton } from '@mui/material';

export const FormComponent = ({ title, action, dataForm, defaultValues, validationSchema, buttonText, func }: IForm) => {

    const { register, reset, handleSubmit, formState: { errors } } = useForm<FormValues>({
        defaultValues,
        resolver: zodResolver(validationSchema as any),
    });

    const onSubmit = (values: any) => {
        console.log(values);
        console.log(action);
        console.log("Funciona");
        reset();
    }

    return (
    <div className='p-8 w-[25rem] relative'>
            <div className="absolute top-4 right-4">
                <IconButton onClick={() => func('close', null)} >
                    <X color='#ff0000' />
                </IconButton >
            </div>
            <h2 className="text-center text-blue-800 font-bold text-2xl">{title}</h2>

            <form onSubmit={handleSubmit(onSubmit)} className='mt-8 space-y-2' noValidate>
                {dataForm && dataForm.map((form: IDataForm, index: number) => (
                    (form.type == 'text' &&
                        <div key={index} className="flex flex-col gap-2 !my-6">
                            <label className='font-normal'>{form.label}</label>
                            <input
                                type="text"
                                className={`outline-none w-full px-4 py-2 rounded-lg border-gray-300 border ${errors[form.name]?.message ? 'border-red-500' : 'border-blue-200'} focus:border-blue-500`}
                                {...register(form.name)}
                            />
                            {errors[form.name]?.message && <span className='text-sm text-red-600 font-semibold'>{errors[form.name]?.message?.toString()}</span>}
                        </div>
                    ) ||
                    (form.type == 'number' &&
                        <div key={index} className="flex flex-col gap-2 my-8">
                            <label className='font-normal'>{form.label}</label>
                            <input
                                type="number"
                                className={`outline-none w-full px-4 py-2 rounded-lg border-gray-300 border ${errors[form.name]?.message ? 'border-red-500' : 'border-blue-200'} focus:border-blue-500`}
                                {...register(form.name, { valueAsNumber: true })}
                            />
                            {errors[form.name]?.message && <span className='text-sm text-red-600 font-semibold'>{errors[form.name]?.message?.toString()}</span>}
                        </div>
                    ) ||
                    (form.type == 'email' &&
                        <div key={index} className="flex flex-col gap-2 my-8">
                            <label className='font-normal'>{form.label}</label>
                            <input
                                type="email"
                                className={`w-full p-3 rounded-lg  border-gray-300 border ${errors[form.name]?.message ? 'border-red-500' : 'border-blue-200'} focus:border-blue-500`}
                                {...register(form.name)}
                            />
                            {errors[form.name]?.message && <span className='text-sm text-red-600 font-semibold'>{errors[form.name]?.message?.toString()}</span>}
                        </div>
                    ) ||
                    (form.type == 'select' &&
                        <div key={index} className="flex flex-col gap-2 my-8">
                            <label className='font-normal'>{form.label}</label>
                            <select
                                {...register(form.name)}
                                className={`w-full p-3 rounded-lg  border-gray-300 border ${errors[form.name]?.message ? 'border-red-500' : 'border-blue-200'} focus:border-blue-500 selectOption`}  >
                                {form.options?.map((opt: IOptions) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>

                            {errors[form.name]?.message && <span className='text-sm text-red-600 font-semibold'>{errors[form.name]?.message?.toString()}</span>}
                        </div>
                    ) ||
                    (form.type == 'textArea' &&
                        <div key={index} className="flex flex-col gap-2 my-8">
                            <label className='font-normal'>{form.label}</label>
                            <textarea
                                className={`w-full p-3 rounded-lg border-gray-300 border ${errors[form.name]?.message ? 'border-red-500' : 'border-blue-200'} focus:border-blue-500`}
                                {...register(form.name)}
                            />
                            {errors[form.name]?.message && <span className='text-sm text-red-600 font-semibold'>{errors[form.name]?.message?.toString()}</span>}
                        </div>
                    )
                ))}

                <div className='pt-3'>
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 w-full p-2 text-white font-bold cursor-pointer transition-colors rounded-lg text-sm"
                    >
                        {buttonText}
                    </button>
                </div>
            </form>
        </div>
    );
}