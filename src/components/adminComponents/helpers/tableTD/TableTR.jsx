import React from "react";
import tableTDStyles from "./TableTR.module.css"
import {useDispatch} from "react-redux";

const TableTR = ({row, column, status, onClick}) => {
    const dispatch = useDispatch();
    const handleOptionChange = (id, event) => {
        onClick(id, event.target.value)
    };

    return (
        <>
            {row.map((data, i) => (
                <tr key={i} className={tableTDStyles['table-tr']}>
                    {column.map(header => {
                            {
                                return header.value === 'status' ?
                                    <td className={tableTDStyles['table__td']}>
                                        <select className={tableTDStyles['table-select']} value={data[header.value]}
                                                onChange={(event) => handleOptionChange(data.id, event)}>
                                            {/*<option value="">Select an option</option>*/}
                                            {status?.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    : <td className={tableTDStyles['table__td']}>
                                        {data[header.value]}
                                    </td>
                            }
                        }
                    )}
                </tr>
            ))}
        </>
    )
}

export default TableTR
