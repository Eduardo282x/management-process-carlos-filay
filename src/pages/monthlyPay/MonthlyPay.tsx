import { Dialog } from '@mui/material';
import { CirclePlus, Download } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { BaseApiReturn, BaseApi } from '../../backend/BaseAPI';
import { getDataApi } from '../../backend/basicAPI';
import { FormComponent } from '../../components/FormComponent';
import { SnackbarComponent } from '../../components/SnackbarComponent';
import TableComponent from '../../components/TableComponent';
import { BaseResponse, IOptions } from '../../interfaces/base.interface';
import { actionsValid } from '../../interfaces/table.interface';
import Filter from '../../components/Filter';
import { Loader } from '../../components/loaders/Loader';
import { defaultValuesPay, IMonthlyPay, IPayMonthly, monthlyPayColumns, paymentFormData, paymentSchema } from './monthlyPay.data';
import { IMonthly, monthName } from '../monthly/monthly.data';
import { IDataForm } from '../../interfaces/form.interface';
import { IMethodPayment } from '../../interfaces/payment.interface';
import { IStudents } from '../../interfaces/students.interface';
import { formatNumberWithDots } from '../../utils/formaters';
import { IGrades } from '../../interfaces/inscription.interface';

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

    const getActionTable = async (action: actionsValid, data: IPayMonthly) => {
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

                <div className="flex gap-2">
                    <button
                        onClick={() => getActionTable('add', {} as IPayMonthly)}
                        className=' outline-none bg-[#2563eb] hover:bg-[#1e40af] transition-all flex items-center justify-center gap-2 rounded-lg text-white px-4 py-2'>
                        <CirclePlus /> Agregar
                    </button>

                    <button
                        onClick={() => getActionTable('add', {} as IPayMonthly)}
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

            <SnackbarComponent baseResponse={snackbar} open={openSnackbar} setOpen={setOpenSnackbar}></SnackbarComponent>

        </div>
    )
}
