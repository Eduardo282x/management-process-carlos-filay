import { Outlet } from "react-router-dom"
import { AdminSidebar } from "./AdminSidebar"

export const Layout = () => {
    return (
        <div className="flex items-start justify-between w-screen h-screen overflow-hidden text-black">

            <div className="flex h-full bg-gray-100">
                <AdminSidebar></AdminSidebar>
            </div>

            <div className="flex items-start justify-start w-full p-8 h-screen overflow-auto">
                <Outlet />
            </div>
        </div>
    )
}
