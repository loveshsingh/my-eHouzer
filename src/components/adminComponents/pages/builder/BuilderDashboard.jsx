import React, {useEffect, useState} from "react";
import builderDashboardStyles from "./BuilderDashboard.module.css"
import Searchbar from "../../components/searchbar/Searchbar";
import CustTableOnPopup from "./components/custTablePopup/CustTableOnPopup";
import {useDispatch, useSelector} from "react-redux";
import {displayCustTablePopupAction} from "../../../../actions/adminActions/customerPopupTable";
import {fetchBuilderData, getDevelopers, setBuilderPropertyData} from "../../../../actions/adminActions";
import {useRouter} from "next/router";
import {Role} from "../../constants/role";
import AppModal from "../../../lib/AppModal/AppModal";
import AppIcon from "../../../lib/AppIcon/AppIcon";
import {AppColors} from "../../../../public/AppColors";
import {AppContextValueType as app} from "../../../../base/contexts/AppProvider";
import {ExcelDownloadService} from "../../../../services/ExcelDownloadService";
import AdminFooter from "../../../pages/home/adminFooter/AdminFooter";
import ceDashboardStyles from "../ce/CEDashboard.module.css";
import rmDashboardStyles from "../rm/RMDashboard.module.css";
import CommonNavbar from "../../../commonNavbar/CommonNavbar";
import AppPagination from "../../../lib/AppPagination/AppPagination";

