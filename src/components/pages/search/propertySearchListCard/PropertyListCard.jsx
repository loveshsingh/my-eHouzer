import * as React from "react";
import {useEffect, useState} from "react";
import Image from "next/image";
import PropertyListCardStyle from "./PropertyListCard.module.css";
import AppRoundButton from "../../../lib/AppRoundButton";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import {useShortlisted} from "../../../../base/contexts/ShortlistedProvider";
import {AppColors} from "../../../../public/AppColors";
import AppIcon from "../../../lib/AppIcon/AppIcon";
import AppUserNotLoggedInDialog from "../../../lib/AppUserNotLogeedInDialog/AppUserNotLoggedInDialog";
import AppModal from "../../../lib/AppModal/AppModal";
import {StringConstants} from "../../../../constants/StringConstants";


const PropertyListCard = ({property, booked= false}) => {
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
     * @description on click view property.
     * @return {JSX.Element}
     */
    const onClickBookPropertyView = (propertyId) => {
        router.pathname = '/booking'
        router.query["pid"] = propertyId
        router.push(router)
    }

    return (
        <div className={PropertyListCardStyle["property"]}>
            <div className={PropertyListCardStyle["property__image__wrapper"]}>
                <Image width={100} height={100} src={property?.media?.url} alt={""}
                       className={PropertyListCardStyle["property__image"]}
                       onClick={() => onClickBookPropertyView(property.id)}
                       style={{cursor: "pointer"}}/>
                <div style={{backgroundColor: propertyShortlisted ? AppColors.englishRed : AppColors.white}}
                     onClick={() => onPressShortlist(property)}
                     className={PropertyListCardStyle["property__fav-icon-wrapper"]}>
                    <AppIcon name={'material-symbols:favorite-outline'}
                             color={propertyShortlisted ? AppColors.white : AppColors.englishRed}/>
                </div>
            </div>
            <div className={PropertyListCardStyle["property__details__wrapper"]}>
                <div>
                    <div className={PropertyListCardStyle["property__logo__wrapper"]}>

                        <img src={property?.developer?.media?.url} alt={"text"}
                             className={PropertyListCardStyle["property__developer__logo"]}/>

                        <div className={PropertyListCardStyle["property__name__wrapper"]}>
                            <h3 className={PropertyListCardStyle["property__name"]}>{property.name}</h3>
                            <p className={PropertyListCardStyle["property__location"]}>{property.area},{property.city}</p>
                        </div>
                    </div>
                    <h3 className={PropertyListCardStyle["property__price"]}>
                        {StringConstants.INDIAN_RUPEE_SYMBOL} {property.minBudget} Cr
                        - {StringConstants.INDIAN_RUPEE_SYMBOL} {property.maxBudget} Cr
                    </h3>
                    <p className={PropertyListCardStyle["property__status"]}>{property.status}</p>
                    <p className={PropertyListCardStyle["property__size"]}>{property.propertyVariants.map((propertyVariant) => propertyVariant + " ")}</p>

                    <div className={PropertyListCardStyle["property__types-wrapper"]}>
                        {
                            property?.assured &&
                            <div className={PropertyListCardStyle["property__assured-wrapper"]}>
                                <AppIcon name={'charm:square-tick'}
                                         color={AppColors.roseGold}/>
                                <p className={PropertyListCardStyle["property__assured"]}>{StringConstants.EHouzerAssured}</p>
                            </div>
                        }
                        {
                            property?.exclusive &&
                            <div className={PropertyListCardStyle["property__featured-wrapper"]}>
                                <AppIcon name={'ic:round-maps-home-work'}
                                         color={AppColors.roseGold}/>
                                <p className={PropertyListCardStyle["property__featured"]}>Exclusive</p>

                            </div>
                        }
                        {
                            property?.featured &&
                            <div className={PropertyListCardStyle["property__featured-wrapper"]}>
                                <AppIcon name={'material-symbols:verified'}
                                         color={AppColors.roseGold}/>
                                <p className={PropertyListCardStyle["property__featured"]}>Featured</p>

                            </div>
                        }
                    </div>
                </div>

            </div>
            <div className={PropertyListCardStyle["property__button_wrapper"]}>
                <AppRoundButton buttonText={"Book a Visit"}
                                buttonStyle={PropertyListCardStyle["property__button--primary"]}
                                type={"primary"} onClick={() => onClickBookVisit(property.id)}/>

                {booked ? (
                    <AppRoundButton buttonText={"Booked"}
                                    buttonStyle={PropertyListCardStyle["property__button--secondary-disabled"]}
                                    type={"secondary"}
                                    onClick={() => {
                                    }}/>
                ) : (
                    <AppRoundButton buttonText={"Book Property"}
                                    buttonStyle={PropertyListCardStyle["property__button--secondary"]}
                                    type={"secondary"}
                                    onClick={() => onClickBookProperty(property.id)}/>
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

export default PropertyListCard
