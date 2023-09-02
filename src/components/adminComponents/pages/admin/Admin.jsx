import React, {useEffect} from "react";
import adminStyles from "./Admin.module.css"
import Searchbar from "../../components/searchbar/Searchbar";
import SalesPerBuilder from "../../components/admin/salesPerBuilder/SalesPerBuilder";
import SalesUnitsPerBuilder from "../../components/admin/salesUnitsPerBuilder/SalesUnitsPerBuilder";
import TotalSales from "../../components/admin/totalSales/TotalSales";
import CustomerDashboard from "../../components/admin/customerDashboard/CustomerDashboard";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import {Role} from "../../constants/role";
import CETable from "../../components/admin/ce/ceTable";
import AdminFooter from "../../../pages/home/adminFooter/AdminFooter";
import CommonNavbar from "../../../commonNavbar/CommonNavbar";
import ceDashboardStyles from "../ce/CEDashboard.module.css";

/**
 * @author Vikrant
 * @since 22-02-2023
 * @description to display Admin dashboard page
 * @return {JSX.Element}
 * @constructor
 */
const Admin = () => {
    const {isLoggedIn, userDetails} = useSelector((state) => state.authReducer);
    const toggleSidebar = useSelector(((state) => state.sidebarToggleReducer.toggle));
    const router = useRouter();
    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/signin")
        }
    }, [])

    return (
        <>
            {/*<div className={adminStyles['admin__main-container']} style={toggleSidebar === true ? { width: "82%"} : { width: "100%" }}>*/}

            {/*    {(isLoggedIn && userDetails?.userRoleList[0].id === Role.ADMIN) && (*/}
            {/*        <>*/}
            {/*            <div className={adminStyles['common-navbar']}>*/}
            {/*            <CommonNavbar/>*/}
            {/*            </div>*/}
            {/*            <div className={adminStyles['breadcrumbs']}>*/}
            {/*                <p>Home / Admin</p>*/}
            {/*            </div>*/}

                        <div className={adminStyles['admin__section-content']}>
                            {/* Sales per Builder over period section */}
                            <div className={adminStyles['admin__section-wrapper']}>
                                <SalesPerBuilder/>
                            </div>

                            {/* Sales units per Builder over period section */}
                            {/*<div className={adminStyles['admin__section-wrapper']}>*/}
                            {/*    <SalesUnitsPerBuilder/>*/}
                            {/*</div>*/}

                            {/* Total sales over period section */}
                            <div className={adminStyles['admin__section-wrapper']}>
                                <TotalSales/>
                            </div>

                            {/* Customer Dashboard section */}
                            <div className={adminStyles['admin__section-wrapper']}>
                                <CustomerDashboard/>
                            </div>

                            {/* CE Table section */}
                            <div className={adminStyles['admin__section-wrapper']}>
                                <CETable/>
                            </div>

                        </div>
            {/*            <AdminFooter/>*/}
            {/*        </>*/}
            {/*    )}*/}
            {/*</div>*/}

            {/*<AdminFooter/>*/}
        </>
    );
}

export default Admin
