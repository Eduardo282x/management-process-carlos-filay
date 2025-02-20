import { Dialog, IconButton } from '@mui/material';
import { CirclePlus, Download, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { BaseApiReturn, BaseApi } from '../../backend/BaseAPI';
import { getDataApi, postDataFileGetApi } from '../../backend/basicAPI';
import { FormComponent } from '../../components/FormComponent';
import { SnackbarComponent } from '../../components/SnackbarComponent';
import TableComponent from '../../components/TableComponent';
import { BaseResponse, IOptions } from '../../interfaces/base.interface';
import { actionsValid } from '../../interfaces/table.interface';
import Filter from '../../components/Filter';
import { Loader } from '../../components/loaders/Loader';
import { defaultValuesPay, IFilterPayMonthly, IMonthlyPay, IPayMonthly, monthlyPayColumns, paymentFormData, paymentSchema } from './monthlyPay.data';
import { IMonthly, monthName } from '../monthly/monthly.data';
import { IDataForm } from '../../interfaces/form.interface';
import { IMethodPayment } from '../../interfaces/payment.interface';
import { IStudents } from '../../interfaces/students.interface';
import { formatNumberWithDots } from '../../utils/formaters';
import { IGrades } from '../../interfaces/inscription.interface';
import { useForm } from 'react-hook-form';

export const MonthlyPay = () => {
    const [monthly, setMonthly] = useState<IMonthlyPay[]>([]);
    const [monthlyFilter, setFilterMonthly] = useState<IMonthlyPay[]>([]);
    const [dataTable, setDataTable] = useState<IMonthlyPay[]>([]);
    const [action, setAction] = useState<actionsValid>('add');
    const [loading, setLoading] = useState<boolean>(true);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [defaultValues, setDefaultValues] = useState<IPayMonthly>(defaultValuesPay);
    const [snackbar, setSnackbar] = useState<BaseResponse>({} as BaseResponse);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [dataForm, setDataForm] = useState<IDataForm[]>(paymentFormData);
    const [grades, setGrades] = useState<IOptions[]>([]);
    const [openDialogDownload, setOpenDialogDownload] = useState<boolean>(false);

    const getGradesApi = async () => {
        await getDataApi('/grades').then((response: IGrades[]) => {
            const gradesOptions: IOptions[] = response.map(gra => {
                return {
                    label: gra.grade,
                    value: gra.id
                }
            })
            setGrades(gradesOptions);
        })
    }

    const handleClose = () => setOpenDialog(false);
    const handleCloseDownload = () => setOpenDialogDownload(false);

    const getMonthlyPayApi = async () => {
        setLoading(true);
        await getDataApi('/payments/pendingAmount').then((response: IMonthlyPay[]) => {
            setMonthly(response);
            setFilterMonthly(response);
            setLoading(false)
        })
    }

    const getMonthlyApi = async () => {
        await getDataApi('/payments/monthly').then((response: IMonthly[]) => {
            setDataForm((prevDataForm) => {
                return prevDataForm.map((form) => {
                    if (form.name === 'monthlyFeeId') {
                        return {
                            ...form,
                            options: response.map((monthly) => ({
                                label: monthName(monthly.month),
                                value: monthly.id,
                            })),
                        };
                    }
                    return form;
                });
            });
        })
    }

    const getMethodPaymentApi = async () => {
        await getDataApi('/payments/methods').then((response: IMethodPayment[]) => {
            setDataForm((prevDataForm) => {
                return prevDataForm.map((form) => {
                    if (form.name === 'paymentMethodId') {
                        return {
                            ...form,
                            options: response.map((payment) => ({
                                label: `${payment.bank} - ${payment.owner}`,
                                value: payment.id,
                            })),
                        };
                    }
                    return form;
                });
            });
        })
    }

    const getStudentsApi = async () => {
        await getDataApi('/students').then((response: IStudents[]) => {
            setDataForm((prevDataForm) => {
                return prevDataForm.map((form) => {
                    if (form.name === 'studentId') {
                        return {
                            ...form,
                            options: response.map((student) => ({
                                label: `${student.firstName} ${student.lastName} - ${formatNumberWithDots(student.identify, 'V-', '')}`,
                                value: student.id,
                            })),
                        };
                    }
                    return form;
                });
            });
        })
    }


    useEffect(() => {
        getMonthlyPayApi();
        getMonthlyApi();
        getMethodPaymentApi();
        getStudentsApi();
        getGradesApi();
    }, [])

    const getActionTable = async (action: actionsValid, data: IPayMonthly | IFilterPayMonthly | null) => {

        if (action === 'addDialog') {
            setOpenDialogDownload(true)
            setAction('download')
        }

        if (action === 'download') {
            const parseData: IFilterPayMonthly = data as IFilterPayMonthly
            const response = await postDataFileGetApi(`/payments/download/pendingAmount`, parseData);

            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement("a");
            link.href = url;
            link.download = 'Reporte de notas'; // Cambia el nombre del archivo según tus necesidades
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            reset();
            setOpenDialogDownload(false);
        }

        const responseBaseApi: BaseApiReturn = await BaseApi(action, data, defaultValues, '/payments/pendingAmount');
        setDefaultValues(responseBaseApi.body as IPayMonthly);
        setAction(responseBaseApi.action)
        if (responseBaseApi.open) { setOpenDialog(true) };
        if (responseBaseApi.close) { setOpenDialog(false) };
        if (responseBaseApi.snackbarMessage.message !== '') {
            setSnackbar(responseBaseApi.snackbarMessage);
            setOpenSnackbar(true);
            getMonthlyPayApi();
        };
    }

    const filterStudentByGrade = (grade: string) => {
        if (grade === '') { setFilterMonthly(monthly) }

        if (grade !== '') {
            const monthlyFilter = monthly.filter(mon => mon.grade === grade);
            setFilterMonthly(monthlyFilter)
        }
    }

    const filterStudentByOwe = (grade: string) => {
        if (grade === '') { setFilterMonthly(monthly) }

        if (grade == 'deben') {
            const monthlyFilter = monthly.filter(mon => mon.completePay === false);
            setFilterMonthly(monthlyFilter)
        }

        if (grade == 'solventes') {
            const monthlyFilter = monthly.filter(mon => mon.completePay === true);
            setFilterMonthly(monthlyFilter)
        }
    }

    const { register, handleSubmit, reset } = useForm<IFilterPayMonthly>({
        defaultValues: {
            grade: '',
            status: ''
        },
    });

    const onSubmit = (values: IFilterPayMonthly) => {
        getActionTable('download', values)
    }


    return (
        <div className='w-full'>
            <p className='text-3xl font-semibold mb-5'>Pagos de Mensualidad</p>

            <div className="flex items-center justify-between w-full my-5">
                <Filter tableData={monthlyFilter} setTableData={setDataTable} tableColumns={monthlyPayColumns}></Filter>

                <div className="flex flex-col gap-2 w-80 -mt-6">
                    <label className='font-semibold'>Grados</label>
                    <select
                        onChange={(e) => filterStudentByGrade(e.target.value)}
                        className={`w-full p-3 rounded-lg  border-gray-300 border focus:border-blue-500 selectOption`}  >
                        <option selected hidden>Seleccionar</option>
                        <option value=''>Todos</option>
                        {grades && grades.map((opt: IOptions) => (
                            <option key={opt.value} value={opt.label}>{opt.label}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-2 w-80 -mt-6">
                    <label className='font-semibold'>Estado</label>
                    <select
                        onChange={(e) => filterStudentByOwe(e.target.value)}
                        className={`w-full p-3 rounded-lg  border-gray-300 border focus:border-blue-500 selectOption`}  >
                        <option selected hidden>Seleccionar</option>
                        <option value=''>Todos</option>
                        <option value='deben'>Deben</option>
                        <option value='solventes'>Solventes</option>
                    </select>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => getActionTable('add', {} as IPayMonthly)}
                        className=' outline-none bg-[#2563eb] hover:bg-[#1e40af] transition-all flex items-center justify-center gap-2 rounded-lg text-white px-4 py-2'>
                        <CirclePlus /> Agregar
                    </button>

                    <button
                        onClick={() => getActionTable('addDialog', null)}
                        className=' outline-none bg-green-500 hover:bg-green-700 transition-all flex items-center justify-center gap-2 rounded-lg text-white px-4 py-2'>
                        <Download />Imprimir
                    </button>
                </div>
            </div>

            {loading && <Loader></Loader>}

            {!loading && monthlyFilter.length > 0 && (
                <TableComponent tableData={dataTable} tableColumns={monthlyPayColumns} action={getActionTable} />
            )}

            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <FormComponent
                    title='Mensualidad'
                    dataForm={dataForm}
                    defaultValues={defaultValues}
                    validationSchema={paymentSchema}
                    buttonText={action === 'addApi' ? 'Agregar' : 'Editar'}
                    action={action}
                    func={getActionTable}

                />
            </Dialog>

            <Dialog
                open={openDialogDownload}
                onClose={handleCloseDownload}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className='p-8 w-[25rem] relative'>
                    <div className="absolute top-4 right-4">
                        <IconButton onClick={() => getActionTable('close', null)} >
                            <X color='#ff0000' />
                        </IconButton >
                    </div>
                    <h2>Pago de mensualidad</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className='mt-8 space-y-2' noValidate>

                        <div className="flex flex-col gap-2 w-80 -mt-6">
                            <label className='font-semibold'>Grados</label>
                            <select
                                {...register('grade')}
                                onChange={(e) => filterStudentByGrade(e.target.value)}
                                className={`w-full p-3 rounded-lg  border-gray-300 border focus:border-blue-500 selectOption`}  >
                                <option selected hidden>Seleccionar</option>
                                <option value=''>Todos</option>
                                {grades && grades.map((opt: IOptions) => (
                                    <option key={opt.value} value={opt.label}>{opt.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2 w-80 -mt-6">
                            <label className='font-semibold'>Estado</label>
                            <select
                                {...register('status')}
                                onChange={(e) => filterStudentByOwe(e.target.value)}
                                className={`w-full p-3 rounded-lg  border-gray-300 border focus:border-blue-500 selectOption`}  >
                                <option selected hidden>Seleccionar</option>
                                <option value=''>Todos</option>
                                <option value='deben'>Deben</option>
                                <option value='solventes'>Solventes</option>
                            </select>
                        </div>

                        <div className='pt-3'>
                            <button
                                type="submit"
                                className=" outline-none bg-blue-600 hover:bg-blue-700 w-full p-2 text-white font-bold cursor-pointer transition-colors rounded-lg text-sm"
                            >
                                Descargar
                            </button>
                        </div>
                    </form>
                </div>
            </Dialog>


            <SnackbarComponent baseResponse={snackbar} open={openSnackbar} setOpen={setOpenSnackbar}></SnackbarComponent>

        </div>
    )
}
