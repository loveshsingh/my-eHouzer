import * as React from 'react'
import {useEffect, useState} from 'react'
import Image from "next/image";
import AppRoundButton from "../../../lib/AppRoundButton";
import ExclusivePropertyStyle from "./ExclusiveProperty.module.css"
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
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
const ExclusiveProperty = ({property}) => {
    const [showUserNotLoggedInDialog, setShowUserNotLoggedInDialog] = useState(false);
    const router = useRouter();
    const {isLoggedIn, shortlistedProperties} = useSelector((state) => state.authReducer);
    const [propertyShortlisted, setPropertyShortlisted] = useState(false)
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
     * @author Lovesh Singh.
     * @since 17-02-2023.
     * @description on click book property.
     * @return {JSX.Element}
     */
    const onClickBookProperty = (propertyId) => {
        // router.pathname = '/booking'
        router.pathname = '/booking-configuration'
        router.query["pid"] = propertyId
        router.push(router)
    }

    /**
     * @author Vikrant
     * @since 25-04-2023.
     * @description on click book property.
     * @return {JSX.Element}
     */
    const onClickBookPropertyView = (propertyId) => {
        router.pathname = '/booking'
        router.query["pid"] = propertyId
        router.push(router)
    }

    return (
        <div className={ExclusivePropertyStyle["property"]}>
            <span style={{cursor: "pointer"}} onClick={() => onClickBookPropertyView(property.id)}>
                <img src={property?.media?.url} alt={"text"} className={ExclusivePropertyStyle["property__image"]}/>
            </span>

            <Image src={property?.developer?.media?.url} width={50} height={50} alt={"text"}
                   className={ExclusivePropertyStyle["property__vip-logo"]}/>

            <div style={{backgroundColor: propertyShortlisted ? AppColors.englishRed : AppColors.white}}
                 onClick={() => onPressShortlist(property)}
                 className={ExclusivePropertyStyle["property__fav-icon-wrapper"]}>
                <AppIcon name={'material-symbols:favorite-outline'}
                         color={propertyShortlisted ? AppColors.white : AppColors.englishRed}/>
            </div>

            <div className={ExclusivePropertyStyle["property__details-box-bg"]}>

                <div className={ExclusivePropertyStyle["property__details-box"]}>

                    <div className={ExclusivePropertyStyle["property__details-wrapper"]}>

                        <div className={ExclusivePropertyStyle["property__name-wrapper"]}>

                            <p className={ExclusivePropertyStyle["property__name"]}>{property.name}</p>
                            <p className={ExclusivePropertyStyle["property__location"]}>{property.area}, {property.city}</p>
                        </div>

                        <p className={ExclusivePropertyStyle["property__price"]}>{StringConstants.INDIAN_RUPEE_SYMBOL} {property.minBudget} Cr
                            - {StringConstants.INDIAN_RUPEE_SYMBOL} {property.maxBudget} Cr</p>

                        <div className={ExclusivePropertyStyle["property__meta-wrapper"]}>

                            {/*<div>
                                <p className={ExclusivePropertyStyle["property__space"]}>{property.type}</p>
                                <p className={ExclusivePropertyStyle["property__price-per-ft"]}>{StringConstants.INDIAN_RUPEE_SYMBOL}. {property.avgPriceSqFt}/
                                    sq.ft</p>
                            </div>*/}

                            <div>
                                <p className={ExclusivePropertyStyle["property__ready-to-move"]}>{property.status}</p>
                                {/*<p className={ExclusivePropertyStyle["property__unfurnished"]}>Unfurnished</p>*/}
                            </div>

                        </div>
                        <div className={ExclusivePropertyStyle["property__size-wrapper"]}>

                            {/*<div>
                                <p className={ExclusivePropertyStyle["property__space"]}>{property.type}</p>
                                <p className={ExclusivePropertyStyle["property__price-per-ft"]}>{StringConstants.INDIAN_RUPEE_SYMBOL}. {property.avgPriceSqFt}/
                                    sq.ft</p>
                            </div>*/}

                            <div>
                                <p className={ExclusivePropertyStyle["property__size"]}>{property.propertyVariants.map((propertyVariant) => propertyVariant + " ")}</p>

                                {/*<p className={ExclusivePropertyStyle["property__unfurnished"]}>Unfurnished</p>*/}
                            </div>

                        </div>

                        <div className={ExclusivePropertyStyle["property__types-wrapper"]}>

                            {property?.exclusive &&
                                <div className={ExclusivePropertyStyle["property__type-wrapper"]}>

                                    <AppIcon name={'ic:round-maps-home-work'}
                                             color={AppColors.roseGold}/>
                                    <p className={ExclusivePropertyStyle["property__type"]}>Exclusive</p>

                                </div>
                            }

                            {property?.assured &&
                                <div className={ExclusivePropertyStyle["property__assured-wrapper"]}>

                                    <AppIcon name={'charm:square-tick'}
                                             color={AppColors.roseGold}/>
                                    <p className={ExclusivePropertyStyle["property__assured"]}>eHouzer Assured</p>

                                </div>
                            }

                            {property?.featured &&
                                <div className={ExclusivePropertyStyle["property__featured-wrapper"]}>

                                    <AppIcon name={'material-symbols:verified'}
                                             color={AppColors.roseGold}/>
                                    <p className={ExclusivePropertyStyle["property__featured"]}>Featured</p>

                                </div>
                            }
                        </div>
                        <div className={ExclusivePropertyStyle["property__button-wrapper"]}>

                            <AppRoundButton buttonText={"Book a Visit"}
                                            buttonStyle={ExclusivePropertyStyle["property__button--primary"]}
                                            type={"primary"} onClick={() => onClickBookVisit(property.id)}/>

                            <AppRoundButton buttonText={"Book Property"}
                                            buttonStyle={ExclusivePropertyStyle["property__button--secondary"]}
                                            type={"secondary"} onClick={() => onClickBookProperty(property.id)}/>

                        </div>
                    </div>
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

export default ExclusiveProperty;
