import * as React from 'react'
import {useEffect, useState} from 'react'
import VisitBookedComponentStyle from "./VisitBookedComponent.module.css"
import Image from "next/image";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import AppRoundButton from "../../../lib/AppRoundButton";

/**
 * @author Lovesh Singh.
 * @since 08-02-2022.
 * @description to render visit booked component.
 * @return {JSX.Element}
 */
const VisitBookedComponent = () => {

    const {property} = useSelector((state) => state.bookingReducer)
    const visitInfo = useSelector((state) => state.visitReducer?.visitInfo);
    const {userDetails} = useSelector((state) => state.authReducer);
    const router = useRouter()
    const [mode, setMode] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')


    useEffect(() => {
        const routerQuery = router.query;
        const bookingDate = routerQuery.bookingDate
        const bookingTimeSlot = routerQuery.bookingTimeSlot
        const type = routerQuery.type
        console.log("Router query: ", routerQuery)
        if (routerQuery.bookingDate) {
            setDate(bookingDate)
        }
        if (routerQuery.bookingTimeSlot) {
            setTime(bookingTimeSlot)
        }
        if (routerQuery.type) {
            setMode(type)
        }
    }, [router]);

    const onPressShowMore = () => {
        router.push('/')
    }


    return (
        <>
            <div className={VisitBookedComponentStyle["visit-booked"]}>
                <div className={VisitBookedComponentStyle["visit-booked__top-container"]}>
                    <div className={VisitBookedComponentStyle["visit-booked__left-container"]}>
                        <h1 className={VisitBookedComponentStyle["visit-booked__left-heading"]}>Hi, {userDetails?.username}</h1>
                        <p className={VisitBookedComponentStyle["visit-booked__sub-heading"]}>Please Make sure</p>
                        <ul className={VisitBookedComponentStyle["visit-booked__list-container"]}>
                            <li className={VisitBookedComponentStyle["visit-booked__list"]}>Reach on time</li>
                            <li className={VisitBookedComponentStyle["visit-booked__list"]}>Reach on time</li>
                            <li className={VisitBookedComponentStyle["visit-booked__list"]}>Reach on time</li>
                            <li className={VisitBookedComponentStyle["visit-booked__list"]}>Reach on time</li>
                            <li className={VisitBookedComponentStyle["visit-booked__list"]}>Reach on time</li>
                        </ul>
                    </div>

                    <hr className={VisitBookedComponentStyle["visit-booked__divider"]}/>

                    <div className={VisitBookedComponentStyle["visit-booked__right-container"]}>
                        <h1 className={VisitBookedComponentStyle["visit-booked__right-heading"]}>Your site visit has
                            been booked!</h1>
                        <div className={VisitBookedComponentStyle["visit-booked__details-container"]}>
                            <div className={VisitBookedComponentStyle["visit-booked__detail-wrapper"]}>
                                <p className={VisitBookedComponentStyle["visit-booked__detail-heading"]}>Mode</p>
                                <p className={VisitBookedComponentStyle["visit-booked__detail"]}>{mode}</p>
                            </div>

                            <div className={VisitBookedComponentStyle["visit-booked__detail-wrapper"]}>
                                <p className={VisitBookedComponentStyle["visit-booked__detail-heading"]}>Date</p>
                                <p className={VisitBookedComponentStyle["visit-booked__detail"]}>{date}</p>
                            </div>

                            <div className={VisitBookedComponentStyle["visit-booked__detail-wrapper"]}>
                                <p className={VisitBookedComponentStyle["visit-booked__detail-heading"]}>Time Slot</p>
                                <p className={VisitBookedComponentStyle["visit-booked__detail"]}>{time}</p>
                            </div>
                        </div>
                        <p className={VisitBookedComponentStyle["visit-booked__desc"]}>Lorem ipsum dolor sti amt
                            lkhklsdlk hlkkla lkhkldsjfso shgklds kdskls </p>
                    </div>
                </div>

                <div className={VisitBookedComponentStyle["visit-booked__bottom-container"]}>
                    <Image className={VisitBookedComponentStyle["visit-booked__property-image"]} width={100}
                           height={100} src={property?.media?.url}
                           alt={"Property image"}/>
                    <div className={VisitBookedComponentStyle["visit-booked__property-wrapper"]}>
                        <Image className={VisitBookedComponentStyle["visit-booked__property-logo"]} width={100}
                               height={100} src={property?.developer?.media?.url}
                               alt={"Property logo"}/>
                        <h1 className={VisitBookedComponentStyle["visit-booked__property-heading"]}>{property?.developer?.name}</h1>
                        <p className={VisitBookedComponentStyle["visit-booked__property-desc"]}>{property?.developer?.description}</p>
                    </div>
                </div>
                <div className={VisitBookedComponentStyle["visit-booked__buttons-wrapper"]}>
                    <AppRoundButton buttonText={"Show more"}
                                    buttonStyle={VisitBookedComponentStyle["visit-booked__button--primary"]}
                                    type={"primary"} onClick={onPressShowMore}/>
                </div>
            </div>
        </>

    )
}

export default VisitBookedComponent;
