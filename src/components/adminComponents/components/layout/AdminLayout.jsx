import React from 'react';
import Head from 'next/head';
import AdminSidebar from "../adminSidebar/AdminSidebar";
import {useSelector} from "react-redux";
import adminStyles from "../../pages/admin/Admin.module.css";
import {Role} from "../../constants/role";
import CommonNavbar from "../../../commonNavbar/CommonNavbar";
import AdminFooter from "../../../pages/home/adminFooter/AdminFooter";
import AdminBreadCrumb from "../adminBreadCrumb/AdminBreadCrumb";


const AdminLayout = ({ children }) => {
    const {isLoggedIn, userDetails} = useSelector((state) => state.authReducer);
    const toggleSidebar = useSelector(((state) => state.sidebarToggleReducer.toggle));
    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
            <AdminSidebar />
            <div className={adminStyles['admin__main-container']} style={toggleSidebar === true ? { width: "82%"} : { width: "100%" }}>

                {(isLoggedIn) && (
                    <>
                        <div className={adminStyles['common-navbar']}>
                            <CommonNavbar/>
                        </div>
                        {/*<div className={adminStyles['breadcrumbs']}>*/}
                        {/*    <p><a href={"/admin"} style={{color:"blue",textUnderlineOffset: '1px'}}>Home</a> / {breadCrumb}</p>*/}
                        {/*</div>*/}
                        <AdminBreadCrumb/>
                        {children}
                        <AdminFooter/>
                    </>
                )}
            </div>

        </div>
    );
};

export default AdminLayout;
