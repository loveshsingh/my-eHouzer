import * as React from 'react'
import PersonDetailCardStyle from "./PersonDetailCard.module.css";
import {getFormattedDate} from "../../../../helper/Utility";

/**
 * @author Lovesh Singh.
 * @since 19-12-2022.
 * @description to render top developer tab.
 * @return {JSX.Element}
 */
const PersonDetailCard = ({color, property, propertyVariant}) => {

    return (
        <div className={PersonDetailCardStyle["person-detail"]}>
            <div className={PersonDetailCardStyle["person-detail__wrapper"]}>
                <div className={PersonDetailCardStyle["person-detail__container"]}>
                    <p className={PersonDetailCardStyle["person-detail__salutation"]}>To,</p>
                    <h1 className={PersonDetailCardStyle["person-detail__person-name"]}>{property?.name}</h1>
                    <p className={PersonDetailCardStyle["person-detail__property-detail"]}>Lorem ipsum dolor sit amet
                        consectetur Vestibulum accumsan
                        volutpat eget faucibus. Morbi vestibulum blandit sed aliquam. Lectus eget blandit fells id enim
                        mi egesstas supenisse etc.</p>
                </div>
                <div className={PersonDetailCardStyle["person-detail__date-wrapper"]}>
                    <p className={PersonDetailCardStyle["person-detail__date-heading"]}>Date</p>
                    <p className={PersonDetailCardStyle["person-detail__date"]}>{getFormattedDate(new Date().toString(), "DD-MM-YYYY")}</p>
                </div>
            </div>

            <div className={PersonDetailCardStyle["person-detail__amount-wrapper"]} style={{background: color}}>
                <h1 className={PersonDetailCardStyle["person-detail__amount-heading"]}>Booking Amount</h1>
                <p className={PersonDetailCardStyle["person-detail__amount"]}>&#8377; {propertyVariant?.bookingAmt}</p>
            </div>
        </div>
    )
}

export default PersonDetailCard;
