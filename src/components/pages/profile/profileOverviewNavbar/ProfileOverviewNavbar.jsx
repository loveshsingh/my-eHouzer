import * as React from 'react'
import {useState} from 'react'
import ProfileOverviewNavbarStyle from "./ProfileOverviewNavbar.module.css";
import BookedPropertyList from "../bookedPropertyList/BookedPropertyList";
import FavouritesList from "../favouritesList/FavouritesList";
import VisitedPropertyList from "../visitedPropertyList/VisitedPropertyList";
import ViewedPropertyList from "../viewedPropertyList/ViewedPropertyList";

/**
 * @author Lovesh Singh.
 * @since 12-01-2023.
 * @description to profile overview navbar.
 * @return {JSX.Element}
 */
const ProfileOverviewNavbar = () => {

    const [activeProfileOverviewNavItem, setActiveProfileOverviewNavItem] = useState(1)

    const setActiveTab = (tabId) => {
        setActiveProfileOverviewNavItem(tabId);
    }

    return (
        <>
            <div className={ProfileOverviewNavbarStyle["profile-overview-nav"]}>
                <div
                    className={ProfileOverviewNavbarStyle[activeProfileOverviewNavItem === 1 ? "profile-overview-nav__item-active" : "profile-overview-nav__item"]}
                    onClick={() => setActiveTab(1)}>
                    <p className={ProfileOverviewNavbarStyle["profile-overview-nav__item-text"]}>Viewed Property</p>
                </div>

                <div
                    className={ProfileOverviewNavbarStyle[activeProfileOverviewNavItem === 2 ? "profile-overview-nav__item-active" : "profile-overview-nav__item"]}
                    onClick={() => setActiveTab(2)}>
                    <p className={ProfileOverviewNavbarStyle["profile-overview-nav__item-text"]}>Shortlisted</p>
                </div>

                <div
                    className={ProfileOverviewNavbarStyle[activeProfileOverviewNavItem === 3 ? "profile-overview-nav__item-active" : "profile-overview-nav__item"]}
                    onClick={() => setActiveTab(3)}>
                    <p className={ProfileOverviewNavbarStyle["profile-overview-nav__item-text"]}>Visited Property</p>
                </div>

                <div
                    className={ProfileOverviewNavbarStyle[activeProfileOverviewNavItem === 4 ? "profile-overview-nav__item-active" : "profile-overview-nav__item"]}
                    onClick={() => setActiveTab(4)}>
                    <p className={ProfileOverviewNavbarStyle["profile-overview-nav__item-text"]}>Booked Property</p>
                </div>
            </div>

            {activeProfileOverviewNavItem === 1 ? <ViewedPropertyList/> : null}
            {activeProfileOverviewNavItem === 2 ? <FavouritesList/> : null}
            {activeProfileOverviewNavItem === 3 ? <VisitedPropertyList/> : null}
            {activeProfileOverviewNavItem === 4 ? <BookedPropertyList/> : null}
        </>
    )
}

export default ProfileOverviewNavbar;
