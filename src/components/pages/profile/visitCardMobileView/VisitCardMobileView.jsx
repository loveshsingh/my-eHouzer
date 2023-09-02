import * as React from 'react'
import {useState} from 'react'
import VisitCardMobileViewStyle from "./VisitCardMobileView.module.css"
import Image from "next/image";
import {getFormattedDate, getFormattedTime} from "../../../../helper/Utility";
import VisitCardFullView from "../visitCardFullView/VisitCardFullView";
import {AppColors} from "../../../../public/AppColors";
import AppIcon from "../../../lib/AppIcon/AppIcon";
import {useSelector} from "react-redux";

/**
 * @author Lovesh Singh.
 * @since 11-01-2023.
 * @description to render visit card full view.
 * @return {JSX.Element}
 */
const VisitCardMobileView = ({visitData}) => {
    const [fullViewCard, setFullViewCard] = useState(false)
    const {userDetails, isLoggedIn} = useSelector((state) => state.authReducer);
    const onPressDownArrow = () => {
        setFullViewCard(!fullViewCard)
    }

    return (
        <>
            {!fullViewCard ? <div className={VisitCardMobileViewStyle['visit-card-fv']}>
                <div className={VisitCardMobileViewStyle['visit-card-fv__profiles-wrapper']}>
                    <div className={VisitCardMobileViewStyle['visit-card-fv__image-profile-wrapper']}>
                        <Image src={visitData?.iconUrl} alt={"Profile Image"} width={3}
                               height={3}
                               className={VisitCardMobileViewStyle['visit-card-fv__image-profile']}/>
                    </div>
                    <AppIcon name={'mdi:virtual-meeting'}
                             color={AppColors.sonicSilver} size={25}/>
                    <div className={VisitCardMobileViewStyle['visit-card-fv__text-profile-wrapper']}>
                        <p className={VisitCardMobileViewStyle['visit-card-fv__text-profile']}>{userDetails?.username.charAt(0)}</p>
                    </div>
                </div>

                <div className={VisitCardMobileViewStyle['visit-card-fv__property-details-wrapper']}>

                    <p className={VisitCardMobileViewStyle['visit-card-fv__property-name']}>{visitData?.rmName != null ? visitData?.rmName : "Yet to be Assigned"}</p>
                    <p className={VisitCardMobileViewStyle['visit-card-fv__mobile']}>{visitData?.rmContact != null ? visitData?.rmContact : ""}</p>
                    <p className={VisitCardMobileViewStyle['visit-card-fv__location-value']}>{visitData?.area} {visitData?.city}</p>
                </div>

                <div className={VisitCardMobileViewStyle['visit-card-fv__details-wrapper']}>

                    <p className={VisitCardMobileViewStyle['visit-card-fv__time-value']}>
                        {/*{getFormattedTime(visitData?.visitTime)}*/}
                        {getFormattedTime(visitData?.meetingDate + " " + visitData?.meetingTime)}
                    </p>
                    <p className={VisitCardMobileViewStyle['visit-card-fv__duration-value']}>1h 30 min</p>
                    <p className={VisitCardMobileViewStyle['visit-card-fv__date-value']}>{getFormattedDate(visitData?.meetingDate, "MMMM DD, YYYY")}</p>
                    <p className={VisitCardMobileViewStyle['visit-card-fv__status']}>{visitData?.status}</p>
                </div>
            </div> : null}
            {fullViewCard ? <VisitCardFullView visitData={visitData}/> : null}
            <div onClick={onPressDownArrow} className={VisitCardMobileViewStyle['visit-card-fv__down-icon-wrapper']}>
                <AppIcon name={fullViewCard ? 'ic:baseline-arrow-drop-up' : 'ic:baseline-arrow-drop-down'}
                         color={AppColors.gray} size={30} style={{cursor: 'pointer'}}/>
            </div>
        </>
    )
}


export default VisitCardMobileView;
