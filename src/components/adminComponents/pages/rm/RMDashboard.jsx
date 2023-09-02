import React, {useEffect, useState} from "react";
import rmDashboardStyles from "./RMDashboard.module.css"
import Searchbar from "../../components/searchbar/Searchbar";
import {useDispatch, useSelector} from "react-redux";
import {
    displayDataForm,
    fetchPropertyVariants,
    fetchRmCustomer,
    fetchRms,
    setAdminRmCustomer
} from "../../../../actions/adminActions";
import {getDateFromTimestamp} from "../../../../helper/Utility";
import {useRouter} from "next/router";
import {Role} from "../../constants/role";
import {fetchProfileDetails} from "../../../../actions/login";
import {ExcelDownloadService} from "../../../../services/ExcelDownloadService";
import AppIcon from "../../../lib/AppIcon/AppIcon";
import {AppColors} from "../../../../public/AppColors";
import {AppContextValueType as app} from "../../../../base/contexts/AppProvider";
import ceDashboardStyles from "../ce/CEDashboard.module.css";
import AppPagination from "../../../lib/AppPagination/AppPagination";
import AdminFooter from "../../../pages/home/adminFooter/AdminFooter";
import CommonNavbar from "../../../commonNavbar/CommonNavbar";

/**
 * @author Vikrant
 * @since 22-02-2023
 * @description to contain Relationship Manager dashboard
 * @return {JSX.Element}
 * @constructor
 */
