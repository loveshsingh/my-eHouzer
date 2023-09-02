import * as React from 'react'
import {useEffect, useState} from 'react'
import PriceAndFloorPlanStyle from "./PriceAndFloorPlan.module.css";
import logo from "../../../../public/images/vip_logo.png";
import floor_plan from "../../../../public/images/banner_2.png"
import {useDispatch, useSelector} from "react-redux";
import {getVariants} from "../../../../actions/booking";
import Link from "next/link";
import {useRouter} from "next/router";


/**
 * @author Lovesh Singh.
 * @since 19-12-2022.
 * @description to render top developer tab.
 * @return {JSX.Element}
 */
const PriceAndFloorPlan = ({priceAndFloorPlanRef}) => {
    const router = useRouter();

    const {property, variants, developer} = useSelector((state) => state.bookingReducer)

    const [propertyVariantType, setPropertyVariantType] = useState([])
    const [activeFloorPlan, setActiveFloorPlan] = useState()
    const [propertyVariantTypeActive, setPropertyVariantTypeActive] = useState()
    const [roomActive, setRoomActive] = useState(1);
    const [roomSizeActive, setRoomSizeActive] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        if (variants) {
            //console.log("variants",variants[0]?.floorPlan)
            setActiveFloorPlan(variants[0]?.media?.url)
        }
    }, [variants]);


    useEffect(() => {
        if (property && property.propertyVariants) {
            dispatch(getVariants(property.id, property.propertyVariants[0]))
            /*dispatch<any>(getDeveloper(property.developerId))*/
        }
    }, [property]);


    const onClickRoomActive = (tabId, propertyVariant) => {
        setRoomActive(tabId);
        setPropertyVariantTypeActive(propertyVariantType[tabId - 1])
        dispatch(getVariants(property.id, propertyVariant))
    }

    const onClickRoomSizeActive = (tabId) => {
        setRoomSizeActive(tabId);
        setActiveFloorPlan(variants[tabId - 1]?.media?.url);
    }

    const handleClick = (developerId) => {
        router.push(`/search?developerId=${developerId}`)
    }

    return (
        <div className={PriceAndFloorPlanStyle["floor-plan"]} ref={priceAndFloorPlanRef}>
            <h1 className={PriceAndFloorPlanStyle["floor-plan__heading"]}>Price & Floor Plan</h1>
            <div className={PriceAndFloorPlanStyle["floor-plan__rooms-wrapper"]}>
                {property && property.propertyVariants && property.propertyVariants.map((propertyVariant, i) => {
                    return (
                        <RoomComponent key={i} roomValue={propertyVariant} activeRoom={roomActive} roomTabId={i + 1}
                                       onClickRoom={onClickRoomActive}/>
                    )
                })}
            </div>

            {/*    { propertyVariantType.length > 0 && propertyVariantType.map((variantType,i) => {
                    return (
                        <RoomComponent key={i} roomValue={variantType} activeRoom={roomActive} roomTabId={i+1}
                                       onClickRoom={onClickRoomActive}/>
                    )
                })
                }*/}


            {/*<RoomComponent roomValue={"2 BHK"} activeRoom={roomActive} roomTabId={1}
                             onClickRoom={onClickRoomActive}/>
            <RoomComponent roomValue={"3 BHK"} activeRoom={roomActive} roomTabId={2}
                           onClickRoom={onClickRoomActive}/>*/}

            <div className={PriceAndFloorPlanStyle["floor-plan__rooms-size-wrapper"]}>
                {property && variants && variants.map((propertyVariant, i) => {
                    return (<>
                            <RoomSizeComponent key={i}
                                               roomSizeValue={`${propertyVariant.name} ( ${propertyVariant.area}  sq.ft.)`}
                                               roomSizeTabId={i + 1}
                                               propertyFloorPlan={propertyVariant.floorPlan}
                                               activeRoomSize={roomSizeActive} onClickRoomSize={onClickRoomSizeActive}/>
                        </>
                    )
                })}
            </div>

            {property && variants && activeFloorPlan &&
                <img alt={"floor_plan"} src={activeFloorPlan} className={PriceAndFloorPlanStyle["floor-plan__image"]}/>}

            {/* <RoomSizeComponent roomSizeValue={"2 BHK (342 sq. ft.)"} roomSizeTabId={1}
                                   activeRoomSize={roomSizeActive} onClickRoomSize={onClickRoomSizeActive}/>
                <RoomSizeComponent roomSizeValue={"2 BHK (342 sq. ft.)"} roomSizeTabId={2}
                                   activeRoomSize={roomSizeActive} onClickRoomSize={onClickRoomSizeActive}/>*/}

            <div className={PriceAndFloorPlanStyle["floor-plan__property-header-wrapper"]}>
                {property && <img src={property.developer?.media?.url} alt={"logo"}
                                  className={PriceAndFloorPlanStyle["floor-plan__property-logo"]}/>}
                <h1 className={PriceAndFloorPlanStyle["floor-plan__property-heading"]}>{property.name}</h1>
            </div>

            <div className={PriceAndFloorPlanStyle["floor-plan__tag-wrapper"]}>
                <RoomTagComponent roomTagValue={property.name}/>
                {property && <RoomTagComponent roomTagValue={property?.developer?.developerName}/>}
                {/*<RoomTagComponent roomTagValue={"VVIP Developer"}/>*/}
            </div>
            {
                property &&
                <p className={PriceAndFloorPlanStyle["floor-plan__property-details"]}>{property.developer?.description}</p>

            }

            <button className={PriceAndFloorPlanStyle["floor-plan__properties-button"]}
                    onClick={() => {
                        handleClick(property?.developer?.developerId)
                    }}>
                See all {property?.developer?.developerGroup} properties
            </button>

        </div>
    )
}

const RoomComponent = ({roomValue, activeRoom, roomTabId, onClickRoom}) => {
    return (
        <div
            className={`${PriceAndFloorPlanStyle["floor-plan__rooms"]} ${activeRoom === roomTabId ? PriceAndFloorPlanStyle["floor-plan__rooms-active"] : ""}`}
            onClick={onClickRoom?.bind(this, roomTabId, roomValue)}>
            <p className={PriceAndFloorPlanStyle["floor-plan__rooms-text"]}>{roomValue}</p>
        </div>
    )
}

const RoomSizeComponent = ({roomSizeValue, activeRoomSize, roomSizeTabId, propertyFloorPlan, onClickRoomSize}) => {
    return (
        <div
            className={`${PriceAndFloorPlanStyle["floor-plan__rooms-size"]} ${activeRoomSize === roomSizeTabId ? PriceAndFloorPlanStyle["floor-plan__rooms-size-active"] : ""}`}
            onClick={() => onClickRoomSize(roomSizeTabId)}>
            <p className={PriceAndFloorPlanStyle["floor-plan__rooms-size-text"]} style={{}}>{roomSizeValue}</p>
            <div className={PriceAndFloorPlanStyle["floor-plan__rooms-size-indicator"]}
                 style={{display: activeRoomSize === roomSizeTabId ? "flex" : "none"}}/>
        </div>
    )
}

const RoomTagComponent = ({roomTagValue}) => {
    return (
        <div className={PriceAndFloorPlanStyle["floor-plan__tag"]}>
            <p className={PriceAndFloorPlanStyle["floor-plan__tag-text"]}>{roomTagValue}</p>
        </div>
    )
}

export default PriceAndFloorPlan;
