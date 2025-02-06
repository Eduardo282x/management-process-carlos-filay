import { BookOpen, GraduationCap, PenTool, CreditCard, Users, Wallet, LogOut,ListChecks, Banknote, CalendarFold, CalendarCheck } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'

interface NavItem {
    title: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
    {
        title: "Inscripción",
        href: "/inscripcion",
        icon: BookOpen,
    },
    {
        title: "Registros Inscripción",
        href: "/registros",
        icon: ListChecks,
    },
    {
        title: "Estudiantes",
        href: "/estudiantes",
        icon: GraduationCap,
    },
    {
        title: "Notas",
        href: "/notas",
        icon: PenTool,
    },
    {
        title: "Métodos de Pago",
        href: "/metodos-de-pago",
        icon: Wallet,
    },
    {
        title: "Pagos",
        href: "/pagos",
        icon: CreditCard,
    },
    {
        title: "Mensualidad",
        href: "/mensualidad",
        icon: CalendarFold,
    },
    {
        title: "Pago Mensualidad",
        href: "/mensualidad-pagos",
        icon: CalendarCheck,
    },
    {
        title: "Pago Estudiantes",
        href: "/mensualidad-pagos-estudiantes",
        icon: Banknote,
    },
    {
        title: "Usuarios",
        href: "/usuarios",
        icon: Users,
    }
]

export const AdminSidebar = () => {
    const pathname = useLocation();
    const navigate = useNavigate();
    // const [isOpen, setIsOpen] = useState(false);

    const redirectTo = (location: string) => {
        navigate(location)
    }

    return (
        <div className='w-60'>
            <div className="flex flex-col justify-between h-full p-4">
                <nav className="flex flex-col space-y-2 ">
                    <div className="flex items-center justify-center">
                        <Logo widthLogo="w-20" heightLogo="h-20"></Logo>
                    </div>
                    {navItems.map((item: NavItem, index: number) => (
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
