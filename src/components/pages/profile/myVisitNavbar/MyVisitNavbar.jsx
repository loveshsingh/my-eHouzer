import * as React from 'react'
import {useState} from 'react'
import MyVisitNavbarStyle from "./MyVisitNavbar.module.css";
import TodayMeeting from "../todayMeeting/TodayMeeting";
import UpcomingMeeting from "../upcomingMeeting/UpcomingMeeting";
import ComplementMeeting from "../complementMeeting/ComplementMeeting";

/**
 * @author Lovesh Singh.
 * @since 12-01-2023.
 * @description to my visits navbar.
 * @return {JSX.Element}
 */
const MyVisitNavbar = () => {

    const [activeMyVisitNavItem, setActiveMyVisitNavItem] = useState(1)

    const setActiveTab = (tabId) => {
        setActiveMyVisitNavItem(tabId);
    }

    return (
        <>
            <div className={MyVisitNavbarStyle["my-visit-nav"]}>
                <div
                    className={MyVisitNavbarStyle[activeMyVisitNavItem === 1 ? "my-visit-nav__item-active" : "my-visit-nav__item"]}
                    onClick={() => setActiveTab(1)}>
                    <p className={MyVisitNavbarStyle["my-visit-nav__item-text"]}>Today&apos;s Meeting</p>
                </div>

                <div
                    className={MyVisitNavbarStyle[activeMyVisitNavItem === 2 ? "my-visit-nav__item-active" : "my-visit-nav__item"]}
                    onClick={() => setActiveTab(2)}>
                    <p className={MyVisitNavbarStyle["my-visit-nav__item-text"]}>Upcoming Meeting</p>
                </div>

                <div
                    className={MyVisitNavbarStyle[activeMyVisitNavItem === 3 ? "my-visit-nav__item-active" : "my-visit-nav__item"]}
                    onClick={() => setActiveTab(3)}>
                    <p className={MyVisitNavbarStyle["my-visit-nav__item-text"]}>Complement Meeting</p>
                </div>
            </div>

            {activeMyVisitNavItem === 1 ? <TodayMeeting/> : null}
            {activeMyVisitNavItem === 2 ? <UpcomingMeeting/> : null}
             {/*{activeMyVisitNavItem == 3 ? <ComplementMeeting /> : null}*/}
            {activeMyVisitNavItem === 3 ? <h1 style={{color: '#747474', fontWeight: 500, fontSize: '2rem', textAlign: "center"}}>No data
                found</h1>:null}
        </>
    )
}

export default MyVisitNavbar;
