import { BookOpen, GraduationCap, PenTool, CreditCard, Users, Wallet, LogOut, ListChecks, Banknote, CalendarFold, CalendarCheck, Dock, BookA, NotebookText, ShieldCheck } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import { IUsers, Roles } from '../interfaces/users.interface';
import { useEffect, useState } from 'react';

interface NavItem {
    title: string;
    href: string;
    permission: Roles[];
    icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
    {
        title: "Inscripción",
        href: "/inscripcion",
        icon: BookOpen,
        permission: ['Administrador', 'Secretaria']
    },
    {
        title: "Registros Inscripción",
        href: "/registros",
        icon: ListChecks,
        permission: ['Administrador', 'Secretaria']
    },
    {
        title: "Estudiantes",
        href: "/estudiantes",
        icon: GraduationCap,
        permission: ['Administrador', 'Secretaria']
    },
    {
        title: "Salones",
        href: "/grados",
        icon: Dock,
        permission: ['Administrador']
    },
    {
        title: "Materias",
        href: "/materias",
        icon: BookA,
        permission: ['Administrador', 'Secretaria']
    },
    {
        title: "Actividades",
        href: "/actividades",
        icon: NotebookText,
        permission: ['Administrador', 'Secretaria']
    },
    {
        title: "Notas",
        href: "/notas",
        icon: PenTool,
        permission: ['Administrador', 'Secretaria']
    },
    {
        title: "Métodos de Pago",
        href: "/metodos-de-pago",
        icon: Wallet,
        permission: ['Administrador']
    },
    {
        title: "Pagos Inscripción",
        href: "/pagos",
        icon: CreditCard,
        permission: ['Administrador', 'Secretaria']
    },
    {
        title: "Mensualidad",
        href: "/mensualidad",
        icon: CalendarFold,
        permission: ['Administrador']
    },
    {
        title: "Pago Mensualidad",
        href: "/mensualidad-pagos",
        icon: CalendarCheck,
        permission: ['Administrador', 'Secretaria']
    },
    {
        title: "Pago Estudiantes",
        href: "/mensualidad-pagos-estudiantes",
        icon: Banknote,
        permission: ['Administrador', 'Secretaria']
    },
    {
        title: "Mi perfil",
        href: "/perfil",
        icon: ShieldCheck,
        permission: ['Administrador', 'Secretaria']
    },
    {
        title: "Usuarios",
        href: "/usuarios",
        icon: Users,
        permission: ['Administrador']
    },
]

export const AdminSidebar = () => {
    const pathname = useLocation();
    const navigate = useNavigate();
    const [menu, setMenu] = useState<NavItem[]>(navItems);

    useEffect(() => {
        const userToken: IUsers = JSON.parse(localStorage.getItem('userData') as string);
        const filterMenu = menu.filter(me => me.permission.includes(userToken.rol.rol))
        setMenu(filterMenu);
    }, [])

    const redirectTo = (location: string) => {
        navigate(location)
    }

    return (
        <div className='w-60'>
            <div className="flex flex-col justify-between h-full p-4">
                <div className="flex items-center justify-center">
                    <Logo widthLogo="w-20" heightLogo="h-20"></Logo>
                </div>
                <nav className="flex flex-col justify-start space-y-2 overflow-auto ">
                    {menu && menu.map((item: NavItem, index: number) => (
                        <div
                            key={index}
                            onClick={() => redirectTo(item.href)}
                            style={{ cursor: 'pointer' }}
                            className={
                                `flex items-center space-x-2 px-4 py-2 rounded-md transition-all !cursor-pointer" ${pathname.pathname === item.href ? "bg-blue-600 text-white" : "hover:bg-gray-300"}`
                            }
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.title}</span>
                        </div>
                    ))}
                </nav>

                <div
                    onClick={() => redirectTo('/')}
                    style={{ cursor: 'pointer' }}
                    className={
                        `flex items-center space-x-2 px-4 py-2 rounded-md transition-all !cursor-pointer hover:bg-gray-300`
                    }
                >
                    <LogOut className="h-5 w-5" />
                    <span>Cerrar sesión</span>
                </div>

            </div>
        </div>
    )
}
