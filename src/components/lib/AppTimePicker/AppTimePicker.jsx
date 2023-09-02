import React from "react";
import AppTimePickerStyle from "./AppTimePicker.module.css";
import {TimeSlotsArray} from "../../../helper/Utility";

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @constructor
 * @description custom AppTimePicker Component.
 * @since 14-02-2023
 */
const AppTimePicker = ({onClickTime, selectedTime}) => {

    return (
        <div className={AppTimePickerStyle["time-picker__time-wrapper"]}>
            {TimeSlotsArray.map((time, i) => {
                return (
                    <div key={i}
                         className={`${AppTimePickerStyle["time-picker__time"]} ${AppTimePickerStyle["time-picker__time--normal"]} ${AppTimePickerStyle[selectedTime === time?.value ? "time-picker__time--selected" : ""]}`}
                         onClick={() => onClickTime(time?.value)}>{time?.value}</div>
                )
            })}
        </div>
    )
}

export default AppTimePicker
