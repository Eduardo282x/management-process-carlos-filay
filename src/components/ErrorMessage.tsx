

export default function ErrorMessage({children} : {children: React.ReactNode}) {
    return (
        <div className="text-center py-2 bg-red-100 text-red-600 font-bold p-3 text-sm rounded-lg">
            {children}
        </div>
    );
}
