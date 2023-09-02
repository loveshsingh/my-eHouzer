import * as React from 'react'
import {useEffect, useState} from 'react'
import DatePickerComponentStyle from "./DatePickerComponent.module.css";
import {THIS_DATE, THIS_MONTH, THIS_YEAR} from "../../../../helper/Utility";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import {setVisitInfo} from "../../../../actions/visit";
import AppDatePicker from "../../../lib/AppDatePicker/AppDatePicker";

/**
 * @author Lovesh Singh.
 * @since 08-02-2022.
 * @description to render date picker component.
 * @return {JSX.Element}
 */
const DatePickerComponent = ({onDateSelected}) => {
    const [dd, setDd] = useState(THIS_DATE);
    const [mm, setMm] = useState(THIS_MONTH);
    const [yy, setYy] = useState(THIS_YEAR);
    const [type, setType] = useState('')
    const [error, setError] = useState('')
    const [propertyId, setPropertyId] = useState('')
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        const routerQuery = router.query;
        if (routerQuery.propertyId) {
            setPropertyId(routerQuery.propertyId)
        }
        if (routerQuery.bookingDate) {
            const bookingDateValue = routerQuery?.bookingDate
            const bookingDate = new Date(bookingDateValue)
            const date = bookingDate.getDate()
            const month = bookingDate.getMonth()
            const year = bookingDate.getFullYear()
            setDd(date)
            setMm(month + 1)
            setYy(year)
        }
        if (routerQuery.type) {
            setType(routerQuery.type)
        }
    }, [router]);

    useEffect(() => {
        updateDateInUrl(dd, mm, yy)
    }, []);

    /**
     * @author Lovesh Singh.
     * @since 17-02-2023.
     * @description to check property id is valid or not.
     * @return true if valid property id.
     * @see submitHandler
     */
    const isValidPropertyId = (propertyId) => {
        let propertyIdValid = true

        if (!propertyId) {
            propertyIdValid = false
            setError('Property id not found! Please Retry...')
            setTimeout(() => {
                router.push("/")
            }, 2000)
        }

        return propertyIdValid
    };

    /**
     * @author Lovesh Singh.
     * @since 17-02-2023.
     * @description to check date is valid or not.
     * @return true if valid date.
     * @see submitHandler
     */
    const isValidDate = (day, month, year) => {
        let dateValid = true

        if (!day || !month || !year) {
            dateValid = false
            setError('Please choose correct date')
        }
        return dateValid
    };

    /**
     * @author Lovesh Singh.
     * @since 17-02-2023.
     * @description to check type is valid or not.
     * @return true if valid type.
     * @see submitHandler
     */
    const isValidType = (type) => {
        let typeValid = true

        if (!type) {
            typeValid = false
            setError('Please choose any type')
        }

        return typeValid
    };

    const submitHandler = () => {
        let visitInfo

        if (isValidPropertyId(propertyId) && isValidDate(dd, mm, yy) && isValidType(type)) {
            visitInfo = {...{propertyId}}
            visitInfo = {...visitInfo, ...{bookingDate: getFormattedDate(dd, mm, yy)}}
            visitInfo = {...visitInfo, ...{type}}
        }

        if (visitInfo) {
            dispatch(setVisitInfo(visitInfo))
            onDateSelected(true)
        }
    }

    const getFormattedDate = (day, month, year) => {
        let formattedMonth = month.toString();
        let formattedDay = day.toString();

        if (day < 10) {
            formattedDay = '0' + day;
        }
        if (month < 10) {
            formattedMonth = `0${month}`;
        }
        return `${year}-${formattedMonth}-${formattedDay}`
    }

    const updateDateInUrl = (date, month, year) => {
        let selectedMonth = month.toString();
        let selectedDate = date.toString();

        if (date < 10) {
            selectedDate = '0' + date;
        }
        if (month < 10) {
            selectedMonth = `0${month}`;
        }
        let formattedDate = `${year}-${selectedMonth}-${selectedDate}`;
        router.query.bookingDate = formattedDate
        router.push(router)
    }

    const onClickBookingType = (type) => {
        setType(type)
        setError('')
        router.query.type = type
        router.push(router)
    }

    const onClickDate = (date, month, year) => {
        updateDateInUrl(date, month, year)
    }

    return (<section className={DatePickerComponentStyle["right-bar"]}>
        <div className={DatePickerComponentStyle["input-box"]}>
            <div className={DatePickerComponentStyle["title"]}>
                <h3>Pick Your Slot</h3>
            </div>
            <div className={DatePickerComponentStyle["subtitle"]}>
                <h3>Choose a Date</h3>
            </div>
            <AppDatePicker selectedDate={dd} selectedMonth={mm} selectedYear={yy} onClickDate={onClickDate}/>
            <div className={DatePickerComponentStyle["visit-type"]}>
                <div onClick={() => onClickBookingType('Physical')}>
                    <input type="radio" checked={type === "Physical"}
                           name="visit_type"/>
                    <label style={{cursor: "pointer"}}>Physical Visit</label>
                </div>
                <div onClick={() => onClickBookingType('Virtual')}>
                    <input type="radio" checked={type === "Virtual"}
                           name="visit_type"/>
                    <label style={{cursor: "pointer"}}>Virtual Visit</label>
                </div>
            </div>
            {error ? <p style={{
                fontSize: "0.8rem", margin: "0.5rem 1.5rem", color: "#FF1C1C", fontWeight: 500
            }}>{error}</p> : null}
            <div className={DatePickerComponentStyle["button-container"]}>
                <input onClick={submitHandler} className={DatePickerComponentStyle["btn"]} type="submit"
                       value="Continue" name=""/>
            </div>
        </div>
    </section>)
}

export default DatePickerComponent;
