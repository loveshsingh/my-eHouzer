import * as React from 'react'
import {useEffect, useState} from 'react'
import BookingPriceWrapperStyle from "./BookingPriceWrapper.module.css";
import AppRoundButton from "../../../lib/AppRoundButton";
import {useSelector} from "react-redux";
import {AppColors} from "../../../../public/AppColors";
import AppIcon from "../../../lib/AppIcon/AppIcon";
import {useRouter} from "next/router";
import {useShortlisted} from "../../../../base/contexts/ShortlistedProvider";
import AppUserNotLoggedInDialog from "../../../lib/AppUserNotLogeedInDialog/AppUserNotLoggedInDialog";
import AppModal from "../../../lib/AppModal/AppModal";
import {StringConstants} from "../../../../constants/StringConstants";

/**
 * @author Lovesh Singh.
 * @since 19-12-2022.
 * @description to render top developer tab.
 * @return {JSX.Element}
 */
const BookingPriceWrapper = () => {
    const router = useRouter();
    const {property} = useSelector((state) => state.bookingReducer)
    const {shortlistedProperties, isLoggedIn} = useSelector((state) => state.authReducer);
    const [propertyShortlisted, setPropertyShortlisted] = useState(false)
    const [showUserNotLoggedInDialog, setShowUserNotLoggedInDialog] = useState(false);
    const shortlisted = useShortlisted()

    useEffect(() => {
        if (shortlistedProperties?.some((propertyElem) => propertyElem?.id === property.id)) {
            setPropertyShortlisted(true)
        } else {
            setPropertyShortlisted(false)
        }
    }, [shortlistedProperties, property.id]);

    const onPressShortlist = (property) => {
        shortlisted.shortlisted(property)
    }

    const onClickBookVisit = (propertyId) => {
        if (isLoggedIn) {
            router.pathname = '/visit'
            router.query = {}
            router.query["propertyId"] = propertyId
            router.push(router)
        } else {
            setShowUserNotLoggedInDialog(true);
        }
    }
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
        router.query = {}
        router.pathname = '/signin'
        router.push(router)
    }

    /**
     * @author Vikrant
     * @since 25-04-2023.
     * @description on click book property.
     * @return {JSX.Element}
     */
    const onClickBookProperty = (propertyId) => {
        router.pathname = '/booking-configuration'
        router.query["pid"] = propertyId
        router.push(router)
    }
    return (
        <div className={BookingPriceWrapperStyle["price-wrapper"]}>
            <div className={BookingPriceWrapperStyle["price-text-wrapper"]}>
                <h1 className={BookingPriceWrapperStyle["property-name"]}>{property.name}</h1>
                <p className={BookingPriceWrapperStyle["location"]}>{property.area},{property.city}</p>
                <p className={BookingPriceWrapperStyle["price-text"]}>
                    {StringConstants.INDIAN_RUPEE_SYMBOL} {property.minBudget} Cr
                    - {StringConstants.INDIAN_RUPEE_SYMBOL} {property.maxBudget} Cr
                </p>
            </div>
            <div className={BookingPriceWrapperStyle["property__fav-icon-wrapper-show-for-mobile"]}>
                <div onClick={() => onPressShortlist(property)}
                     className={BookingPriceWrapperStyle["property__fav-icon-wrapper"]}>
                    {propertyShortlisted ? (
                        <AppIcon name={'mdi:cards-heart'}
                                 color={AppColors.englishRed} size={25}/>
                    ) : (
                        <AppIcon name={'material-symbols:favorite-outline'}
                                 color={AppColors.englishRed} size={25}/>
                    )}


                </div>
            </div>
            <div className={BookingPriceWrapperStyle["buttons-wrapper"]}>

                {/*<AppIcon name={'ph:share-network'}
                         color={AppColors.englishRed} size={25}/>*/}
                <div className={BookingPriceWrapperStyle["property__fav-icon-wrapper-show-for-web"]}>
                    <div onClick={() => onPressShortlist(property)}
                         className={BookingPriceWrapperStyle["property__fav-icon-wrapper"]}>
                        {propertyShortlisted ? (
                            <AppIcon name={'mdi:cards-heart'}
                                     color={AppColors.englishRed} size={25}/>
                        ) : (
                            <AppIcon name={'material-symbols:favorite-outline'}
                                     color={AppColors.englishRed} size={25}/>
                        )}


                    </div>
                </div>
                <AppRoundButton buttonText={"Book a Visit"}
                                buttonStyle={BookingPriceWrapperStyle["property__button--primary"]}
                                type={"primary"} onClick={() => onClickBookVisit(property.id)}/>

                <AppRoundButton buttonStyle={BookingPriceWrapperStyle["book-property-button"]}
                                buttonText={"Book Property"}
                                type={"primary"} onClick={() => {
                    onClickBookProperty(property.id)
                }}/>
            </div>
            <AppModal
                onClose={closeAppUserNotLoggedInDialog}
                show={showUserNotLoggedInDialog}
            >
                <AppUserNotLoggedInDialog onClickGoToSignIn={goToSignIn} onClose={closeAppUserNotLoggedInDialog}/>
            </AppModal>
        </div>
    )
}

export default BookingPriceWrapper;
