import * as React from 'react'
import VisitCardStyles from './VisitCard.module.css'
import Image from "next/image";
import profileImage from '../../../../public/images/property_1.png'
import {getFormattedDate, getFormattedTime} from "../../../../helper/Utility";

/**
 * @author Lovesh Singh.
 * @since 10-01-2022.
 * @description to render visit card.
 * @return {JSX.Element}
 */
const VisitCard = ({visitData, onClick, activeItem}) => {
    return (
        <div
            className={activeItem === visitData.transactionId ? VisitCardStyles['visit-card'] : VisitCardStyles['visit-card']}
            onClick={onClick?.bind(this, visitData)}>
            <div className={VisitCardStyles['visit-card__time-wrapper']}>
                <p className={VisitCardStyles['visit-card__time']}>{getFormattedTime(visitData.meetingDate + " " + visitData.meetingTime)}</p>
                <p className={VisitCardStyles['visit-card__duration']}>1h 30min</p>
            </div>

            <hr className={VisitCardStyles['visit-card__divider']}/>

            <Image src={visitData.iconUrl} alt={"Profile Image"} width={3} height={3} className={VisitCardStyles['visit-card__profile']}/>

            <div className={VisitCardStyles['visit-card__property-name-wrapper']}>
                <p className={VisitCardStyles['visit-card__property-name']}>{visitData?.rmName != null ? visitData?.rmName : "Yet to be Assigned"}</p>
                <p className={VisitCardStyles['visit-card__property-loc']}>{visitData.area} {visitData.city}</p>
            </div>

            <div className={VisitCardStyles['visit-card__date-wrapper']}>
                <p className={VisitCardStyles['visit-card__date']}>{getFormattedDate(visitData.meetingDate, 'MMMM Do')}</p>
                <p className={VisitCardStyles['visit-card__status']}>{visitData.meetingStatus}</p>
            </div>
        </div>
    )
}


export default VisitCard;
