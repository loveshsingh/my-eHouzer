import * as React from 'react'
import {useEffect, useState} from 'react'
import ProfileNavbarStyle from "./ProfileNavbar.module.css";
import ProfileOverview from "../profileOverview/ProfileOverview";
import MyProperty from "../myProperty/MyProperty";
import MyVisits from "../myVisits/MyVisits";
import ProfileSettings from "../profileSettings/ProfileSettings";
import {useRouter} from "next/router";

/**
 * @author Lovesh Singh.
 * @since 10-01-2023.
 * @description to profile navbar.
 * @return {JSX.Element}
 */
const ProfileNavbar = () => {

    const router = useRouter();
    const [activeBookingNavItem, setActiveBookingNavItem] = useState();

    useEffect(() => {
        const activeTab = router.query?.activeTab;
        setActiveBookingNavItem(activeTab);
    }, [router.query]);


    const setActiveTab = (tabId) => {
        if (!router.query[tabId]) {
            router.query.activeTab = tabId;
            router.push(router);
        }
    }

    return (
        <>
            <div className={ProfileNavbarStyle["profile-nav"]}>
                <p className={`${ProfileNavbarStyle["profile-nav__item"]} ${activeBookingNavItem === "ProfileOverview" ? ProfileNavbarStyle["profile-nav__item-active"] : ""}`}
                   onClick={() => setActiveTab("ProfileOverview")}>Profile Overview</p>
                <p className={`${ProfileNavbarStyle["profile-nav__item"]} ${activeBookingNavItem === "MyProperty" ? ProfileNavbarStyle["profile-nav__item-active"] : ""}`}
                   onClick={() => setActiveTab("MyProperty")}>My Property</p>
                <p className={`${ProfileNavbarStyle["profile-nav__item"]} ${activeBookingNavItem === "MyVisits" ? ProfileNavbarStyle["profile-nav__item-active"] : ""}`}
                   onClick={() => setActiveTab("MyVisits")}>My Visits</p>
                <p className={`${ProfileNavbarStyle["profile-nav__item"]} ${activeBookingNavItem === "Settings" ? ProfileNavbarStyle["profile-nav__item-active"] : ""}`}
                   onClick={() => setActiveTab("Settings")}>Settings</p>
            </div>

            {activeBookingNavItem === "ProfileOverview" ? <ProfileOverview/> : null}
            {activeBookingNavItem === "MyProperty" ? <MyProperty/> : null}
            {activeBookingNavItem === "MyVisits" ? <MyVisits/> : null}
            {activeBookingNavItem === "Settings" ? <ProfileSettings/> : null}
        </>
    )
}

export default ProfileNavbar;
