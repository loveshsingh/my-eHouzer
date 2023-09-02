import * as React from 'react'
import navbarStyles from './AdminNavbar.module.css'
import company_logo from "../../../../public/images/company-logo-01.png"
import Image from "next/image";
import Link from "next/link";
import AdminLoginDropdown from "./adminNavbarComponents/adminLogin/AdminLoginDropdown";
import {useSelector} from "react-redux";
import {AppColors} from "../../../../public/AppColors";
import {AppContextValueType as app} from "../../../../base/contexts/AppProvider";
import AppIcon from "../../../lib/AppIcon/AppIcon";
import {useEffect, useState} from "react";
import Searchbar from "../searchbar/Searchbar";


/**
 * @author Vikrant.
 * @since 09-02-2023.
 * @description to render Admin Navbar.
 */
const AdminNavbar = () => {
    const {isLoggedIn, userDetails} = useSelector((state) => state.authReducer);
    // const toggleSidebar = useSelector(((state) => state.sidebarToggleReducer.toggle));
    const notificationCount = 1;
    const [shakeShortlisted, setShakeShortlisted] = useState(false)

    useEffect(() => {
        setShakeShortlisted(true)
        setTimeout(function () {
            setShakeShortlisted(false)
        }, 200);
    }, [notificationCount]);


    return (
        <>
            {(isLoggedIn && userDetails.userRoleList[0].name) !== 'CUSTOMER' && (
                <div className={navbarStyles["admin__nav"]}
                     // style={toggleSidebar === true ? { width: "100%",paddingLeft:"18%" } : { width: "100%" }}
                >
                    <Searchbar/>
                    {/*<div className={navbarStyles["admin__nav-logo"]}>*/}
                    {/*    <Link href={"/admin"} className={navbarStyles["admin__nav-logo"]}><Image*/}
                    {/*        className={navbarStyles["admin__nav-logo"]} src={company_logo} alt={"company_logo"}/></Link>*/}
                    {/*</div>*/}
                    <div className={navbarStyles["admin__nav-end-section"]}>
                     {/*   <div className={navbarStyles["admin__nav-icon-container"]}>
                                  <span
                        className={`material-symbols-rounded ${navbarStyles["admin__nav__notification-icon"]}`}>Notifications</span>
                            <AppIcon
                                name={notificationCount > 0 ? 'basil:notification-on-outline' : 'basil:notification-outline'}
                                color={AppColors.sonicSilver} size={app?.isMobile ? 15 : 30}
                                style={{cursor: 'pointer'}}/>
                        </div>*/}
                            <div
                                className={shakeShortlisted ? navbarStyles["admin-nav__notification-wrapper--shake"] : navbarStyles["admin-nav__notification-wrapper"]}>
                                <AppIcon
                                    name={'basil:notification-outline'}
                                    color={AppColors.sonicSilver} size={app?.isMobile ? 15 : 30}
                                    style={{cursor: 'pointer'}}/>

                                <div style={{display: notificationCount > 0 ? "flex" : "none"}}
                                     className={navbarStyles["admin-nav__badge"]}>
                                    <p className={navbarStyles["admin-nav__badge-text"]}>{notificationCount}</p>
                                </div>
                        </div>
                        <div className={navbarStyles["admin__nav-profile"]}>
                            {/*<div className={navbarStyles["admin__nav-profile-image"]}>
                        <div>
                            add image here
                        </div>
                    </div>*/}


                            <AdminLoginDropdown/>

                            {/*<div className={navbarStyles["admin__nav-profile-text"]}>
                        <div className={navbarStyles["admin__nav-user"]}>Admin</div>
                        <div className={navbarStyles["admin__nav-user-email"]}>admin@gmail.com</div>

                    </div>
                    <div className={navbarStyles["admin__nav-icon-container"]}>
                        <span
                            className={`material-symbols-rounded ${navbarStyles["admin__nav__notification-icon"]}`}>Arrow_Drop_Down
                        </span>
                    </div>*/}
                        </div>
                    </div>


                </div>
            )}
        </>
    )
}

export default AdminNavbar;
