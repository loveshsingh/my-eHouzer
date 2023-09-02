import React, {useEffect, useState} from "react";
import agentDashboardStyles from "./AgentDashboard.module.css"
import Searchbar from "../../components/searchbar/Searchbar";
import {useDispatch, useSelector} from "react-redux";
import {
    displayDataForm,
    fetchAgentLeads,
    fetchAgents,
    fetchPaymentData,
    setAgentLeads
} from "../../../../actions/adminActions";
import AppRoundButton from "../../../lib/AppRoundButton";
import {useRouter} from "next/router";
import {Role} from "../../constants/role";
import {fetchProfileDetails} from "../../../../actions/login";
import AppIcon from "../../../lib/AppIcon/AppIcon";
import {AppColors} from "../../../../public/AppColors";
import {AppContextValueType as app} from "../../../../base/contexts/AppProvider";
import {ExcelDownloadService} from "../../../../services/ExcelDownloadService";
import AppPagination from "../../../lib/AppPagination/AppPagination";
import ceDashboardStyles from "../ce/CEDashboard.module.css";
import AdminFooter from "../../../pages/home/adminFooter/AdminFooter";
import builderDashboardStyles from "../builder/BuilderDashboard.module.css";
import CommonNavbar from "../../../commonNavbar/CommonNavbar";

