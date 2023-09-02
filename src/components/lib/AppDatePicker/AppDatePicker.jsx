import React, {useEffect, useState} from "react";
import AppDatePickerStyle from "./AppDatePicker.module.css";
import {ALL_MONTH, getDaysofMonthAndYear, THIS_MONTH, THIS_YEAR} from "../../../helper/Utility";

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @constructor
 * @description custom AppDatePIcker Component.
 * @since 19-01-2023
 */
const AppDatePicker = ({onClickDate, selectedDate, selectedMonth, selectedYear}) => {
    const [month, setMonth] = useState(THIS_MONTH)
    const [year, setYear] = useState(THIS_YEAR);

    const [dd, setDd] = useState(selectedDate);
    const [mm, setMm] = useState(selectedMonth);
    const [yy, setYy] = useState(selectedYear);
    const [data, setData] = useState('')

    useEffect(() => {
        setDd(selectedDate)
        setMm(selectedMonth)
        setYy(selectedYear)
    }, [selectedDate, selectedMonth, selectedYear]);


    useEffect(() => {
        setData(getDaysofMonthAndYear(month, year, dd, mm, yy))
    }, [month, year, dd])

    const onChangeMonth = (month) => {
        setMonth(parseInt(month))
    }

    const onChangeYear = (year) => {
        setYear(parseInt(year))
    }

    const selectDate = (e, d) => {
        if (d == null) return;
        setDd(d)
        setMm(month)
        setYy(year)
        onClickDate(d, month, year)
    }

    return (
        <div className={AppDatePickerStyle["calender-box"]}>
            <table className={AppDatePickerStyle["table"]}>
                <tbody>
                <tr className={AppDatePickerStyle["tr"]}>
                    <th className={AppDatePickerStyle["th"]} colSpan={4}>
                        <select defaultValue={THIS_MONTH} value={month}
                                onChange={(e) => onChangeMonth(e.target.value)}
                                className={AppDatePickerStyle["month-box"]}>
                            {Array.from(ALL_MONTH, (v, i) => {
                                return <option key={i} value={i + 1}>{v}</option>
                            })}
                        </select>
                    </th>
                    <th className={AppDatePickerStyle["th"]} colSpan={3}>
                        <select defaultValue={THIS_YEAR} value={year}
                                onChange={(e) => onChangeYear(e.target.value)}
                                className={AppDatePickerStyle["year-box"]}>
                            {Array.from(new Array(60), (v, i) =>
                                <option key={i}
                                        value={THIS_YEAR + i - 10}>{THIS_YEAR + i - 10}</option>
                            )}
                        </select>
                    </th>
                </tr>
                <tr className={AppDatePickerStyle["tr"]}>
                    <th className={AppDatePickerStyle["th"]}>M</th>
                    <th className={AppDatePickerStyle["th"]}>Tu</th>
                    <th className={AppDatePickerStyle["th"]}>W</th>
                    <th className={AppDatePickerStyle["th"]}>Th</th>
                    <th className={AppDatePickerStyle["th"]}>Fri</th>
                    <th className={AppDatePickerStyle["th"]}>Sa</th>
                    <th className={AppDatePickerStyle["sunday"]}>Su</th>
                </tr>

                {Array.from(data, (rows, j) =>
                    <tr className={AppDatePickerStyle["tr"]} key={j}>
                        {Array.from(rows, (v, i) => {
                                if (v.date === 2) {
                                    // console.log("In calendar row: ", v, i)
                                }
                                return v.status === 'disabled'
                                    ?
                                    <td className={`${AppDatePickerStyle[v.class[0]]} ${AppDatePickerStyle[v.class[1]]} ${AppDatePickerStyle[i === 6 ? 'sunday' : 'td']}`}
                                        key={i} onClick={(e) => selectDate(e, null)}>
                                        {v.date}
                                    </td>
                                    :
                                    <td className={`${AppDatePickerStyle[v.class[0]]} ${AppDatePickerStyle[v.class[1]]} ${AppDatePickerStyle[i === 6 ? 'sunday' : 'td']}`}
                                        key={i} onClick={(e) => selectDate(e, v.date)}>
                                        {v.date}
                                    </td>
                            }
                        )}
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default AppDatePicker
