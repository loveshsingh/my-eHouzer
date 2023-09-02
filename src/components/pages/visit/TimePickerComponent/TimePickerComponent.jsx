import * as React from 'react'
import {useEffect, useState} from 'react'
import TimePickerComponentStyle from "./TimePickerComponent.module.css"
import {useDispatch, useSelector} from "react-redux";
import {bookProperty, clearVisitInfo, setVisitInfo} from "../../../../actions/visit";
import AppRoundButton from "../../../lib/AppRoundButton";
import {useRouter} from "next/router";
import AppTimePicker from "../../../lib/AppTimePicker/AppTimePicker";

/**
 * @author Lovesh Singh.
 * @since 08-02-2022.
 * @description to render date picker component.
 * @return {JSX.Element}
 */
const TimePickerComponent = ({developerMailId,propertyName,onSuccessBooking, onBackClicked}) => {

    const visitInfo = useSelector((state) => state.visitReducer?.visitInfo);
    const {userDetails} = useSelector((state) => state.authReducer);
    const dispatch = useDispatch()
    const [selectedTime, setSelectedTime] = useState("")
    const router = useRouter()

    useEffect(() => {
    }, [visitInfo]);

    const onPressBack = () => {
        dispatch(clearVisitInfo())
        delete router.query.bookingTimeSlot
        router.push(router)
        onBackClicked(false)
    }

    const onPressTimeSlot = (timeValue) => {
        setSelectedTime(timeValue)
        router.query.bookingTimeSlot = timeValue
        router.push(router)
    }

    const onPressBook = () => {
        dispatch(setVisitInfo({...{bookingTimeSlot: selectedTime}}))
        dispatch(bookProperty({
            ...visitInfo, ...{
                bookingTimeSlot: selectedTime,
                customerId: userDetails?.userId,
                developerEmailId:developerMailId,
                propertyName:propertyName
            }
        }, onSuccessBooking))
    }

    return (
        <>
            <div className={TimePickerComponentStyle["time-picker"]}>
                <h1 className={TimePickerComponentStyle["time-picker__heading"]}>Pick Your Slot</h1>
                <h3 className={TimePickerComponentStyle["time-picker__sub-heading"]}>Pick a time</h3>
                <AppTimePicker selectedTime={selectedTime} onClickTime={onPressTimeSlot}/>
                <p className={TimePickerComponentStyle["time-picker__desc"]}>All Times are in Eastern Time-(GMT+0530)
                    IST
                    (Kolkata)*</p>
                <div className={TimePickerComponentStyle["time-picker__buttons-wrapper"]}>
                    <AppRoundButton buttonText={"Back"}
                                    buttonStyle={TimePickerComponentStyle["time-picker__button--secondary"]}
                                    type={"secondary"} onClick={onPressBack}/>

                    <AppRoundButton buttonText={"Book"}
                                    buttonStyle={TimePickerComponentStyle["time-picker__button--primary"]}
                                    type={"primary"} onClick={onPressBook}/>
                </div>
            </div>
        </>

    )
}

export default TimePickerComponent;
