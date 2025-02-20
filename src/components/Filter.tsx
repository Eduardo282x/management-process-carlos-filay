/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { IColumns } from "../interfaces/table.interface";
import { Search } from "lucide-react";

interface IFilter {
    tableData: any[];
    setTableData: (value: any) => void;
    tableColumns: IColumns[];
}

export default function Filter({ tableData, setTableData, tableColumns }: IFilter) {
    // useEffects
    useEffect(() => {
        setTableData(tableData);
    }, [tableData]);

    // Main Function
    const changeFilter = (filter: string) => {
        if (tableData && tableData.length > 0) {
            const filterColumn = tableColumns.filter((col: IColumns) => col.canFilter !== false);
            const filtersKey = filterColumn.map((col: IColumns) => col.column);

            const filterSearch = filtersKey.map((col: string) => {
                return (
                    tableData.filter((fil) => {
                        const splitWord = col.split('.');
                        if (splitWord.length == 1) {
                            return (fil[splitWord[0]].toString().toLowerCase().includes(filter.toLowerCase()))
                        }
                        if (splitWord.length == 2) {
                            return (fil[splitWord[0]][splitWord[1]].toString().toLowerCase().includes(filter.toLowerCase()))
                        }
                        if (splitWord.length == 3) {
                            return (fil[splitWord[0]][splitWord[1]][splitWord[2]].toString().toLowerCase().includes(filter.toLowerCase()))
                        }
                        return (fil[col].toString().toLowerCase().includes(filter.toLowerCase()))
                    }
                    )
                )
            }).flat();

            const reduceFilter = new Set(filterSearch);
            const result = [...reduceFilter];
            setTableData(result);
        }
    }


    return (
        <div className="flex items-center justify-center border-2 border-solid border-black rounded-xl py-2 px-4 w-80">
            <input
                className=" outline-none border-none w-full"
                type="text"
                placeholder="Buscar..."
                onChange={(e) => changeFilter(e.target.value)} />
            <Search />
            {/* <TextField onChange={(e) => changeFilter(e.target.value)} label="Buscar por..." variant="outlined" sx={{ width: 400 }} /> */}
        </div>
    )
}
