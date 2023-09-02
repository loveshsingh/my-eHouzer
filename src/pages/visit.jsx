import * as React from 'react'
import {useEffect, useState} from 'react'
import VisitStyle from "../styles/Visit.module.css"
import Head from "next/head";
import Image from "next/image";
import loginImage from "../public/images/login-image.png";
import Footer from "../components/pages/home/footer/Footer";
import DatePickerComponent from "../components/pages/visit/DatePickerComponent/DatePickerComponent";
import TimePickerComponent from "../components/pages/visit/TimePickerComponent/TimePickerComponent";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import VisitBookedComponent from "../components/pages/visit/VisitBookedComponent/VisitBookedComponent";
import {viewProperty} from "../actions/booking";
import {setVisitInfo} from "../actions/visit";

/**
 * @author Lovesh Singh.
 * @since 19-12-2022.
 * @description to render top developer tab.
 * @return {JSX.Element}
 */
const Visit = () => {

    const [proceedWithDateSlot, setProceedWithDateSlot] = useState(true)
    const [proceedWithTimeSlot, setProceedWithTimeSlot] = useState(false)
    const [bookedFinish, setBookedFinish] = useState(false)
    const visitInfo = useSelector((state) => state.visitReducer?.visitInfo);
    const {property} = useSelector((state) => state.bookingReducer);
    const router = useRouter()
    const dispatch = useDispatch()
    const pid = router.query.propertyId;

    useEffect(() => {
        // Component mounted

        return () => {
            // Component unmounted
            dispatch(setVisitInfo({
                bookingDate: "",
                bookingTimeSlot: "",
                propertyId: "",
                type: ""
            }))
        };
    }, []);

    useEffect(() => {
        if (pid)
            dispatch(viewProperty(pid))
    }, [pid])


    useEffect(() => {
        if (visitInfo?.propertyId && visitInfo?.bookingDate && visitInfo?.type) {
            setProceedWithDateSlot(false)
            setProceedWithTimeSlot(true)
            if (visitInfo?.bookingTimeSlot) {
                setProceedWithDateSlot(false)
                setProceedWithTimeSlot(true)
            }
        }
    }, [visitInfo]);


    useEffect(() => {
        if (bookedFinish) {
            setProceedWithDateSlot(false)
            setProceedWithTimeSlot(false)
        }
    }, [bookedFinish]);

    const onSuccessBooking = (visitBooked) => {
        setBookedFinish(visitBooked)
    }

    const onDateSelected = (dateSelected) => {
        setProceedWithTimeSlot(dateSelected)
        setProceedWithDateSlot(!dateSelected)
    }


    return (
        <>
            <div>
                <Head>
                    <title>Visit</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <link rel="stylesheet"
                          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0"/>
                </Head>
                <div className={VisitStyle["visit"]}>
                    <div className={VisitStyle["visit__left-container"]}>
                        <Image src={loginImage} alt={"visit image"}
                               className={VisitStyle["visit__left-container-image"]}/>
                        <p className={VisitStyle["visit__left-container-text"]}>Find Your <span
                            style={{fontSize: "1.2rem", lineHeight: 0}}>Best Smart Real Estate</span></p>
                    </div>

                    <div className={VisitStyle["visit__right-container"]}>
                        {proceedWithDateSlot ? <DatePickerComponent onDateSelected={onDateSelected}/> : null}
                        {proceedWithTimeSlot ? <TimePickerComponent developerMailId={property?.developerMailId}
                                                                    propertyName={property?.name}
                                                                    onSuccessBooking={onSuccessBooking}
                                                                    onBackClicked={onDateSelected}/> : null}
                        {bookedFinish ? <VisitBookedComponent/> : null}
                    </div>

                    <div className={VisitStyle["visit__center-box-wrapper"]}>
                        <div className={VisitStyle["visit__center-white-box"]}></div>
                        <div className={VisitStyle["visit__center-colored-box"]}></div>
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    );
}
export default Visit;
