import * as React from 'react'
import PaymentSuccessfulCardStyle from "./PaymentSuccessfulCard.module.css";
import PersonDetailCard from "../personDetailCard/PersonDetailCard";
import AppIcon from "../../../lib/AppIcon/AppIcon";
import {AppColors} from "../../../../public/AppColors";
import {useSelector} from "react-redux";

/**
 * @author Vikrant.
 * @since 25-04-2023.
 * @description to render payment successfully page.
 * @return {JSX.Element}
 */
const PaymentSuccessfulCard = () => {
    const {property, propertyVariant} = useSelector((state) => state.bookingReducer)

    return (

        <div className={PaymentSuccessfulCardStyle["payment-successful__overview"]}>

            <div className={PaymentSuccessfulCardStyle["payment-successful-overview__person-card"]}>
                <PersonDetailCard color={AppColors.successGreen} property={property} propertyVariant={propertyVariant}/>
            </div>
            <div>
                <div>
                    <AppIcon name={'icon-park-solid:success'}
                             color={AppColors.successGreen}
                        // size={app?.isMobile ? 80 : 200}
                             size={80}
                             style={{cursor: 'pointer'}} onClick={''}/>
                </div>
                <div className={PaymentSuccessfulCardStyle['payment-successful-text']}>
                    Booking Submitted!
                </div>
            </div>

        </div>
    )
}

export default PaymentSuccessfulCard;
