import * as React from 'react'
import {useEffect, useState} from 'react'
import VisitCardFullViewStyle from "./VisitCardFullView.module.css"
import Image from "next/image";
import {deepCopy, getFormattedDate, getFormattedTime} from "../../../../helper/Utility";
import {updateMeetings} from "../../../../actions/login";
import {useDispatch, useSelector} from "react-redux";
import AppDatePicker from "../../../lib/AppDatePicker/AppDatePicker";
import AppTimePicker from "../../../lib/AppTimePicker/AppTimePicker";
import {AppColors} from "../../../../public/AppColors";
import AppIcon from "../../../lib/AppIcon/AppIcon";
import AppModal from "../../../lib/AppModal/AppModal";
import {StatusConstants} from "../../../../constants/StatusConstants";

const styles = {
    container: {
        width: "45rem",
        "@media screen and (max-width: 800px)": {
            width: "25rem",
        },
    },

};

/**
 * @author Lovesh Singh.
 * @since 11-01-2023.
 * @description to render visit card full view.
 * @return {JSX.Element}
 */
const VisitCardFullView = ({visitData}) => {

    const [visitDate, setVisitDate] = useState('');
    const [visitTime, setVisitTime] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showSaveButton, setShowSaveButton] = useState(false);
    const [showCancelButton, setShowCancelButton] = useState(false);
    const [dateEdited, setDateEdited] = useState(false);
    const [timeEdited, setTimeEdited] = useState(false);
    const {userDetails, isLoggedIn} = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();

    // const excludedStatuses = ["Site Visit Cancelled", "Site Visit Completed", "Online Site Visit Completed"];
    const excludedStatuses = StatusConstants.filter(item => item.level > 420 && item.level <= 480)
        .map(item => item.name);


    useEffect(() => {
        if (visitData) {
            setVisitDate(visitData?.meetingDate);
            setVisitTime(visitData?.meetingTime);
        }
    }, [visitData]);

    useEffect(() => {
        setShowSaveButton(dateEdited || timeEdited)
        setShowCancelButton(dateEdited || timeEdited)
    }, [dateEdited, timeEdited]);

    const onHandleCancel = () => {
        const visit = deepCopy(visitData);
        visit.meetingStatus = "Site Visit Cancelled";
        visit.userId = userDetails?.userId;
        dispatch(updateMeetings(JSON.stringify(visit), ({isUpdated}) => {
            if (isUpdated) {
                //setProfileDetailsEditable(!profileDetailsEditable)
            }
        }, undefined))
    }

    const getFormatDate = (day, month, year) => {
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

    const onClickEditDate = () => {
        setShowDatePicker(!showDatePicker)
    }

    const onClickEditTime = () => {
        setShowTimePicker(!showTimePicker)
    }

    const onClickDate = (date, month, year) => {
        if (visitData?.meetingDate !== getFormatDate(date, month, year)) {
            setVisitDate(getFormatDate(date, month, year));
            setDateEdited(true)
        } else {
            setVisitDate(visitData?.meetingDate);
            setDateEdited(false)
        }
        setShowDatePicker(!showDatePicker)
    }

    const onClickTime = (time) => {
        if (visitData?.meetingTime !== time) {
            setVisitTime(time)
            setTimeEdited(true)
        } else {
            setVisitTime(visitData?.meetingTime);
            setTimeEdited(false)
        }
        setShowTimePicker(!showTimePicker)
    }

    const onPressSaveButton = () => {
        const visit = visitData;
        visit.meetingDate = visitDate
        visit.meetingTime = visitTime
        visit.userId = userDetails?.userId
        dispatch(updateMeetings(JSON.stringify(visit), ({isUpdated}) => {
            if (isUpdated) {
                setDateEdited(false)
                setTimeEdited(false)
                //setProfileDetailsEditable(!profileDetailsEditable)
            }
        }, undefined))
    }

    const onPressCancelButton = () => {
        resetMeetingDetails()
    }

    const resetMeetingDetails = () => {
        setVisitDate(visitData.meetingDate);
        setVisitTime(visitData.meetingTime);
        setDateEdited(false)
        setTimeEdited(false)
    }

    return (
        <>
            <div className={VisitCardFullViewStyle['visit-card-fv']}>
                <p className={VisitCardFullViewStyle['visit-card-fv__place-name']}>Meeting Schedule </p>
                <p className={VisitCardFullViewStyle['visit-card-fv__status']}>{visitData?.meetingStatus}</p>

                <div className={VisitCardFullViewStyle['visit-card-fv__profiles-wrapper']}>
                    <div className={VisitCardFullViewStyle['visit-card-fv__image-profile-wrapper']}>
                        <Image src={visitData?.iconUrl} alt={"Profile Image"} width={3} height={3}
                               className={VisitCardFullViewStyle['visit-card-fv__image-profile']}/>
                    </div>
                    <AppIcon name={'mdi:virtual-meeting'}
                             color={AppColors.sonicSilver} size={25}/>
                    <div className={VisitCardFullViewStyle['visit-card-fv__text-profile-wrapper']}>
                        <p className={VisitCardFullViewStyle['visit-card-fv__text-profile']}>{userDetails?.username.charAt(0)}</p>
                    </div>
                </div>

                <p className={VisitCardFullViewStyle['visit-card-fv__property-name']}>{visitData?.rmName != null ? visitData?.rmName : "Yet to be Assigned"}</p>
                <p className={VisitCardFullViewStyle['visit-card-fv__mobile']}>{visitData?.rmContact != null ? visitData?.rmContact : ""}</p>

                <hr className={VisitCardFullViewStyle['visit-card-fv__divider']}/>

                <div className={VisitCardFullViewStyle['visit-card-fv__details-wrapper']}>

                    <p className={VisitCardFullViewStyle['visit-card-fv__date-heading']}>Date</p>
                    <div className={VisitCardFullViewStyle['visit-card-fv__date-wrapper']}>
                        <p style={{color: dateEdited ? '#FF1C1C' : ''}}
                           className={VisitCardFullViewStyle['visit-card-fv__date-value']}>{getFormattedDate(visitDate, "MMMM DD, YYYY")}</p>
                        <AppIcon name={'material-symbols:edit-square'}
                                 color={AppColors.middleRedPurple} onClick={onClickEditDate} style={{
                            display: !excludedStatuses.includes(visitData?.meetingStatus) ? 'flex' : 'none',
                            cursor: 'pointer'
                        }}/>
                    </div>

                    <p className={VisitCardFullViewStyle['visit-card-fv__time-heading']}>Time</p>
                    <div className={VisitCardFullViewStyle['visit-card-fv__time-wrapper']}>
                        <p style={{color: timeEdited ? '#FF1C1C' : ''}}
                           className={VisitCardFullViewStyle['visit-card-fv__time-value']}>{getFormattedTime(visitDate + " " + visitTime)}</p>
                        <AppIcon name={'material-symbols:edit-square'}
                                 color={AppColors.middleRedPurple} onClick={onClickEditTime} style={{
                            display: !excludedStatuses.includes(visitData?.meetingStatus) ? 'flex' : 'none',
                            cursor: 'pointer'
                        }}/>
                    </div>

                    <p className={VisitCardFullViewStyle['visit-card-fv__duration-heading']}>Duration</p>
                    <p className={VisitCardFullViewStyle['visit-card-fv__duration-value']}>1h 30 min</p>

                    <p className={VisitCardFullViewStyle['visit-card-fv__location-heading']}>Property</p>
                    <p className={VisitCardFullViewStyle['visit-card-fv__location-value']}>{visitData?.propertyName}, {visitData?.area} {visitData?.city}</p>
                </div>

                <div className={VisitCardFullViewStyle['visit-card-fv__cancel-meeting-wrapper']}>
                    <p style={{display: !excludedStatuses.includes(visitData?.meetingStatus) ? 'flex' : 'none'}}
                       onClick={onHandleCancel}
                       className={VisitCardFullViewStyle['visit-card-fv__cancel-meeting']}>Cancel Meeting</p>
                </div>

                <div style={{display: showCancelButton ? "flex" : "none"}}
                     className={VisitCardFullViewStyle['visit-card-fv__cancel-button']} onClick={onPressCancelButton}>
                    <AppIcon name={'material-symbols:cancel-rounded'}
                             color={AppColors.sweetBrown} size={25} style={{cursor: 'pointer'}}/>
                </div>

                <div style={{display: showSaveButton ? "flex" : "none"}}
                     className={VisitCardFullViewStyle['visit-card-fv__save-button']} onClick={onPressSaveButton}>
                    <AppIcon name={'material-symbols:check-circle-rounded'}
                             color={AppColors.sweetBrown} size={25} style={{cursor: 'pointer'}}/>
                </div>
                <AppModal
                    onClose={onClickEditDate}
                    show={showDatePicker}
                >
                    <AppDatePicker selectedDate={new Date(visitDate).getDate()}
                                   selectedMonth={new Date(visitDate).getMonth() + 1}
                                   selectedYear={new Date(visitDate).getFullYear()}
                                   onClickDate={onClickDate}/>
                </AppModal>
                <AppModal
                    onClose={onClickEditTime}
                    show={showTimePicker}
                >
                    <div className={VisitCardFullViewStyle['appTimePickerDiv']}>
                        <AppTimePicker selectedTime={visitTime} onClickTime={onClickTime}/>
                    </div>
                </AppModal>
            </div>
        </>
    )
}


export default VisitCardFullView;
