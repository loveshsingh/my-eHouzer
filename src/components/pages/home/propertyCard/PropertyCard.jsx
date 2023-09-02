import * as React from 'react'
import {useEffect, useState} from 'react'
import Image from "next/image";
import AppRoundButton from "../../../lib/AppRoundButton";
import PropertyCardStyle from "./PropertyCard.module.css"
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {useShortlisted} from "../../../../base/contexts/ShortlistedProvider";
import AppIcon from "../../../lib/AppIcon/AppIcon";
import {AppColors} from "../../../../public/AppColors";
import AppUserNotLoggedInDialog from "../../../lib/AppUserNotLogeedInDialog/AppUserNotLoggedInDialog";
import AppModal from "../../../lib/AppModal/AppModal";
import {StringConstants} from "../../../../constants/StringConstants";

/**
 * @author Lovesh Singh.
 * @since 10-12-2022.
 * @description to render Navbar.
 * @return {JSX.Element}
 */
const PropertyCard = ({property}) => {
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
     * @author Vikrsnt.
     * @since 24-04-2023.
     * @description on click book property.
     * @return {JSX.Element}
     */
    const onClickBookPropertyView = (propertyId) => {
        router.pathname = '/booking'
        router.query["pid"] = propertyId
        router.push(router)
    }

    return (
        <div className={PropertyCardStyle["property"]}>

            <span style={{cursor: "pointer"}} onClick={() => {onClickBookPropertyView(property.id)}}>
                <Image width={100} height={100} src={property?.media?.url} alt={"text"}
                       className={PropertyCardStyle["property__image"]}/>
            </span>


            <div style={{backgroundColor: propertyShortlisted ? AppColors.englishRed : AppColors.white}}
                 onClick={() => onPressShortlist(property)}
                 className={PropertyCardStyle["property__fav-icon-wrapper"]}>
                <AppIcon name={'material-symbols:favorite-outline'}
                         color={propertyShortlisted ? AppColors.white : AppColors.englishRed}/>
            </div>

            <div className={PropertyCardStyle["property__details-box-bg"]}>

                <p className={PropertyCardStyle["property__name"]}>{property.name}</p>
                <p className={PropertyCardStyle["property__location"]}>{property.area},{property.city}</p>
                <p className={PropertyCardStyle["property__size"]}>{property.propertyVariants.map((propertyVariant) => propertyVariant + ", ")} {property.minReraCarpetArea} - {property.maxReraCarpetArea} sq.ft.</p>
                <p className={PropertyCardStyle["property__price"]}>
                    {StringConstants.INDIAN_RUPEE_SYMBOL} {property.minBudget} Cr - {StringConstants.INDIAN_RUPEE_SYMBOL} {property.maxBudget} Cr
                </p>

                <div className={PropertyCardStyle["property__button-wrapper"]}>
                    <AppRoundButton buttonText={"Book a Visit"}
                                    buttonStyle={PropertyCardStyle["property__button--primary"]}
                                    type={"primary"} onClick={() => onClickBookVisit(property.id)}/>
                    <AppRoundButton buttonText={"Book Property"}
                                    buttonStyle={PropertyCardStyle["property__button--white-theme"]}
                                    type={"secondary"}
                                    onClick={() => onClickBookProperty(property.id)}/>
                </div>
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

export default PropertyCard;