const AgentDashboard = () => {

    const dispatch = useDispatch();

    const {
        agentsList,
        agentLeads,
        agentLeadsLoading,
        agentLeadsMetaData
    } = useSelector(((state) => state.adminReducer));
    const {isLoggedIn, userDetails, userProfile} = useSelector((state) => state.authReducer);
    const router = useRouter();
    const [userId, setUserId] = useState('');
    const toggleSidebar = useSelector(((state) => state.sidebarToggleReducer.toggle));

    useEffect(() => {

    }, [agentLeadsMetaData])

    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/signin")

        } else {
            if (userDetails?.userRoleList[0].id === Role.ADMIN) {
                dispatch(setAgentLeads({data: [], metaData: {page: 1, perPage: 10}}))
                dispatch(fetchAgents())
            } else {
                setUserId(userDetails?.userId)
                dispatch(fetchProfileDetails(userDetails?.userId));
                dispatch(fetchAgentLeads({agentId: userDetails?.userId, page: 1, perPage: 10}))
            }
        }
    }, []);


    const handleAgentChange = (e) => {
        const value = e.target.value
        if (value !== "") {
            setUserId(value)
            dispatch(fetchAgentLeads({agentId: value, page: 1, perPage: 10}))
        } else {
            dispatch(setAgentLeads({data: [], metaData: {page: 1, perPage: 10}}))
        }
    };
    const onSubmit = ({isSuccess}) => {
        if (isSuccess) {
            dispatch(fetchAgentLeads({agentId: userId, page: 1, perPage: 10}))
        }
    }

    const handleAddLead = () => {
        dispatch(displayDataForm({
            formToggle: true,
            show: true,
            buttonName: 'addLead',
            data: [],
            onSubmit: onSubmit
        }))
    }

    const handleDownloadExcel = () => {
        if (userId) {
            ExcelDownloadService.downloadAgentLeads(userId)
        }
    }
    const onSelect = (data) => {
        const {page, perPage} = data
        const newData = {
            agentId: userId,
            page: page,
            perPage: perPage
        }
        dispatch(fetchAgentLeads(newData))
    }

    return (
        <>
                {/*<div className={agentDashboardStyles['agent__main-container']} style={toggleSidebar === true ? { width: "82%" } : { width: "100%" }}>*/}
                {/*    {(isLoggedIn && (userDetails?.userRoleList[0].id === Role.ADMIN || userDetails?.userRoleList[0].id === Role.AGENT)) && (*/}
                {/*        <>*/}
                {/*            <div className={agentDashboardStyles['common-navbar']}>*/}
                {/*                <CommonNavbar/>*/}
                {/*            </div>*/}
                {/*            <div className={agentDashboardStyles['breadcrumbs']}>*/}
                {/*                <p>Home / Agent</p>*/}
                {/*            </div>*/}
                            <div className={agentDashboardStyles['agent__content-container']}>
                                {userDetails?.userRoleList[0].id === Role.ADMIN &&
                                    <div className={agentDashboardStyles['agent__select_container']}>
                                        <select className={agentDashboardStyles['table-select']}
                                                onChange={handleAgentChange}>
                                            <option value="" selected disabled hidden>
                                                Select Agent
                                            </option>
                                            {agentsList?.map((agent) => (
                                                <option key={agent.userId} value={agent.userId}>
                                                    {agent.firstName} {agent.lastName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                }
                                <div className={agentDashboardStyles['agent__heading-table-wrapper']}>
                                <div className={agentDashboardStyles['agent__table-download-btn-wrapper']}>
                                    <div className={agentDashboardStyles['agent__container-heading']}>
                                        {(userDetails?.userRoleList[0].id === Role.AGENT) ?
                                            <h3>{userProfile?.firstName}</h3> :
                                            <h3>Agent Module</h3>}
                                    </div>
                                    <div>
                                        {userDetails?.userRoleList[0].id === Role.ADMIN &&

                                            <div>
                                                {/*<AppIcon name={'vscode-icons:file-type-excel2'}*/}
                                                {/*         color={AppColors.sonicSilver}*/}
                                                {/*         size={app?.isMobile ? 20 : 40}*/}
                                                {/*         style={{cursor: 'pointer'}} onClick={handleDownloadExcel}/>*/}
                                                <AppIcon name={'uiw:file-excel'}
                                                         color={AppColors.darkSpringGreen} size={app?.isMobile ? 15 : 30}
                                                         style={{cursor: 'pointer'}} onClick={handleDownloadExcel}/>
                                            </div>
                                        }
                                    </div>
                                </div>
                                {userDetails?.userRoleList[0].id === Role.AGENT &&
                                    <div className={agentDashboardStyles['agent__table-btn-wrapper']}>
                                        <div className={agentDashboardStyles['agent__table-send-button-wrapper']}>
                                            <AppRoundButton onClick={handleAddLead} buttonText={"ADD Lead"}
                                                            buttonStyle={agentDashboardStyles["agent__table-send-button"]}
                                                            type={"secondary"}/>
                                        </div>
                                    </div>
                                }

                                <div className={agentDashboardStyles['agent__table-wrapper']}>
                                    <table className={agentDashboardStyles['agent__table']}>
                                        <thead className={agentDashboardStyles['agent__table-thead']}>
                                        <tr className={agentDashboardStyles['agent__table-heading-container']}>
                                            <th className={agentDashboardStyles['agent__table-th']}>S. NO.</th>
                                            <th className={agentDashboardStyles['agent__table-th']}>Name</th>
                                            <th className={agentDashboardStyles['agent__table-th']}>Mobile No.</th>
                                            <th className={agentDashboardStyles['agent__table-th']}>Email Address</th>
                                            <th className={agentDashboardStyles['agent__table-th']}>Address</th>
                                            <th className={agentDashboardStyles['agent__table-th']}>Status</th>
                                        </tr>
                                        </thead>
                                        <tbody style={{color:AppColors.tableRowTextColor}}>

                                        {(!agentLeadsLoading && agentLeads?.length > 0) ? (
                                            <>
                                                {agentLeads?.map((lead, i) => (
                                                    <tr className={`${agentDashboardStyles['agent__table-tr']} ${i % 2 !== 0 ? agentDashboardStyles['agent__table-even-row'] : ''}`}
                                                        key={i}>
                                                    {/*<tr className={agentDashboardStyles['agent__table-tr']} key={i}>*/}
                                                        <td className={agentDashboardStyles['agent__table-td-center']}>{i + 1}</td>
                                                        <td className={agentDashboardStyles['agent__table-td']}>{lead.customerName}</td>
                                                        <td className={agentDashboardStyles['agent__table-td']}>{lead.contactNo}</td>
                                                        <td className={agentDashboardStyles['agent__table-td']}>{lead.emailId}</td>
                                                        <td className={agentDashboardStyles['agent__table-td']}>{lead.address}</td>
                                                        <td className={agentDashboardStyles['agent__table-td']}>{lead.status}</td>
                                                    </tr>
                                                ))}
                                            </>
                                        ) : (!agentLeadsLoading && agentLeads?.length === 0) ? (
                                            <tr>
                                                <td className={ceDashboardStyles['ce__table-td-no-data']} colSpan="6"
                                                    style={{textAlign: 'center'}}>
                                                    <div className={ceDashboardStyles['ce__table-no-data']}>
                                                        No Data Found
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            <tr>
                                                <td className={ceDashboardStyles['ce__table-td']} colSpan="6"
                                                    style={{textAlign: 'center'}}>
                                                    <div className={ceDashboardStyles['ce__table-no-data']}>
                                                        Loading...
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                                    <AppPagination onSelect={onSelect} totalItems={agentLeadsMetaData?.totalCount}/>
                                </div>

                            </div>
                {/*            <AdminFooter/>*/}
                {/*        </>*/}
                {/*    )}*/}
                {/*</div>*/}

        </>
    )
}

export default AgentDashboard
