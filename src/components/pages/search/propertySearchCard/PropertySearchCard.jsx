import * as React from 'react'
import {useEffect, useState} from 'react'
import AppRoundButton from "../../../lib/AppRoundButton";
import PropertySearchCardStyle from "./PropertySearchCard.module.css"
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import {useShortlisted} from "../../../../base/contexts/ShortlistedProvider";
import {AppColors} from "../../../../public/AppColors";
import AppIcon from "../../../lib/AppIcon/AppIcon";
import AppUserNotLoggedInDialog from "../../../lib/AppUserNotLogeedInDialog/AppUserNotLoggedInDialog";
import AppModal from "../../../lib/AppModal/AppModal";
import {StringConstants} from "../../../../constants/StringConstants";

/**
 * @author Lovesh Singh.
 * @since 10-12-2022.
 * @description to render Navbar.
 * @return {JSX.Element}
 */
const PropertySearchCard = ({property, booked=false}) => {
    const [showUserNotLoggedInDialog, setShowUserNotLoggedInDialog] = useState(false);
    const {isLoggedIn, shortlistedProperties} = useSelector((state) => state.authReducer);
    const [propertyShortlisted, setPropertyShortlisted] = useState(false)
    const router = useRouter();
    const shortlisted = useShortlisted()

    useEffect(() => {
        if (shortlistedProperties?.some((propertyElem) => propertyElem?.id === property.id)) {
            setPropertyShortlisted(true)
        } else {
            setPropertyShortlisted(false)
        }
    }, [shortlistedProperties]);

    const onPressShortlist = (property) => {
        shortlisted.shortlisted(property)
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
        router.push(router)
    }
    /**
     * @author Lovesh Singh.
     * @since 08-02-2023.
     * @description on click book visit.
     * @return {JSX.Element}
     */
    const onClickBookVisit = (propertyId) => {
        if (isLoggedIn) {
            router.pathname = '/visit'
            router.query["propertyId"] = propertyId
            router.push(router)
        } else {
            setShowUserNotLoggedInDialog(true);
        }
    }

    /**
     * @author Vikrant.
     * @since 24-04-2023.
     * @description on click book property configurations view.
     * @return {JSX.Element}
     */
    const onClickBookProperty = (propertyId) => {
        // router.pathname = '/booking'
        router.pathname = '/booking-configuration'
        router.query["pid"] = propertyId
        router.push(router)
    }

    /**
     * @author Lovesh Singh.
     * @since 17-02-2023.
     * @description on click book property.
     * @return {JSX.Element}
     */
    const onClickBookPropertyView = (propertyId) => {
        router.pathname = '/booking'
        router.query["pid"] = propertyId
        router.push(router)
    }

    return (
        <div className={PropertySearchCardStyle["property-search-outer-box__grid"]}>
            <div className={PropertySearchCardStyle["property"]}>
                <img src={property?.media?.url} alt={"text"} className={PropertySearchCardStyle["property__image"]}
                     onClick={() => onClickBookPropertyView(property?.id)}
                     style={{cursor: "pointer"}}/>
                <div style={{backgroundColor: propertyShortlisted ? AppColors.englishRed : AppColors.white}}
                     onClick={() => onPressShortlist(property)}
                     className={PropertySearchCardStyle["property__fav-icon-wrapper"]}>
                    <AppIcon name={'material-symbols:favorite-outline'}
                             color={propertyShortlisted ? AppColors.white : AppColors.englishRed}/>
                </div>
            </div>

            <img src={property?.developer?.media?.url} alt={"text"}
                 className={PropertySearchCardStyle["developer__image"]}/>

            <p className={PropertySearchCardStyle["property__name"]}>{property?.name}</p>
            <p className={PropertySearchCardStyle["property__location"]}>{property?.area}, {property?.city}</p>

            <p className={PropertySearchCardStyle['property__filter-container']}>
                {property?.assured && (
                    <>
                        <AppIcon name={'charm:square-tick'}
                                 color={AppColors.roseGold}/>
                        <span
                            className={PropertySearchCardStyle["property__filter__span"]}>{StringConstants.EHouzerAssured}</span>
                    </>
                )}
                {property?.exclusive && (
                    <>
                        <AppIcon name={'ic:round-maps-home-work'}
                                 color={AppColors.roseGold}/>
                        <span className={PropertySearchCardStyle["property__filter__span"]}>Exclusive Property</span>

                    </>
                )}

                {property?.featured && (
                    <>
                        <AppIcon name={'material-symbols:verified'}
                                 color={AppColors.roseGold}/>
                        <span className={PropertySearchCardStyle["property__filter__span"]}>Featured</span>
                    </>
                )}
            </p>

            <div className={PropertySearchCardStyle["property__status__chip"]}>
                <span className={PropertySearchCardStyle["property__status"]}>{property?.status}</span>
            </div>
            <p className={PropertySearchCardStyle["property__price"]}>
                {StringConstants.INDIAN_RUPEE_SYMBOL} {property?.minBudget} Cr
                - {StringConstants.INDIAN_RUPEE_SYMBOL} {property?.maxBudget} Cr
                {/*<span className={PropertySearchCardStyle["property__size"]}>{property?.propertyVariants.map((propertyVariant) => propertyVariant + ", ")}</span>*/}
                <span
                    className={PropertySearchCardStyle["property__size"]}>{property?.propertyVariants.map((propertyVariant) => propertyVariant + (propertyVariant === property.propertyVariants[property.propertyVariants.length - 1] ? "" : ", "))}</span>
            </p>

            <div className={PropertySearchCardStyle["property__button-wrapper"]}>

                <AppRoundButton onClick={(() => onClickBookVisit(property?.id))} buttonText={"Book a Visit"}
                                buttonStyle={PropertySearchCardStyle["property__button--primary"]}
                                type={"primary"}/>
                {booked?(
                <AppRoundButton buttonText={"Booked"}
                                buttonStyle={PropertySearchCardStyle["property__button--white-theme-disabled"]}
                                type={"secondary"} onClick={() => {}}
                />
                ):(
                <AppRoundButton buttonText={"Book Property"}
                                buttonStyle={PropertySearchCardStyle["property__button--white-theme"]}
                                type={"secondary"} onClick={() => onClickBookProperty(property?.id)}/>
                )}
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

export default PropertySearchCard;
