import React from "react";
import adminSidebarStyle from "./AdminSidebar.module.css"
import {useDispatch, useSelector} from "react-redux";
import {toggleAction} from "../../../../actions/adminActions/sidebarToggle";
import {SidebarData} from "../../helpers/SidebarData";
import {useRouter} from "next/router";
import {Role} from "../../constants/role";
import Link from "next/link";
import company_logo from "../../../../public/images/company-logo-01.png"
import navbarStyles from "../adminNavbar/AdminNavbar.module.css";
import Image from "next/image";
import {AppColors} from "../../../../public/AppColors";
import {AppContextValueType as app} from "../../../../base/contexts/AppProvider";
import AppIcon from "../../../lib/AppIcon/AppIcon";
/**
 * @author Vikrant
 * @since 22-02-2023
 * @description to handle sidebar menu
 * @return {JSX.Element}
 * @constructor
 */
const AdminSidebar = () => {
    const router = useRouter();
    const toggleSidebar = useSelector(((state) => state.sidebarToggleReducer.toggle));
    const {userDetails} = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();
    const onSidebarToggleHandle = () => {
        dispatch(toggleAction(!toggleSidebar))
    }

    return (
        <div style={{display: toggleSidebar ? "flex" : "none"}}
             className={adminSidebarStyle['admin__sidebar-main-container']}>
            <div className={adminSidebarStyle['admin__sidebar-container']}>
                <div className={adminSidebarStyle['admin__sidebar-header']}>
                    {/*<span>Admin Dashboard</span>*/}
                    <Link href={"/admin"} className={navbarStyles["admin__nav-logo"]}><Image
                        className={navbarStyles["admin__nav-logo"]} src={company_logo} alt={"company_logo"}/></Link>
                </div>
                <div className={adminSidebarStyle['admin__sidebar-body']}>
                    <ul className={adminSidebarStyle['admin__sidebar-ul']}>

                        {SidebarData.map((value, key) => {
                            return (
                                <>
                                    {userDetails?.userRoleList && (userDetails?.userRoleList[0].id === value.role || userDetails?.userRoleList[0].name === 'ADMIN') && (
                                        <>
                                            <li className={adminSidebarStyle['admin__sidebar-li']}
                                                key={key}
                                                id={adminSidebarStyle[router.pathname === (value.link) ? "active" : ""]}
                                                onClick={() => {
                                                    router.push(value.link)
                                                    // onSidebarToggleHandle()
                                                }}
                                            >
                                                <span style={router.pathname === value.link?{display:"flex"}:{display:"none"}} className={adminSidebarStyle['admin__sidebar-li-active']}></span>
                                     {/*<span*/}
                                     {/*    className={`material-symbols-rounded ${adminSidebarStyle['admin__sidebar-icons']}`}>{value.icon}*/}
                                     {/*</span>*/}
                                                <AppIcon
                                                    name={value.icon} size={24}
                                                    style={{marginRight:"1rem"}}/>
                                              {value.title}
                                            </li>
                                        </>
                                    )}
                                </>
                            )
                        })}

                        {userDetails?.userRoleList && (userDetails?.userRoleList[0].id === Role.ADMIN || userDetails?.userRoleList[0].id === Role.DEVELOPER || userDetails?.userRoleList[0].id === Role.CE) && (
                            <li className={adminSidebarStyle['admin__sidebar-li']}
                                id={adminSidebarStyle[router.pathname === ('/admin/payment') ? "active" : ""]}
                                onClick={() => {
                                    router.push('/admin/payment')
                                    // onSidebarToggleHandle()
                                }}
                            >
                                <span style={router.pathname === ('/admin/payment')?{display:"flex"}:{display:"none"}} className={adminSidebarStyle['admin__sidebar-li-active']}></span>
                                     {/*<span*/}
                                     {/*    className={`material-symbols-rounded ${adminSidebarStyle['admin__sidebar-icons']}`}>Payment*/}
                                     {/*</span>*/}
                                <AppIcon
                                    name={"ic:outline-payment"} size={24}
                                    style={{marginRight:"1rem"}}/>
                                {'Payment'}
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            <div className={adminSidebarStyle['admin__sidebar-toggle']} onClick={onSidebarToggleHandle}/>

        </div>

    )
}

export default AdminSidebar


