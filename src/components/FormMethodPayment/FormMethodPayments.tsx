/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton } from "@mui/material"
import { X } from "lucide-react"
import { FC, useEffect, useState } from "react"
import { IFormBodyMethodPayments, IFormMethodPayment } from "./formMethodPayment.data"
import { useForm } from "react-hook-form"
import { FormValues, IDataForm, IOptions } from "../../interfaces/form.interface"

export const FormMethodPayments: FC<IFormMethodPayment> = ({ title, btnText, action, dataForm, defaultValues, func }) => {
    const [currency, setCurrency] = useState<string>('Bs');
    const [changeDataForm, setChangeDataForm] = useState<IDataForm[]>(dataForm);
    const [baseData, setBaseData] = useState<IFormBodyMethodPayments>({} as IFormBodyMethodPayments);

    useEffect(() => {
        const getValues: IFormBodyMethodPayments = defaultValues as IFormBodyMethodPayments;
        setBaseData(getValues);

        if (getValues.type !== '') {
            setCurrency(getValues.type === 'Zelle' ? 'USD' : 'Bs');
            // handleTypeChange(getValues.type);
        }

        // Filtrar datos basados en currency y type
        const filteredDataForm = dataForm.filter((field) => {
            if (field.name === 'owner') {
                return true;
            }
            
            if (currency === 'Bs') {
                return !field.separate?.includes('Zelle'); // Excluir Zelle si la moneda es Bs
            }
            if (currency === 'USD') {
                return field.separate?.includes('Zelle'); // Incluir solo Zelle si la moneda es USD
            }
            return true;
        });

        setChangeDataForm(filteredDataForm);
    }, [currency, dataForm]);

    const handleTypeChange = (type: string) => {
        const updatedDataForm = dataForm.filter((field) => {
            return field.separate?.includes(type) || !field.separate;
        });

        setChangeDataForm(updatedDataForm);
    };


    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        defaultValues,
    });

    const onSubmit = (form: FormValues) => {
        console.log(form);

        func(action, form)
    }

    return (
        <div className='p-8 w-[30rem] relative overflow-x-hidden'>
            <div className="absolute top-4 right-4">
                <IconButton onClick={() => func('close', null)} >
                    <X color='#ff0000' />
                </IconButton >
            </div>
            <h2 className="text-center text-blue-800 font-bold text-2xl">{title}</h2>

            {baseData.type === '' && (
                <div className="flex items-center justify-center rounded-lg w-full mx-auto border-blue-600 border-solid border-2 mt-8">
                    <div onClick={() => setCurrency('Bs')} className={`w-1/2 text-center font-semibold cursor-pointer py-2 px-4 ${currency === 'Bs' ? 'bg-blue-600 text-white' : ''}`}>Bs</div>
                    <div onClick={() => setCurrency('USD')} className={`w-1/2 text-center font-semibold cursor-pointer py-2 px-4 ${currency === 'USD' ? 'bg-blue-600 text-white' : ''}`}>USD</div>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} >
                {changeDataForm && changeDataForm.map((form: IDataForm, index: number) => (
                    (form.type == 'text' &&
                        <div key={index} className="flex flex-col gap-2 !my-3">
                            <label className='font-normal'>{form.label}</label>
                            <input
                                type="text"
                                className={`outline-none w-full px-4 py-2 rounded-lg border-gray-300 border ${errors[form.name]?.message ? 'border-red-500' : 'border-blue-200'} focus:border-blue-500`}
                                {...register(form.name)}
                            />
                            {errors[form.name]?.message && <span className='text-sm text-red-600 font-semibold'>{errors[form.name]?.message?.toString()}</span>}
                        </div>
                    ) ||
                    (form.type == 'email' &&
                        <div key={index} className="flex flex-col gap-2 my-3">
                            <label className='font-normal'>{form.label}</label>
                            <input
                                type="email"
                                className={`w-full p-2 rounded-lg  border-gray-300 border ${errors[form.name]?.message ? 'border-red-500' : 'border-blue-200'} focus:border-blue-500`}
                                {...register(form.name)}
                            />
                            {errors[form.name]?.message && <span className='text-sm text-red-600 font-semibold'>{errors[form.name]?.message?.toString()}</span>}
                        </div>
                    ) ||
                    (form.type == 'select' &&
                        <div key={form.name} className="flex flex-col gap-2 my-3">
                            <label className="font-normal">{form.label}</label>
                            <select
                                className="border rounded-lg w-full p-2"
                                {...register(form.name)}
                                onChange={(e) => {
                                    if (form.name === 'type') handleTypeChange(e.target.value);
                                }}
                            >
                                <option value="" disabled>
                                    Seleccione
                                </option>
                                {form.options?.map((option: IOptions) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )
                ))}

                <div className='pt-3'>
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 w-full p-2 text-white font-bold cursor-pointer transition-colors rounded-lg text-sm"
                    >
                        {btnText}
                    </button>
                </div>
            </form>

        </div>
    )
}
