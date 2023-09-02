import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AmenitiesStyle from './Amenties.module.css';
import {loadAmenities} from '../../../../actions/booking';
import {AppColors} from "../../../../public/AppColors";
import AppIcon from "../../../lib/AppIcon/AppIcon";

/**
 * @author Lovesh Singh.
 * @since 19-12-2022.
 * @description to render top developer tab.
 * @return {JSX.Element}
 */
const Amenities = ({amenitiesRef}) => {

    const {property, amenities} = useSelector((state) => state.bookingReducer)
    const dispatch = useDispatch();

    const [amenitiesType, setAmenitiesType] = useState([])

    useEffect(() => {
        if (property && property.amenities) {
            dispatch(loadAmenities(property.id, property.amenities))
        }
    }, [property]);

    return (
        <div className={AmenitiesStyle['amenities']} ref={amenitiesRef}>
            <h1 className={AmenitiesStyle['amenities__heading']}>Amenities</h1>
            <div className={AmenitiesStyle['amenities__detail-wrapper']}>
                {property && property.amenities && property.amenities.map((amenityType) => {
                    const amenityTypeValues = amenities?.[amenityType];

                    return (
                        <div key={amenityType} className={AmenitiesStyle['amenities__detail-wrapper']}>
                            <h1 className={AmenitiesStyle['amenities__detail-main-heading']}>{amenityType}</h1>
                            <div className={AmenitiesStyle['amenities__container']}>
                                {
                                    amenityTypeValues?.map((amenity, index) => {
                                        return (
                                            <AmenitiesDetail key={index} icon={"note"} heading={amenity.name}/>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* <div className={AmentiesStyle["amenties__detail-wrapper"]}>
                <h1 className={AmentiesStyle["amenties__detail-main-heading"]}>Leisure</h1>
                <div className={AmentiesStyle["amenties__container"]}>
                    <AmenitiesDetail icon={"stadia_controller"} heading={"Indoor Games"}/>
                    <AmenitiesDetail icon={"elderly"} heading={"Senior Citizen Area"}/>
                </div>
            </div>
            <div className={AmentiesStyle["amenties__detail-wrapper"]}>
                <h1 className={AmentiesStyle["amenties__detail-main-heading"]}>Fitness</h1>
                <div className={AmentiesStyle["amenties__container"]}>
                    <AmenitiesDetail icon={"fitness_center"} heading={"Gymnasium"}/>
                    <AmenitiesDetail icon={"pool"} heading={"Swimming Pool"}/>
                    <AmenitiesDetail icon={"self_improvement"} heading={"Yoga Area"}/>
                </div>
            </div>
            <div className={AmentiesStyle["amenties__detail-wrapper"]}>
                <h1 className={AmentiesStyle["amenties__detail-main-heading"]}>Safety</h1>
                <div className={AmentiesStyle["amenties__container"]}>
                    <AmenitiesDetail icon={"fire_extinguisher"} heading={"Fire Fighting System"}/>
                </div>
            </div>*/}
        </div>
    )
}

const AmenitiesDetail = ({icon, heading}) => {

    return (
        <div className={AmenitiesStyle['amenities__detail-container']}>
            <div className={AmenitiesStyle['amenities__detail-leftBar']}>
                <AppIcon name={icon}
                         color={AppColors.roseGold} size={25}/>
            </div>
            <div className={AmenitiesStyle['amenities__detail']}>
                <p className={AmenitiesStyle['amenities__detail-heading']}>{heading}</p>
            </div>
        </div>
    )
}

export default Amenities;