const RMDashboard = () => {
    const {isLoggedIn, userDetails, userProfile} = useSelector((state) => state.authReducer);
    const router = useRouter();
    const dispatch = useDispatch();
    const {rmList, rmCustomers, rmCustomersMetaData, rmCustomersLoading} = useSelector(((state) => state.adminReducer));
    const [userId, setUserId] = useState('');
    const [rmId, setRmId] = useState('');
    const toggleSidebar = useSelector(((state) => state.sidebarToggleReducer.toggle));

    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/signin")

        } else {
            if (userDetails?.userRoleList[0].id === Role.ADMIN) {
                dispatch(setAdminRmCustomer({data: [], metaData: {page: 1, perPage: 10}}))
                dispatch(fetchRms())
            } else {
                setUserId(userDetails?.userId)
                setRmId(userDetails?.userId);
                dispatch(fetchProfileDetails(userDetails?.userId));
                dispatch(fetchRmCustomer({
                    rmId: userDetails?.userId,
                    page: 1,
                    perPage: 10
                }))
            }

        }
    }, []);

    const handleRmChange = (e) => {
        const value = e.target.value
        setRmId(value);
        if (value !== "") {
            setUserId(value)
            dispatch(setAdminRmCustomer({data: [], metaData: {page: 1, perPage: 10}}))
            dispatch(fetchRmCustomer({rmId: value, page: 1, perPage: 10}))

        } else {
            dispatch(setAdminRmCustomer({data: [], metaData: {page: 1, perPage: 10}}))
        }
    };


    const handleDownloadExcel = () => {
        if (userId) {
            ExcelDownloadService.downloadRmCustomers(userId)
        }
    }
    const addRMRemarks = (customer) => {
        dispatch(displayDataForm({
            formToggle: true,
            show: true,
            buttonName: 'updateCustomerRemarks',
            data: {customer: customer, rmId: rmId}
        }))
    }
    const addRMPropertyBooking = (customerProfile, customerProperty) => {
        dispatch(fetchPropertyVariants({propertyId: customerProperty.propertyId, page: 1, perPage: 10})).then(r => {
        })

        dispatch(displayDataForm({
            formToggle: true,
            show: true,
            buttonName: 'addPropertyBooking',
            data: {
                userId: customerProfile.userId,
                userName: customerProfile.firstName + " " + customerProfile?.lastName,
                rmId: rmId,
                propertyId: customerProperty.propertyId,
                propertyName: customerProperty.propertyName
            }
        }))
    }


    const onSelect = (data) => {
        const {page, perPage} = data
        const newData = {
            rmId: rmId,
            page: page,
            perPage: perPage
        }
        dispatch(fetchRms(newData))
    }

    return (
        <>
                {/*<div className={rmDashboardStyles['rm__main-container']} style={toggleSidebar === true ? { width: "82%" } : { width: "100%" }}>*/}
                {/*    {(isLoggedIn && (userDetails?.userRoleList[0].id === Role.ADMIN || userDetails?.userRoleList[0].id === Role.RM)) && (*/}
                {/*        <>*/}
                {/*            <div className={rmDashboardStyles['common-navbar']}>*/}
                {/*                <CommonNavbar/>*/}
                {/*            </div>*/}
                {/*            <div className={rmDashboardStyles['breadcrumbs']}>*/}
                {/*                <p>Home / RM</p>*/}
                {/*            </div>*/}
                            <div className={rmDashboardStyles['rm__content-container']}>
                                {userDetails?.userRoleList[0].id === Role.ADMIN &&
                                    <div className={rmDashboardStyles['rm__select_container']}>
                                        <select className={rmDashboardStyles['table-select']} onChange={handleRmChange}>
                                            <option value="" selected disabled hidden>
                                                Select RM
                                            </option>
                                            {rmList?.map((rm, i) => (
                                                <option key={i} value={rm.rmId}>
                                                    {rm.firstName} {rm.lastName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                }
                                <div className={rmDashboardStyles['rm__heading-table-wrapper']}>
                                <div className={rmDashboardStyles['rm__table-download-btn-wrapper']}>
                                    <div className={rmDashboardStyles['rm__container-heading']}>
                                        {(userDetails?.userRoleList[0].id === Role.RM) ?
                                            <h3>{userProfile?.firstName}</h3> :
                                            <h3>Relationship Manager</h3>}
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
                                <div className={rmDashboardStyles['rm__table-wrapper']}>
                                    <table className={rmDashboardStyles['rm__table']}>
                                        <thead className={rmDashboardStyles['rm__table--header']}>
                                        <tr className={rmDashboardStyles['rm__table-heading-container']}>
                                            <th className={rmDashboardStyles['rm__table-th-small']}>S. NO.</th>
                                            <th className={rmDashboardStyles['rm__table-th']}>Name</th>
                                            <th className={rmDashboardStyles['rm__table-th']}>Mobile No.</th>
                                            <th className={rmDashboardStyles['rm__table-th']}>Email Address</th>
                                            <th className={rmDashboardStyles['rm__table-th']}>Remarks</th>
                                            <th className={rmDashboardStyles['rm__table-th']}>Properties</th>
                                            <th className={rmDashboardStyles['rm__table-th']}>Builder</th>
                                            <th className={rmDashboardStyles['rm__table-th']}>Location</th>
                                            <th className={rmDashboardStyles['rm__table-th']}>Property Price</th>
                                            <th className={rmDashboardStyles['rm__table-th']}>Date</th>
                                            <th className={rmDashboardStyles['rm__table-th']}>Status</th>
                                            <th className={rmDashboardStyles['rm__table-th']}>Contracted Agent</th>
                                            {/*<th className={rmDashboardStyles['rm__table-th']}>Action</th>*/}
                                        </tr>
                                        </thead>
                                        <tbody style={{color:AppColors.tableRowTextColor}}>

                                        {(!rmCustomersLoading && rmCustomers.length > 0) ? (
                                            <>
                                                {rmCustomers?.map((rmCustomer, i) => (
                                                    <>
                                                        <tr className={`${rmDashboardStyles['rm__table-tr']} ${i % 2 !== 0 ? rmDashboardStyles['rm__table-even-row'] : ''}`}
                                                            key={i}>

                                                            <td className={`${rmDashboardStyles['rm__table-td-small']} ${rmDashboardStyles['font-wt-bigger']}`}>{i + 1}</td>


                                                            <td className={`${rmDashboardStyles['rm__table-td']} ${rmDashboardStyles['font-wt-bigger']}`}>{rmCustomer?.customerProfile?.firstName} {rmCustomer?.customerProfile?.lastName}</td>
                                                            <td className={rmDashboardStyles['rm__table-td']}>{rmCustomer?.customerProfile?.contactNo}</td>
                                                            <td className={rmDashboardStyles['rm__table-td']}>{rmCustomer?.customerProfile?.emailId}</td>
                                                            <td className={rmDashboardStyles['rm__table-td', 'rm__table-remarks-td']}
                                                                onClick={() => {
                                                                    addRMRemarks(rmCustomer?.customerProfile)
                                                                }}>{rmCustomer?.customerProfile?.remarks}</td>
                                                            <td className={rmDashboardStyles['rm__table-td-colspan']}
                                                                colSpan={8}>
                                                                {rmCustomer?.customerProperties?.map((customerProperty, i) => (
                                                                    <table key={i}
                                                                           className={rmDashboardStyles['rm__table']}>
                                                                        <tr className={rmDashboardStyles['rm__table-tr']}>
                                                                            <td style={{minWidth: "150px",paddingLeft: "1rem",borderRight: "1px solid #EFEBF9"}}
                                                                                className={`${rmDashboardStyles['rm__table-td', 'rm__table-hover-td']} ${rmDashboardStyles['font-wt-bigger']}`}
                                                                                onClick={() => {
                                                                                    addRMPropertyBooking(rmCustomer?.customerProfile, customerProperty)
                                                                                }}>{customerProperty?.propertyName}</td>
                                                                            <td className={rmDashboardStyles['rm__table-td']}>{customerProperty?.developerName}</td>
                                                                            <td className={rmDashboardStyles['rm__table-td']}>{customerProperty?.propertyArea}</td>
                                                                            <td className={rmDashboardStyles['rm__table-td']}>{customerProperty?.minBudget + 'cr - ' + customerProperty?.maxBudget + ' cr'}</td>
                                                                            <td className={rmDashboardStyles['rm__table-td']}>{getDateFromTimestamp(customerProperty?.propertyDate)}</td>
                                                                            <td className={rmDashboardStyles['rm__table-td']}>{customerProperty?.status}</td>
                                                                            <td className={rmDashboardStyles['rm__table-td']}>{}</td>
                                                                            {/*<td className={rmDashboardStyles['rm__table-td']}>{}</td>*/}
                                                                        </tr>
                                                                    </table>
                                                                ))}
                                                            </td>
                                                        </tr>
                                                    </>
                                                ))}
                                            </>
                                        ) : (!rmCustomersLoading && rmCustomers.length === 0) ? (
                                            <tr>
                                                <td className={ceDashboardStyles['ce__table-td-no-data']} colSpan="12"
                                                    style={{textAlign: 'center'}}>
                                                    <div className={ceDashboardStyles['ce__table-no-data']}>
                                                        {rmId === '' ? 'Please Select a RM' : 'No Data Found'}
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            <tr>
                                                <td className={ceDashboardStyles['ce__table-td']} colSpan="12"
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
                                    <AppPagination onSelect={onSelect} totalItems={rmCustomersMetaData?.totalCount}/>
                                </div>

                            </div>
                {/*            <AdminFooter/>*/}
                {/*        </>*/}
                {/*    )}*/}
                {/*</div>*/}



        </>
    )
}

export default RMDashboard
