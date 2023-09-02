import * as React from 'react'
import BookingOverviewStyle from "./BookingOverview.module.css";
import Image from "next/image";
import AppRoundButton from "../../../lib/AppRoundButton";
import PersonDetailCard from "../personDetailCard/PersonDetailCard";
import {AppColors} from "../../../../public/AppColors";
import AppIcon from "../../../lib/AppIcon/AppIcon";
import {useStepper} from "../../../../base/contexts/StepperProvider";
import {useDispatch, useSelector} from "react-redux";
import {setActiveSteps} from "../../../../actions/payment";
import {useRouter} from "next/router";
import {fetchBookingId} from "../../../../actions/booking";
import {StringConstants} from "../../../../constants/StringConstants";
import {getFormattedDate} from "../../../../helper/Utility";

/**
 * @author Lovesh Singh.
 * @since 19-12-2022.
 * @description to render top developer tab.
 * @return {JSX.Element}
 */
const BookingOverview = () => {
    const TAG = "BookingOverview";
    const router = useRouter();
    const data = {
        propertyId: router.query.pid,
        variantId: router.query.vid
    }
    const {
        currentStep,
        incrementCurrentStep, decrementCurrentStep,
    } = useStepper();
    const dispatch = useDispatch()

    const onPressStep = (tabId) => {
        let clickedTabId = tabId;
        let newArray = [];

        while (clickedTabId > 1) {
            clickedTabId--;
            newArray.push(clickedTabId)
        }

        newArray.push(tabId)
        dispatch(setActiveSteps(newArray));
        if (tabId < currentStep + 1) {
            decrementCurrentStep()
        } else if (tabId > currentStep + 1) {
            incrementCurrentStep();
        }
    }
    const {isLoggedIn} = useSelector((state) => state.authReducer);
    const {property, propertyVariant} = useSelector((state) => state.bookingReducer)

    const onSuccess = (isSuccess) => {
        if (isSuccess) {
            onPressStep(2);
        }
    }

    const handleProceed = () => {
        dispatch(fetchBookingId(data, onSuccess))
    }

    return (
        <>
            {isLoggedIn && (
                <div className={BookingOverviewStyle["booking-overview"]}>
                    {property?.medias?.length > 0 && (
                        <Image src={property?.medias[0]?.url} alt={"text"} width={100} height={100}
                               className={BookingOverviewStyle["booking-overview__image"]}/>
                    )}
                    <div className={BookingOverviewStyle["booking-overview__property-details"]}>
                        <div className={BookingOverviewStyle["booking-overview__property-name-wrapper"]}>
                            <Image src={property?.media?.url} width={100} height={100} alt={"logo"}
                                   className={BookingOverviewStyle["booking-overview__property-logo"]}/>

                            <div>
                                <h1 className={BookingOverviewStyle["booking-overview__property-name"]}>{property?.name}</h1>
                                <p className={BookingOverviewStyle["booking-overview__property-location"]}>
                                    {property?.area}, {property?.city}
                                </p>
                            </div>
                        </div>

                        <div className={BookingOverviewStyle["booking-overview__property-status-info-wrapper"]}>
                            <div className={BookingOverviewStyle["booking-overview__property-status-wrapper"]}>
                                <AppIcon name={'fluent-mdl2:construction-cone'}
                                         color={AppColors.roseGold}/>
                                <p className={BookingOverviewStyle["booking-overview__property-status"]}>{property?.status}</p>
                            </div>

                            <div className={BookingOverviewStyle["booking-overview__property-assured-wrapper"]}>
                                <AppIcon name={'charm:square-tick'}
                                         color={AppColors.roseGold}/>
                                <p className={BookingOverviewStyle["booking-overview__property-assured"]}>
                                    eHouzer
                                    Assured
                                </p>
                            </div>
                        </div>

                    </div>

                    <p className={BookingOverviewStyle["booking-overview__price-heading"]}>Price</p>
                    <p className={BookingOverviewStyle["booking-overview__price"]}>
                        {StringConstants.INDIAN_RUPEE_SYMBOL} {property?.minBudget} Cr
                        - {StringConstants.INDIAN_RUPEE_SYMBOL} {property?.maxBudget} Cr
                    </p>

                    <p className={BookingOverviewStyle["booking-overview__prosession-heading"]}>Possession Date</p>
                    <p className={BookingOverviewStyle["booking-overview__prosession"]}>{getFormattedDate(property?.possessionDate, 'DD-MM-YYYY')}</p>

                    <p className={BookingOverviewStyle["booking-overview__configuration-heading"]}>Configuration</p>
                    <p className={BookingOverviewStyle["booking-overview__configuration"]}>{propertyVariant?.type}</p>

                    <div className={BookingOverviewStyle["booking-overview__person-card"]}>
                        <PersonDetailCard color={'#A8373E'} property={property} propertyVariant={propertyVariant}/>
                    </div>

                    <div className={BookingOverviewStyle["booking-overview__button-wrapper"]}>
                        <AppRoundButton buttonText={"Proceed"}
                                        buttonStyle={BookingOverviewStyle["booking-overview__proceed-button"]}
                                        type={"primary"} onClick={handleProceed}/>
                    </div>
                </div>
            )}
        </>
    )
}

export default BookingOverview;