const BuilderDashboard = () => {

    const {
        developers,
        builderPropertiesData,
        builderPropertiesLoading,
        builderPropertiesMetaData
    } = useSelector(((state) => state.adminReducer));
    const [showCustTableOnPopup, setShowCustTableOnPopup] = useState(false)
    const {isLoggedIn, userDetails} = useSelector((state) => state.authReducer);
    const router = useRouter();
    const dispatch = useDispatch();
    const [userId, setUserId] = useState('');
    const toggleSidebar = useSelector(((state) => state.sidebarToggleReducer.toggle));


    const onCustDisplayPopupHandle = (propertyId) => {
        setShowCustTableOnPopup(!showCustTableOnPopup)
        dispatch(displayCustTablePopupAction({propertyId}))

    }

    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/signin")
        } else {
            if (userDetails?.userRoleList[0].id === Role.ADMIN) {
                dispatch(setBuilderPropertyData({data: [], metadata: {page: 1, perPage: 10}}))
                dispatch(getDevelopers())
            } else {
                setUserId(userDetails?.userId)
                dispatch(fetchBuilderData({developerId: userDetails?.userId, page: 1, perPage: 10}))
            }
        }
    }, [])

    const handleBuilderChange = (e) => {
        const value = e.target.value
        if (value !== "") {
            setUserId(value)
            dispatch(fetchBuilderData({developerId: value, page: 1, perPage: 10}))
        } else {
            dispatch(setBuilderPropertyData({data: [], metadata: {page: 1, perPage: 10}}))
        }
    };
    /**
     * @author Vipul Garg
     * @since 04-11-2023
     * @description to close the Customer Table On Popup
     */
    const onClickCloseCustTableOnPopup = () => {
        setShowCustTableOnPopup(!showCustTableOnPopup)
    };

    const handleDownloadExcel = () => {
        if (userId) {
            ExcelDownloadService.downloadBuilderStaticData(userId)
        }
    }

    const onSelect = (data) => {
        const {page, perPage} = data
        dispatch(fetchBuilderData({developerId: userDetails?.username, page: page, perPage: perPage}))
    }

    return (
        <>
            {/*<div className={builderDashboardStyles['builder__main-container']}  style={toggleSidebar === true ? { width: "82%" } : { width: "100%" }}>*/}
            {/*    {(isLoggedIn && (userDetails?.userRoleList[0].id === Role.ADMIN || userDetails?.userRoleList[0].id === Role.DEVELOPER)) && (*/}
            {/*        <>*/}
            {/*            <div className={builderDashboardStyles['common-navbar']}>*/}
            {/*                <CommonNavbar/>*/}
            {/*            </div>*/}
            {/*            <div className={builderDashboardStyles['breadcrumbs']}>*/}
            {/*                <p>Home / Builder</p>*/}
            {/*            </div>*/}
                        <div className={builderDashboardStyles['builder__content-container']}>
                            {userDetails?.userRoleList[0].id === Role.ADMIN &&
                                <div className={builderDashboardStyles['builder__select-dropdown-container']}>
                                    <select className={builderDashboardStyles['table-select']}
                                            onChange={handleBuilderChange}>
                                        <option value="" selected disabled hidden>
                                            Select a Developer
                                        </option>
                                        {developers?.map((developer) => (
                                            <option key={developer.developerId} value={developer.developerId}>
                                                {developer.developerName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            }
                            <div className={builderDashboardStyles['builder__heading-table-wrapper']}>
                            <div className={builderDashboardStyles['builder__table-download-btn-wrapper']}>
                                <div className={builderDashboardStyles['builder__container-heading']}>
                                    {(userDetails?.userRoleList[0].id === Role.DEVELOPER) ?
                                        <h3>{userDetails?.username}</h3> :
                                        <h3>Builder Module</h3>}
                                </div>
                                <div>
                                    {userDetails?.userRoleList[0].id === Role.ADMIN &&

                                        <div>
                                            {/*<AppIcon name={'vscode-icons:file-type-excel2'}*/}
                                            {/*         color={AppColors.sonicSilver} size={app?.isMobile ? 20 : 40}*/}
                                            {/*         style={{cursor: 'pointer'}} onClick={handleDownloadExcel}/>*/}
                                            <AppIcon name={'uiw:file-excel'}
                                                     color={AppColors.darkSpringGreen} size={app?.isMobile ? 15 : 30}
                                                     style={{cursor: 'pointer'}} onClick={handleDownloadExcel}/>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className={builderDashboardStyles['builder__table-wrapper']}>
                                <table className={builderDashboardStyles['builder__table']}>
                                    <thead className={builderDashboardStyles['builder__table-thead']}>
                                    <tr className={builderDashboardStyles['builder__table-heading-container']}>
                                        <td className={builderDashboardStyles['builder__table-th']}>S. No.</td>
                                        <td className={builderDashboardStyles['builder__table-th']}>Project</td>
                                        <td className={builderDashboardStyles['builder__table-th']}>location</td>
                                        <td className={builderDashboardStyles['builder__table-th']}>No. of Viewers</td>
                                        <td className={builderDashboardStyles['builder__table-th']}>No. of Visitors</td>
                                        <td className={builderDashboardStyles['builder__table-th']}>No. of Buyers</td>
                                    </tr>
                                    </thead>
                                    <tbody style={{color:AppColors.tableRowTextColor}}>
                                    {(!builderPropertiesLoading && builderPropertiesData.length > 0) ? (
                                        <>
                                            {builderPropertiesData?.map((builderProperty, i) => (
                                                <tr className={`${builderDashboardStyles['builder__table-tr']} ${i % 2 !== 0 ? builderDashboardStyles['builder__table-even-row'] : ''}`}
                                                    key={i}>
                                                    <td className={builderDashboardStyles['builder__table-td-center']}>{i + 1}</td>
                                                    <td className={builderDashboardStyles['builder__table-td']}>{builderProperty.propertyName}</td>
                                                    <td className={builderDashboardStyles['builder__table-td']}>{builderProperty.propertyCity}</td>
                                                    <td className={builderDashboardStyles['builder__table-td']}>{builderProperty.viewersCount}</td>
                                                    <td className={builderDashboardStyles['builder__table-td']}>{builderProperty.visitorsCount}</td>
                                                    <td className={builderDashboardStyles['builder__table-td']}>
                                                        <div
                                                            className={builderDashboardStyles['builder__table-td-link']}
                                                            style={{color: "blue"}}
                                                            onClick={() => onCustDisplayPopupHandle(builderProperty.propertyId)}>{builderProperty.buyersCount}</div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    ) : (!builderPropertiesLoading && builderPropertiesData.length === 0) ? (
                                        <tr>
                                            <td className={builderDashboardStyles['builder__table-td-no-data']} colSpan="6"
                                                style={{textAlign: 'center'}}>
                                                <div className={builderDashboardStyles['builder__table-no-data']}>
                                                    No Data Found
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        <tr>
                                            <td className={builderDashboardStyles['builder__table-td']} colSpan="6"
                                                style={{textAlign: 'center'}}>
                                                <div className={builderDashboardStyles['builder__table-no-data']}>
                                                    Loading...
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                            <AppPagination
                                // onSelect={onSelect} totalItems={builderPropertiesMetaData?.totalCount}
                            />
                        </div>
                            <AppModal onClose={onClickCloseCustTableOnPopup} show={showCustTableOnPopup}>
                                <CustTableOnPopup show={showCustTableOnPopup} onClose={onClickCloseCustTableOnPopup}/>
                            </AppModal>
                        </div>
            {/*            <AdminFooter/>*/}
            {/*            */}
            {/*        </>*/}
            {/*    )}*/}
            {/*</div>*/}

        </>
    )
}

export default BuilderDashboard
