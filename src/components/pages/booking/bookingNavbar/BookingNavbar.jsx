import * as React from 'react'
import {useEffect, useRef, useState} from 'react'
import BookingNavbarStyle from "./BookingNavbar.module.css";
import Overview from "../overview/Overview";
import Amenities from "../amenties/Amenities";
import PriceAndFloorPlan from "../priceAndFloorPlan/PriceAndFloorPlan";
import Locality from "../locality/Locality";
import {useSelector} from "react-redux";

/**
 * @author Lovesh Singh.
 * @since 19-12-2022.
 * @description to render top developer tab.
 * @return {JSX.Element}
 */
const BookingNavbar = () => {

    const [activeBookingNavItem, setActiveBookingNavItem] = useState(1)
    const overviewRef = useRef();
    const amenitiesRef = useRef();
    const priceAndFloorPlanRef = useRef();
    const localityRef = useRef();
    const {property} = useSelector((state) => state.bookingReducer)

    const setActiveTab = (tabId, tabRef) => {
        setActiveBookingNavItem(tabId);
        // tabRef.current.scrollIntoView();
        window.scrollTo({
            top: tabRef.current.offsetTop - 110,
            behavior: 'smooth',
        });
    }

    const changeActiveTab = (tabId) => {
        setActiveBookingNavItem(tabId);
    }

    useEffect(() => {
        return () => {
            window.addEventListener('scroll', () => {

                if (overviewRef.current) {
                    if (overviewRef?.current.getBoundingClientRect().top <= 120) {
                        changeActiveTab(1)
                    }
                }

                if (amenitiesRef.current) {
                    if (amenitiesRef?.current?.getBoundingClientRect().top <= 120) {
                        changeActiveTab(2)
                    }
                }

                if (priceAndFloorPlanRef.current) {
                    if (priceAndFloorPlanRef?.current?.getBoundingClientRect().top <= 120) {
                        changeActiveTab(3)
                    }
                }

                if (localityRef.current) {
                    if (localityRef?.current?.getBoundingClientRect().top <= 120) {
                        changeActiveTab(4)
                    }
                }
            });
        };
    }, []);

    return (
        <>
            <div className={BookingNavbarStyle["nav"]}>
                <p className={`${BookingNavbarStyle["nav__item"]} ${activeBookingNavItem === 1 ? BookingNavbarStyle["nav__item-active"] : ""}`}
                   onClick={() => setActiveTab(1, overviewRef)}>Overview</p>
                {property?.amenities?.length > 0 && (
                <p className={`${BookingNavbarStyle["nav__item"]} ${activeBookingNavItem === 2 ? BookingNavbarStyle["nav__item-active"] : ""}`}
                   onClick={() => setActiveTab(2, amenitiesRef)}>Amenities</p>
                )}
                <p className={`${BookingNavbarStyle["nav__item"]} ${activeBookingNavItem === 3 ? BookingNavbarStyle["nav__item-active"] : ""}`}
                   onClick={() => setActiveTab(3, priceAndFloorPlanRef)}>Price & Floor Plan</p>
                <p className={`${BookingNavbarStyle["nav__item"]} ${activeBookingNavItem === 4 ? BookingNavbarStyle["nav__item-active"] : ""}`}
                   onClick={() => setActiveTab(4, localityRef)}>Locality</p>
            </div>

            <Overview overviewRef={overviewRef}/>

            {property?.amenities?.length > 0 && (
                <Amenities amenitiesRef={amenitiesRef}/>
            )}
            <PriceAndFloorPlan priceAndFloorPlanRef={priceAndFloorPlanRef}/>
            <Locality localityRef={localityRef}/>
        </>
    )
}

export default BookingNavbar;
