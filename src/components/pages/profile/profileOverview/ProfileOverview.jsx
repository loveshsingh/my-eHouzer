import * as React from 'react'
import {useEffect, useState} from 'react'
import profileOverviewStyle from './ProfileOverview.module.css'
import ProgressTracker from "../progressTracker/ProgressTracker";
import VisitCard from "../visitCard/VisitCard";
import ProfileOverviewNavbar from "../profileOverviewNavbar/ProfileOverviewNavbar";
import {useDispatch, useSelector} from "react-redux";
import AppRoundButton from "../../../lib/AppRoundButton";
import {useRouter} from "next/router";
import {fetchBookedPendingProperties, getMeetings, updateProfileData} from "../../../../actions/login";
import {AppColors} from "../../../../public/AppColors";
import AppIcon from "../../../lib/AppIcon/AppIcon";
import VisitCardMobileView from "../visitCardMobileView/VisitCardMobileView";
import {useApp} from "../../../../base/contexts/AppProvider";

/**
 * @author Lovesh Singh.
 * @since 10-01-2022.
 * @description to render profile overview.
 * @return {JSX.Element}
 */
const ProfileOverview = () => {
    const TAG = 'ProfileOverview';
    const app = useApp();
    const dispatch = useDispatch();
    const {
        userProfile,
        visits,
        bookedProperties
    } = useSelector((state) => state.authReducer);

    const {
        bookedPendingPropLoading,
        bookedPendingProperties
    } = useSelector((state) => state.bookingReducer);
    const [profileDetailsEditable, setProfileDetailsEditable] = useState(false)
    const [userAddress, setUserAddress] = useState('');
    const [userCity, setUserCity] = useState('');
    const [userState, setUserState] = useState('');
    const [userPincode, setUserPincode] = useState('');
    const [showUserPincodeError, setShowUserPincodeError] = useState(false);
    const [userContact, setUserContact] = useState('');
    const [showUserContactError, setShowUserContactError] = useState(false);
    const router = useRouter()

    useEffect(() => {
        // if (visits?.todayVisits.length === 0 || visits?.todayVisits.meetingStatus === 'Site Visit Cancelled') {
        if (visits?.todayVisits.length === 0) {
            dispatch(getMeetings("Upcoming", "upcomingVisits"))
        }
        dispatch(fetchBookedPendingProperties("Payment Made"))
    }, []);

    /**
     * @author Lovesh Singh.
     * @since 13-02-2023.
     * @description to check phone is valid or not.
     * @return true if valid phone.
     * @see onSaveProfileDetails
     */
    const isValidPhone = (phone) => {
        let phoneValid = true
        if (!phone || phone.length !== 10) {
            setShowUserContactError(true)
            phoneValid = false
        }

        return phoneValid
    };

    /**
     * @author Lovesh Singh.
     * @since 13-02-2023.
     * @description to check pin code is valid or not.
     * @return true if valid pin code.
     * @see onSaveProfileDetails
     */
    const isValidPinCode = (pinCode) => {
        let pinCodeValid = true
        if (!pinCode || pinCode.length !== 6) {
            setShowUserPincodeError(true)
            pinCodeValid = false
        }

        return pinCodeValid
    };

    const onSaveProfileDetails = (e) => {
        e.preventDefault();

        let updateData = {};

        updateData.address = userAddress
        updateData.city = userCity
        updateData.pincode = userPincode
        updateData.state = userState
        updateData.contactNo = userContact

        if (updateData && isValidPhone(userContact) && isValidPinCode(userPincode)) {
            dispatch(updateProfileData(JSON.stringify(updateData), ({isUpdated}) => {
                if (isUpdated) {
                    setUpdatedData()
                }
            }, undefined))
        }
    }

    const setUpdatedData = () => {
        setProfileDetailsEditable(!profileDetailsEditable)
        setUserAddress(userAddress)
        setUserCity(userCity)
        setUserState(userState)
        setUserPincode(userPincode)
        setUserContact(userContact)
        setShowUserContactError(false)
        setShowUserPincodeError(false)
    }

    useEffect(() => {
        if (userProfile) {
            resetUserProfileDetails()
        }
        const meetingData = "Today"
        dispatch(getMeetings(meetingData, "todayVisits"))

    }, [userProfile]);

    const resetUserProfileDetails = () => {
        setUserAddress(userProfile?.address)
        setUserCity(userProfile?.city)
        setUserState(userProfile?.state)
        setUserPincode(userProfile?.pincode)
        setUserContact(userProfile?.contactNo)
        setProfileDetailsEditable(false)
        setShowUserContactError(false)
        setShowUserPincodeError(false)
    }

    const onPressViewMore = (tabId) => {
        if (!router.query[tabId]) {
            router.query.activeTab = tabId;
            router.push(router);
        }
    }

    const onChangePhone = (e) => {
        let phoneReg = /^[0-9_]*$/
        let phoneNumber = e.target.value

        if (phoneReg.test(phoneNumber) && phoneNumber.length <= 10) {
            setUserContact(phoneNumber)
        }
    }

    const onChangePinCode = (e) => {
        let pinCodeReg = /^[0-9_]*$/
        let pinCode = e.target.value

        if (pinCodeReg.test(pinCode) && pinCode.length <= 6) {
            setUserPincode(pinCode)
        }
    }

    return (
        <div className={profileOverviewStyle['profile-overview']}>
            <p className={profileOverviewStyle['profile-overview__table-heading']}>Pending Order</p>
            <div style={{width: "100%", overflowX: 'scroll'}}>
                <table className={profileOverviewStyle['profile-overview__table']}>
                    <thead>
                    <tr className={profileOverviewStyle['profile-overview__table-row']}>
                        <th className={profileOverviewStyle['profile-overview__table-header']}>S.No.</th>
                        <th className={profileOverviewStyle['profile-overview__table-header']}>Project Name</th>
                        <th className={profileOverviewStyle['profile-overview__table-header']}>Configuration</th>
                        <th className={profileOverviewStyle['profile-overview__table-header']}>Date</th>
                        <th className={profileOverviewStyle['profile-overview__table-header']}>Book/EOI</th>
                        <th className={profileOverviewStyle['profile-overview__table-header']}>Order Status</th>
                        <th className={profileOverviewStyle['profile-overview__table-header']}>Amount</th>
                        <th className={profileOverviewStyle['profile-overview__table-header']}>Action</th>
                    </tr>
                    </thead>

                    <tbody>

                    {(!bookedPendingPropLoading && bookedPendingProperties?.length > 0) ? (
                        <>
                            {bookedPendingProperties?.slice(0, 5)?.map((pendingProperty, i) => (
                                <>
                                    <tr key={i} className={profileOverviewStyle['']}>
                                        <td className={profileOverviewStyle['profile-overview__table-td']}>{i + 1}</td>
                                        <td className={profileOverviewStyle['profile-overview__table-td']}>{pendingProperty?.property?.name}</td>
                                        <td className={profileOverviewStyle['profile-overview__table-td']}>{pendingProperty?.propertyVariant?.type}</td>
                                        <td className={profileOverviewStyle['profile-overview__table-td']}>{pendingProperty?.bookingDate}</td>
                                        <td className={profileOverviewStyle['profile-overview__table-td']}>{}</td>
                                        <td className={profileOverviewStyle['profile-overview__table-td']}>{pendingProperty?.bookingStatus}</td>
                                        <td className={profileOverviewStyle['profile-overview__table-td']}>{pendingProperty?.amount}</td>
                                        <td className={profileOverviewStyle['profile-overview__table-td']}>{}</td>
                                    </tr>
                                </>
                            ))}
                        </>
                    ) : (!bookedPendingPropLoading && bookedPendingProperties?.length === 0) ? (
                        <tr>
                            <td className={profileOverviewStyle['profile-overview__table-td']} colSpan="8"
                                style={{textAlign: 'center'}}>
                                <div className={profileOverviewStyle['profile-overview__table-no-data']}>
                                    No Data Found
                                </div>
                            </td>
                        </tr>
                    ) : (
                        <tr>
                            <td className={profileOverviewStyle['profile-overview__table-td']} colSpan="8"
                                style={{textAlign: 'center'}}>
                                <div className={profileOverviewStyle['profile-overview__table-no-data']}>
                                    Loading...
                                </div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/*Progress Tracker*/}
            <div className={profileOverviewStyle['profile-overview__progress-tracker-wrapper']}>
                <div className={profileOverviewStyle['profile-overview__progress-tracker-heading-container']}>
                    <p className={profileOverviewStyle['profile-overview__progress-tracker-heading']}>Progress
                        Tracker</p>
                    <ProgressTracker status={bookedProperties[0]?.bookingStatus}/>
                </div>

                <div className={profileOverviewStyle['profile-overview__progress-tracker-view-all']}
                     onClick={() => onPressViewMore("MyProperty")}>
                    <p className={profileOverviewStyle['profile-overview__progress-tracker-view-all-heading']}>View
                        All</p>
                </div>
            </div>

            {/*Next Visit*/}
            <div className={profileOverviewStyle['profile-overview__next-visit-wrapper']}>
                <div className={profileOverviewStyle['profile-overview__next-visit-heading-container']}>
                    <p className={profileOverviewStyle['profile-overview__next-visit-heading']}>Next Visit</p>

                    {/* {visits && visits.todayVisits && visits.todayVisits.length > 0 ? (
                        <div className={profileOverviewStyle['profile-overview__next-visit-card-container']}>
                            {visits.todayVisits.map(visit => {
                                if (visit.meetingStatus !== 'Site Visit Cancelled') {
                                    // Display VisitCard only if meetingStatus is not 'Cancelled'
                                    return (
                                        <VisitCard
                                            onClick={() => {}}
                                            key={visit.transactionId}
                                            visitData={visit}
                                        />
                                    );
                                }
                                return null;
                            })}
                        </div>
                    ) : visits && visits.upcomingVisits && visits.upcomingVisits.length > 0 ? (
                        <div className={profileOverviewStyle['profile-overview__next-visit-card-container']}>
                            <VisitCard
                                onClick={() => {}}
                                key={visits.upcomingVisits[0].transactionId}
                                visitData={visits.upcomingVisits[0]}
                            />
                        </div>
                    ) : (
                        <h1 style={{color: '#747474', fontWeight: 500, fontSize: '2rem', textAlign: "center"}}>
                            No data found
                        </h1>
                    )}*/}


                    {visits && visits.todayVisits && visits.todayVisits.length > 0 ? (
                        <div className={profileOverviewStyle['profile-overview__next-visit-card-container']}>

                            {app.isMobile ?
                                <VisitCardMobileView visitData={visits.todayVisits[0]}/>
                                :
                                <VisitCard visitData={visits.todayVisits[0]}/>
                            }


                        </div>
                    ) : visits && visits.upcomingVisits && visits.upcomingVisits.length > 0 ? (
                        <div className={profileOverviewStyle['profile-overview__next-visit-card-container']}>

                            {app.isMobile ?
                                <VisitCardMobileView visitData={visits.upcomingVisits[0]}/>
                                :
                                <VisitCard visitData={visits.upcomingVisits[0]}/>
                            }
                        </div>
                    ) : (
                        <h1 style={{color: '#747474', fontWeight: 500, fontSize: '2rem', textAlign: "center"}}>
                            No data found
                        </h1>
                    )}

                </div>

                <div className={profileOverviewStyle['profile-overview__next-visit-view-all']}
                     onClick={() => onPressViewMore("MyVisits")}>
                    <p className={profileOverviewStyle['profile-overview__next-visit-view-all-heading']}>View All</p>
                </div>
            </div>

            {/*Personal Details*/}
            <div className={profileOverviewStyle['profile-overview__personal-details-wrapper']}>
                <div className={profileOverviewStyle['profile-overview__personal-details-heading-container']}>
                    <p className={profileOverviewStyle['profile-overview__personal-details-heading']}>Personal
                        Details</p>

                    <div className={profileOverviewStyle['profile-overview__inputs-wrapper']}>
                        <div className={profileOverviewStyle['profile-overview__input-container']}>
                            <p className={profileOverviewStyle['profile-overview__input-label']}>Full Address</p>
                            <input type={"text"}
                                   className={profileDetailsEditable ? profileOverviewStyle['profile-overview__input'] : profileOverviewStyle['profile-overview__input--read-only']}
                                   value={userAddress} readOnly={!profileDetailsEditable} onChange={e => {
                                setUserAddress(e.target.value)
                            }}/>
                        </div>

                        <div className={profileOverviewStyle['profile-overview__input-container']}>
                            <p className={profileOverviewStyle['profile-overview__input-label']}>Pincode</p>
                            <input type={"text"}
                                   className={profileDetailsEditable ? profileOverviewStyle['profile-overview__input'] : profileOverviewStyle['profile-overview__input--read-only']}
                                   value={userPincode} readOnly={!profileDetailsEditable}
                                   onChange={e => onChangePinCode(e)}/>
                            {showUserPincodeError ? <p style={{
                                fontSize: "0.8rem",
                                marginTop: "0.5rem",
                                color: "#FF1C1C",
                                fontWeight: 500
                            }}>Please enter valid pin code</p> : null}
                        </div>

                        <div className={profileOverviewStyle['profile-overview__input-container']}>
                            <p className={profileOverviewStyle['profile-overview__input-label']}>State</p>
                            <input type={"text"}
                                   className={profileDetailsEditable ? profileOverviewStyle['profile-overview__input'] : profileOverviewStyle['profile-overview__input--read-only']}
                                   value={userState} readOnly={!profileDetailsEditable} onChange={e => {
                                setUserState(e.target.value)
                            }}/>
                        </div>

                        <div className={profileOverviewStyle['profile-overview__input-container']}>
                            <p className={profileOverviewStyle['profile-overview__input-label']}>City</p>
                            <input type={"text"}
                                   className={profileDetailsEditable ? profileOverviewStyle['profile-overview__input'] : profileOverviewStyle['profile-overview__input--read-only']}
                                   value={userCity} readOnly={!profileDetailsEditable} onChange={e => {
                                setUserCity(e.target.value)
                            }}/>
                        </div>

                        <div className={profileOverviewStyle['profile-overview__input-container']}>
                            <p className={profileOverviewStyle['profile-overview__input-label']}>Mobile Number</p>
                            <input type={"text"}
                                   className={profileDetailsEditable ? profileOverviewStyle['profile-overview__input'] : profileOverviewStyle['profile-overview__input--read-only']}
                                   value={userContact} readOnly={!profileDetailsEditable}
                                   onChange={e => onChangePhone(e)}/>
                            {showUserContactError ? <p style={{
                                fontSize: "0.8rem",
                                marginTop: "0.5rem",
                                color: "#FF1C1C",
                                fontWeight: 500
                            }}>Please enter valid mobile number</p> : null}
                        </div>

                        {!profileDetailsEditable ?
                            <AppIcon name={'jam:pencil-f'}
                                     color={AppColors.roseGold} size={18} style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                cursor: 'pointer'
                            }} onClick={() => setProfileDetailsEditable(true)}/> :
                            <div className={profileOverviewStyle['profile__buttons-wrapper']}>
                                <AppRoundButton onClick={() => resetUserProfileDetails()} buttonText={"Cancel"}
                                                buttonStyle={profileOverviewStyle["profile__save-button--primary"]}
                                                type={"secondary"}/>
                                <AppRoundButton onClick={(e) => onSaveProfileDetails(e)} buttonText={"Save"}
                                                buttonStyle={profileOverviewStyle["profile__save-button--primary"]}
                                                type={"primary"}/>
                            </div>
                        }
                    </div>
                </div>

                {/*   <div className={profileOverviewStyle['profile-overview__personal-details-view-all']}>
                    <p className={profileOverviewStyle['profile-overview__personal-details-view-all-heading']}>View
                        All</p>
                </div>*/}
            </div>

            <ProfileOverviewNavbar/>
        </div>
    )
}


export default ProfileOverview;
