import ceDashboardStyles from "../../pages/ce/CEDashboard.module.css";
import {CUSTOMER_COLUMN} from "../../constants/Constant";
import customersListStyles from "../../components/ce/CustomerListTableComponent.module.css";
import tableTDStyles from "../../helpers/tableTD/TableTR.module.css";
import {getDateFromTimestamp, getFormattedDate} from "../../../../helper/Utility";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    displayDataForm,
    fetchCustomers,
    updateCustomerRm,
    updateCustomerStatus
} from "../../../../actions/adminActions";
import AppIcon from "../../../lib/AppIcon/AppIcon";
import {AppColors} from "../../../../public/AppColors";
import {AppContextValueType as app} from "../../../../base/contexts/AppProvider";
import {ExcelDownloadService} from "../../../../services/ExcelDownloadService";
import {Role} from "../../constants/role";
import AppPagination from "../../../lib/AppPagination/AppPagination";
import {StatusConstants} from "../../../../constants/StatusConstants";
import ConfirmationDialog, {ConfirmationDialogAction} from "../../helpers/confirmationBox/ConfirmationDialog";
import leadDashboardStyles from "./LeadListComponent.module.css";

const CustomerListTableComponent = () => {

    const {customers, customersMetaData, customersLoading} = useSelector((state) => state.adminReducer);
    const {isLoggedIn, userDetails} = useSelector((state) => state.authReducer);

    const [customersData, setCustomersData] = useState(customers);
    const dispatch = useDispatch();

    useEffect(() => {
        setCustomersData(customers);
    }, [customers])

    const handleCustomersDownload = () => {
        ExcelDownloadService.downloadCustomers()
    }


    const onSelect = (data) => {
        const {page, perPage} = data
        dispatch(fetchCustomers(data))
    }

    return (
        <div className={ceDashboardStyles['ce__table-section-container']}>
            <div className={ceDashboardStyles['ce__heading-table-wrapper']}>
            <div className={ceDashboardStyles['ce__table-btn-wrapper']}>
                <div className={ceDashboardStyles['ce__section-heading']}>
                    <h3>Customers List</h3>
                </div>
                <div>
                    {userDetails?.userRoleList[0].id === Role.ADMIN &&

                        <div>
                            {/*<AppIcon name={'vscode-icons:file-type-excel2'}*/}
                            {/*         color={AppColors.sonicSilver} size={app?.isMobile ? 20 : 40}*/}
                            {/*         style={{cursor: 'pointer'}} onClick={handleCustomersDownload}/>*/}
                            <AppIcon name={'uiw:file-excel'}
                                     color={AppColors.darkSpringGreen} size={app?.isMobile ? 15 : 30}
                                     style={{cursor: 'pointer'}} onClick={handleCustomersDownload}/>
                        </div>
                    }
                </div>
            </div>
            <div className={ceDashboardStyles['ce__table-wrapper']}>
                <table className={customersListStyles['ce_customer__table']}>
                    <thead className={customersListStyles['ce_customer__table-thead']}>
                    {/*<tr className={customersListStyles['ce_customer__table-heading-container']}>*/}
                    {/*    {CUSTOMER_COLUMN.map((header, i) => (*/}
                    {/*        {*/}
                    {/*            i===0? <th key={i} className={customersListStyles['ce_customer__table-th-small']}>*/}
                    {/*            {header.name}*/}
                    {/*        </th> : <th key={i} className={customersListStyles['ce_customer__table-th']}>*/}
                    {/*            {header.name}*/}
                    {/*        </th>*/}
                    {/*        }*/}

                    {/*    ))}*/}
                    {/*</tr>*/}
                    <tr className={customersListStyles['ce_customer__table-heading-container']}>
                        {CUSTOMER_COLUMN.map((header, i) => (
                            i === 0 ? (
                                <th key={i} className={customersListStyles['ce_customer__table-th-small']}>
                                    {header.name}
                                </th>
                            ) : (
                                <th key={i} className={customersListStyles['ce_customer__table-th']}>
                                    {header.name}
                                </th>
                            )
                        ))}
                    </tr>

                    </thead>
                    <tbody style={{color:AppColors.tableRowTextColor}}>
                    {(!customersLoading && customersData.length > 0) ? (
                        <>
                            {customersData?.map((customer, i) => (
                                <CustomerTable key={i} customer={customer} count={i}/>
                            ))}

                        </>
                    ) : (!customersLoading && customersData.length === 0) ? (
                        <tr>
                            <td className={ceDashboardStyles['ce__table-td']} colSpan="8" style={{textAlign: 'center'}}>
                                <div className={ceDashboardStyles['ce__table-no-data']}>
                                    No Data Found
                                </div>
                            </td>
                        </tr>
                    ) : (
                        <tr>
                            <td className={ceDashboardStyles['ce__table-td']} colSpan="8" style={{textAlign: 'center'}}>
                                <div className={ceDashboardStyles['ce__table-no-data']}>
                                    Loading...
                                </div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
                <AppPagination onSelect={onSelect} totalItems={customersMetaData?.totalCount}/>
            </div>

        </div>
    )
}

const CustomerTable = ({key,customer, count}) => {

    const dispatch = useDispatch();

    const [profileState, setProfileState] = useState({
        firstName: "",
        lastName: "",
        contactNo: "",
        address: "",
        pincode: "",
        emailId: "",
        city: "",
        state: "",
        userId: "",
        remarks: "",
        contractedAgent: '',
    })

    useEffect(() => {
        if (customer) {
            const customerProfile = customer?.customerProfile;

            setProfileState({
                firstName: customerProfile?.firstName,
                lastName: customerProfile?.lastName,
                contactNo: customerProfile?.contactNo,
                address: customerProfile?.address,
                pincode: customerProfile?.pincode,
                emailId: customerProfile?.emailId,
                city: customerProfile?.city,
                state: customerProfile?.state,
                userId: customerProfile?.userId,
                remarks: customerProfile?.remarks
            })
        }
    }, [customer])

    const onUpdateCustomer = (customer) => {
        dispatch(displayDataForm({
            formToggle: true,
            show: true,
            buttonName: 'updateCustomer',
            data: {customer}
        }))
    };

    return (
         <tr className={`${customersListStyles['ce_customer__table-tr']} ${count % 2 !== 0 ? customersListStyles['ce_customer__table-tr-even-row'] : ''}`} key={count}>
            <td className={customersListStyles['ce_customer__table-td-small']}
                onClick={() => onUpdateCustomer(profileState)}>{count + 1}</td>
            <td className={customersListStyles['ce_customer__table-td']} onClick={() => onUpdateCustomer(profileState)}>
                {profileState.firstName}
            </td>
            <td className={customersListStyles['ce_customer__table-td']} onClick={() => onUpdateCustomer(profileState)}>
                {profileState.lastName}
            </td>
            <td className={customersListStyles['ce_customer__table-td']} onClick={() => onUpdateCustomer(profileState)}>
                {profileState.contactNo}
            </td>
            <td className={customersListStyles['ce_customer__table-td']} onClick={() => onUpdateCustomer(profileState)}>
                {profileState.emailId}
            </td>
            <td className={customersListStyles['ce_customer__table-td']} onClick={() => onUpdateCustomer(profileState)}>
                {profileState.address}
            </td>
            <td className={customersListStyles['ce_customer__table-td']} onClick={() => onUpdateCustomer(profileState)}>
                {profileState.city}
            </td>
            <td className={customersListStyles['ce_customer__table-td']} onClick={() => onUpdateCustomer(profileState)}>
                {profileState.state}
            </td>
            <td className={customersListStyles['ce_customer__table-td']} onClick={() => onUpdateCustomer(profileState)}>
                {profileState.pincode}
            </td>

            <td className={customersListStyles['ce_customer__table-td']} onClick={() => onUpdateCustomer(profileState)}>
                {profileState.remarks}
            </td>

            <td className={customersListStyles['ce_customer__table-td-colspan']} colSpan={7}>
                {customer?.customerProperties?.map((customerProperty, i) => (
                    <CustomerProperty key={i} customerProperty={customerProperty} customerId={profileState.userId}/>
                ))}
            </td>


            <td className={customersListStyles['ce_customer__table-td']} onClick={() => onUpdateCustomer(profileState)}>
                {profileState.contractedAgent}
            </td>
        </tr>
    )
}

const CustomerProperty = ({customerProperty, customerId}) => {

    const {rmList} = useSelector((state) => state.adminReducer);

    const [status, setStatus] = useState('')
    const [rmId, setRmId] = useState('')
    const [propertyId, setPropertyId] = useState('')
    const [prevLevel, setPrevLevel] = useState('')
    const [displayStatus, setDisplayStatus] = useState('')
    const [confirmationDialogState, setConfirmationDialogState] = useState({
        visible: false,
        action: undefined,
        data: undefined
    });
    const dispatch = useDispatch();

    const title = () => {
        return (<span style={{color: 'black'}}>Are you sure you want to Update Status to {displayStatus}?</span>);
    }

    useEffect(() => {
        if (customerProperty) {
            setStatus(customerProperty?.status)
            setPrevLevel(StatusConstants.find(obj => obj.name === customerProperty?.status).level)
            setRmId(customerProperty?.rm)
            setPropertyId(customerProperty?.propertyId)
        }

    }, [customerProperty])


    const onChangeStatus = (e) => {
        const value = e.target.value;
        setDisplayStatus(value);
        setConfirmationDialogState({visible: true, action: ConfirmationDialogAction.UPDATE, data: {value}});
    }

    const handleStatusChange = (statusData) => {
        const {visible, action, data} = statusData
        if (action === ConfirmationDialogAction.UPDATE && visible) {
            setStatus(data.value)
            setPrevLevel(StatusConstants.find(obj => obj.name === data.value).level)
            const details = {
                propertyId: propertyId,
                userId: customerId,
                status: data.value
            }
            dispatch(updateCustomerStatus(details))
        }
        setConfirmationDialogState({visible: false, action: undefined});
    };

    const handleRmChange = (e) => {
        setRmId(e.target.value)

        const details = {
            propertyId: propertyId,
            userId: customerId,
            rmId: e.target.value
        }
        dispatch(updateCustomerRm(details))
    };

    const onSaveStatus = () => {
        const details = {
            propertyId: propertyId,
            userId: customerId,
            status: status
        }
        dispatch(updateCustomerStatus(details))
    }

    const onSaveRm = () => {
        const details = {
            propertyId: propertyId,
            userId: customerId,
            rmId: rmId
        }
        dispatch(updateCustomerRm(details))
    }


    return (
        <>
            <table className={customersListStyles['ce_customer__table']}>
                <tr className={customersListStyles['ce_customer__table-tr']}>
                    <td className={customersListStyles['ce_customer__table-td']}>{customerProperty?.propertyName}</td>
                    <td className={customersListStyles['ce_customer__table-td']}>{customerProperty?.developerName}</td>
                    <td className={customersListStyles['ce_customer__table-td']}>{customerProperty?.propertyArea}</td>
                    <td className={customersListStyles['ce_customer__table-td']}>{customerProperty?.minBudget + 'cr - ' + customerProperty?.maxBudget + ' cr'}</td>
                    <td className={customersListStyles['ce_customer__table-td']}>
                        <select className={tableTDStyles['table-select']} value={status}
                                onChange={onChangeStatus}>
                            {StatusConstants?.map((option) => (
                                <option key={option.level} value={option.name} disabled={option.level < prevLevel}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td className={customersListStyles['ce_customer__table-td']}>{getFormattedDate(getDateFromTimestamp(customerProperty?.propertyDate),"DD-MM-YYYY")}</td>
                    <td className={customersListStyles['ce_customer__table-td']}>
                        <select className={tableTDStyles['table-select']} value={rmId} onChange={handleRmChange}>
                            <option value="" disabled hidden selected>
                                Select RM
                            </option>
                            {rmList?.map((rm) => (
                                <option key={rm.rmId} value={rm.rmId}>
                                    {rm.firstName} {rm.lastName}
                                </option>
                            ))}
                        </select></td>
                </tr>
            </table>
            <div style={{display: confirmationDialogState.visible ? '' : 'none'}}>
                <ConfirmationDialog type='update' title={title} state={confirmationDialogState}
                                    onClick={(value) => handleStatusChange(value)}/>
            </div>
        </>
    )
}

export default CustomerListTableComponent

