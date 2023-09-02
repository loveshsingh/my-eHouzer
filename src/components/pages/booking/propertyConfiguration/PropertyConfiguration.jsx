import * as React from 'react'
import {useEffect, useState} from 'react'
import PropertyConfigurationStyle from "./PropertyConfiguration.module.css";
import {useSelector} from "react-redux";
import AppRoundButton from "../../../lib/AppRoundButton";
import {useRouter} from "next/router";
import AppUserNotLoggedInDialog from "../../../lib/AppUserNotLogeedInDialog/AppUserNotLoggedInDialog";
import AppModal from "../../../lib/AppModal/AppModal";
import {StringConstants} from "../../../../constants/StringConstants";
import {getFormattedDate} from "../../../../helper/Utility";

/**
 * @author Vikrant
 * @since 24-04-2023.
 * @description to display booking configuration.
 * @return {JSX.Element}
 */
const PropertyConfiguration = ({property, setActiveConfiguration}) => {
    const [showUserNotLoggedInDialog, setShowUserNotLoggedInDialog] = useState(false);
    const {isLoggedIn} = useSelector((state) => state.authReducer);
    const {propertyVariants} = useSelector((state) => state.bookingReducer)
    const [selectedVariantId, setSelectedVariantId] = useState('');
    const [activeTabId, setActiveTabId] = useState(0);
    const router = useRouter();

    const setActiveTab = (tabId) => {
        setSelectedVariantId(propertyVariants[tabId]?.id)
        setActiveConfiguration(tabId)
        setActiveTabId(tabId)
    }
    /**
     * @author Vipul Garg .
     * @since 28-04-2023.
     * @description on click close App User Not LoggedIn Dialog.
     * @return {JSX.Element}
     */
    const closeAppUserNotLoggedInDialog = () => {
        setShowUserNotLoggedInDialog(!showUserNotLoggedInDialog)
    }
    /**
     * @author Vipul Garg .
     * @since 28-04-2023.
     * @description on click go To SignIn.
     * @return {JSX.Element}
     */
    const goToSignIn = () => {
        setShowUserNotLoggedInDialog(!showUserNotLoggedInDialog)
        router.pathname = '/signin'
        router.query = {};
        router.push(router)
    }

    useEffect(() => {
        if (propertyVariants.length > 0) {
            setSelectedVariantId(propertyVariants[activeTabId]?.id)
        }
    }, [propertyVariants])

    const onClickBookProperty = (propertyId) => {
        if (isLoggedIn) {
            router.pathname = '/payment'
            router.query["pid"] = propertyId
            router.query["vid"] = selectedVariantId
            router.push(router)
        } else {
            setShowUserNotLoggedInDialog(true);
        }
    }


    return (
        <div className={PropertyConfigurationStyle["configuration"]}>

            <div className={PropertyConfigurationStyle['configuration__description-header']}>
                Select configuration and book
            </div>

            <div className={PropertyConfigurationStyle['configuration__description']}>
                <div className={PropertyConfigurationStyle['configuration__description-name']}>
                    <div className={PropertyConfigurationStyle['configuration__description-big-size']}>
                        {property?.name}
                    </div>
                    <div className={PropertyConfigurationStyle['configuration__description-small-size']}>
                        House
                    </div>
                </div>
                <div className={PropertyConfigurationStyle['configuration__description-name']}>
                    <div className={PropertyConfigurationStyle['configuration__description-big-size']}>
                        {getFormattedDate(property?.possessionDate, "DD MMMM YYYY")}
                    </div>
                    <div className={PropertyConfigurationStyle['configuration__description-small-size']}>
                        Possession Date
                    </div>
                </div>
            </div>

            {/*Start configuration details Section*/}
            {propertyVariants?.map((propertyVariant, i) => (

                <div
                    className={activeTabId === i ? PropertyConfigurationStyle['configuration__details-container-selected'] : PropertyConfigurationStyle['configuration__details-container']}
                    onClick={() => setActiveTab(i, propertyVariant)}>
                    <div
                        className={`${PropertyConfigurationStyle['configuration__details-content']} ${PropertyConfigurationStyle['configuration__diversion-line']}`}>
                        <div
                            className={PropertyConfigurationStyle['configuration__details-big-size']}>{propertyVariant?.type}
                        </div>
                        <div
                            className={PropertyConfigurationStyle['configuration__details-small-size']}>{propertyVariant?.area} sq.
                            ft.
                        </div>
                    </div>
                    <div className={PropertyConfigurationStyle['configuration__details-content']}>
                        <div
                            className={PropertyConfigurationStyle['configuration__details-big-size']}>
                            {StringConstants.INDIAN_RUPEE_SYMBOL} {propertyVariant?.bookingAmt}
                        </div>
                        <div className={PropertyConfigurationStyle['configuration__details-small-size']}>Booking
                            Amount
                        </div>
                    </div>
                </div>

            ))}
            {/*Start configuration details Section*/}

            {/*Start button Section*/}
            <div className={PropertyConfigurationStyle['configuration__btn-container']}>
                <AppRoundButton onClick={() => {
                    if (propertyVariants.length > 0) {
                        onClickBookProperty(property?.id)
                    }
                }}
                                buttonText={"Book Now"}
                                buttonStyle={propertyVariants.length > 0 ? PropertyConfigurationStyle['configuration__book-now-btn'] : PropertyConfigurationStyle['configuration__book-now-btn-disable']}
                                type={"primary"}
                />
            </div>

            {/*Start button Section*/}
            <AppModal
                onClose={closeAppUserNotLoggedInDialog}
                show={showUserNotLoggedInDialog}
            >
                <AppUserNotLoggedInDialog onClickGoToSignIn={goToSignIn} onClose={closeAppUserNotLoggedInDialog}/>
            </AppModal>

        </div>
    )
}

export default PropertyConfiguration;
