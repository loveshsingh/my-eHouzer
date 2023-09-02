import React, {useEffect} from "react";
import ceDashboardStyles from "./CEDashboard.module.css"
import Searchbar from "../../components/searchbar/Searchbar";
import {useDispatch, useSelector} from "react-redux";
import {loadCEScreenData} from "../../../../actions/adminActions";
import BuilderTableComponent from "../../components/ce/BuilderTableComponent";
import CustomerListTableComponent from "../../components/ce/CustomerListTableComponent";
import ContractedAgentComponent from "../../components/ce/ContractedAgentComponent";
import RmListComponent from "../../components/ce/RmListComponent";
import {useRouter} from "next/router";
import {Role} from "../../constants/role";
import LeadListComponent from "../../components/ce/LeadListComponent";
import AdminFooter from "../../../pages/home/adminFooter/AdminFooter";
import CommonNavbar from "../../../commonNavbar/CommonNavbar";
import adminStyles from "../admin/Admin.module.css";

/**
 * @author Vikrant
 * @since 21-02-2023
 * @description to contain Customer Experience dashboard
 * @return {JSX.Element}
 * @constructor
 */
const CEDashboard = () => {

    const {isLoggedIn, userDetails} = useSelector((state) => state.authReducer);
    const toggleSidebar = useSelector(((state) => state.sidebarToggleReducer.toggle));
    const router = useRouter()
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/signin")
        } else {
            dispatch(loadCEScreenData())
        }

    }, [])

    return (
        <>
            {/*<div className={ceDashboardStyles['ce__main-container']} style={toggleSidebar === true ? { width: "82%" } : { width: "100%" }}>*/}
            {/*    {(isLoggedIn && (userDetails?.userRoleList[0].id === Role.ADMIN || userDetails?.userRoleList[0].id === Role.CE)) && (*/}
            {/*        <>*/}
            {/*            <div className={ceDashboardStyles['common-navbar']}>*/}
            {/*                <CommonNavbar/>*/}
            {/*            </div>*/}
            {/*            <div className={ceDashboardStyles['breadcrumbs']}>*/}
            {/*                <p>Home / Customer Experience</p>*/}
            {/*            </div>*/}

                        <div className={ceDashboardStyles['ce__content-container']}>

                            {/*RMs Section*/}
                            <RmListComponent/>

                            {/*Contracted Agents Section*/}
                            <ContractedAgentComponent/>

                            {/*Lead List Section*/}
                            <LeadListComponent/>
                            {/*Customers List Section*/}
                            <CustomerListTableComponent/>

                            {/*Builders List Section*/}
                            <BuilderTableComponent/>

                        </div>
            {/*            <AdminFooter/>*/}
            {/*        </>*/}
            {/*    )}*/}
            {/*</div>*/}

        </>
    )
}

export default CEDashboard
