import * as React from 'react'
import {useEffect, useState} from 'react'
import BookedPropertyCardStyle from './BookedPropertyCard.module.css'
import AppRoundButton from "../../../lib/AppRoundButton";
import {AppColors} from "../../../../public/AppColors";
import AppIcon from "../../../lib/AppIcon/AppIcon";
import {StringConstants} from "../../../../constants/StringConstants";
import {useShortlisted} from "../../../../base/contexts/ShortlistedProvider";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";

/**
 * @author Lovesh Singh.
 * @since 11-01-2023.
 * @description to render book property card.
 * @return {JSX.Element}
 */
const BookedPropertyCard = ({bookedProperty}) => {
    const TAG = 'BookedPropertyCard';
    const imageUrl = bookedProperty?.property?.media.url;
    const logo = bookedProperty?.property?.developer?.media.url;
    const propertyId = bookedProperty?.property?.id;
    const propertyName = bookedProperty?.property?.name;

    const router = useRouter();
    const {shortlistedProperties} = useSelector((state) => state.authReducer);
    const [propertyShortlisted, setPropertyShortlisted] = useState(false)
    const shortlisted = useShortlisted()

    useEffect(() => {
        if (shortlistedProperties?.some((propertyElem) => propertyElem?.id === propertyId)) {
            setPropertyShortlisted(true)
        } else {
            setPropertyShortlisted(false)
        }
    }, [shortlistedProperties, propertyId]);

    const onPressShortlist = (property) => {
        shortlisted.shortlisted(property)
    }

    /**
     * @author Vikrant.
     * @since 19-05-2023.
     * @description on click book visit.
     * @return {JSX.Element}
     */
    const onClickBookVisit = (propertyId) => {
        router.pathname = '/visit'
        router.query["propertyId"] = propertyId
        router.push(router)

    }

    /**
     * @author Vikrant.
     * @since 19-05-2023.
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
     * @since 19-05-2023.
     * @description on click book property.
     * @return {JSX.Element}
     */
    const onClickBookPropertyView = (propertyId) => {
        router.pathname = '/booking'
        router.query["pid"] = propertyId
        router.push(router)
    }

    return (
        <div className={BookedPropertyCardStyle['booked-card']}>
            <img src={imageUrl} alt={"Property Image"}
                 className={BookedPropertyCardStyle['booked-card__image']}
                 onClick={() => onClickBookPropertyView(propertyId)}/>
            <div className={BookedPropertyCardStyle['booked-card__details-button-wrapper']}>
                <div className={BookedPropertyCardStyle['booked-card__details-wrapper']}>
                    <div className={BookedPropertyCardStyle['booked-card__details-container']}>
                        <div className={BookedPropertyCardStyle['booked-card__details']}>
                            <img src={logo} alt={"property logo"}
                                 className={BookedPropertyCardStyle['booked-card__logo']}/>

                            <div className={BookedPropertyCardStyle['booked-card__prop-name-container']}>
                                <p className={BookedPropertyCardStyle['booked-card__prop-name']}>{propertyName}</p>
                                <p className={BookedPropertyCardStyle['booked-card__prop-loc']}>{bookedProperty?.property?.area}, {bookedProperty?.property?.city}</p>
                            </div>
                        </div>

                        <div className={BookedPropertyCardStyle['booked-card__status-container']}>
                            <div className={BookedPropertyCardStyle['booked-card__construction-wrapper']}>
                                <AppIcon name={'fluent-mdl2:construction-cone'}
                                         color={AppColors.roseGold}/>
                                <p className={BookedPropertyCardStyle['booked-card__construction-text']}>
                                    {bookedProperty?.property?.status}
                                </p>
                            </div>

                            {
                                bookedProperty?.property?.assured && (
                                    <div className={BookedPropertyCardStyle['booked-card__assured-wrapper']}>
                                        <AppIcon name={'charm:square-tick'}
                                                 color={AppColors.roseGold}/>
                                        <p className={BookedPropertyCardStyle['booked-card__assured-text']}>{StringConstants.EHouzerAssured}</p>
                                    </div>
                                )
                            }

                        </div>
                    </div>

                    <div className={BookedPropertyCardStyle['booked-card__price-details-container']}>
                        <div className={BookedPropertyCardStyle['booked-card__price-wrapper']}>
                            <p className={BookedPropertyCardStyle['booked-card__price-heading']}>Price</p>
                            <p className={BookedPropertyCardStyle['booked-card__price-value']}>
                                {StringConstants.INDIAN_RUPEE_SYMBOL} {bookedProperty?.property?.minBudget} Cr
                                - {StringConstants.INDIAN_RUPEE_SYMBOL} {bookedProperty?.property?.maxBudget} Cr
                            </p>
                        </div>

                        <div className={BookedPropertyCardStyle['booked-card__configuration-wrapper']}>
                            <p className={BookedPropertyCardStyle['booked-card__configuration-heading']}>Configuration</p>
                            <p className={BookedPropertyCardStyle['booked-card__configuration-value']}>
                                {bookedProperty?.propertyVariant.type}
                            </p>
                        </div>
                    </div>
                </div>

                <div className={BookedPropertyCardStyle['booked-card__button-wrapper']}>
                    {/*  <AppRoundButton buttonText={"Book a Visit"}
                                    buttonStyle={BookedPropertyCardStyle['booked-card__book-visit-button'] + ' ' + BookedPropertyCardStyle['button-margin-right']}
                                    type={"secondary"} onClick={() => onClickBookVisit(propertyId)}/>
                    <AppRoundButton buttonText={"Book"}
                                    buttonStyle={BookedPropertyCardStyle['booked-card__book-button'] + ' ' + BookedPropertyCardStyle['button-margin-right']}
                                    type={"secondary"}
                                    onClick={() => onClickBookProperty(propertyId)}/>*/}
                    <AppRoundButton buttonText={"Agreement"}
                                    buttonStyle={BookedPropertyCardStyle['booked-card__agreement-button'] + ' ' + BookedPropertyCardStyle['button-margin-right']}
                                    type={"secondary"}
                                    onClick={() => {
                                    }}/>
                    <AppRoundButton buttonText={"Finance"}
                                    buttonStyle={BookedPropertyCardStyle['booked-card__finance-button'] + ' ' + BookedPropertyCardStyle['button-margin-right']}
                                    type={"secondary"}
                                    onClick={() => {
                                    }}/>
                    <AppRoundButton buttonText={"Stump Duty"}
                                    buttonStyle={BookedPropertyCardStyle['booked-card__stump-duty-button'] + ' ' + BookedPropertyCardStyle['button-margin-right']}
                                    type={"secondary"}
                                    onClick={() => {
                                    }}/>
                </div>
            </div>

            <div className={BookedPropertyCardStyle['booked-card__fav-icon-wrapper']}
                 onClick={() => onPressShortlist(bookedProperty?.property)}
            >
                {propertyShortlisted ? (
                    <AppIcon name={'mdi:cards-heart'}
                             color={AppColors.englishRed} size={25}/>
                ) : (
                    <AppIcon name={'material-symbols:favorite-outline'}
                             color={AppColors.englishRed} size={25}/>
                )}

                {/*<AppIcon name={'material-symbols:favorite-outline'} color={AppColors.englishRed}/>*/}
            </div>
        </div>
    )
}


export default BookedPropertyCard;
