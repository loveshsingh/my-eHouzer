import React, {useEffect, useState} from "react";
import paymentDashboardStyles from "./PaymentDashboard.module.css"
import Searchbar from "../../components/searchbar/Searchbar";
import {useDispatch, useSelector} from "react-redux";
import {displayDataForm, fetchPaymentData, getDevelopers, setPaymentData} from "../../../../actions/adminActions";
import {useRouter} from "next/router";
import {Role} from "../../constants/role";
import {getFormattedDate} from "../../../../helper/Utility";
import {PaymentConstants} from "../../../../constants/StatusConstants";
import ceDashboardStyles from "../ce/CEDashboard.module.css";
import AdminFooter from "../../../pages/home/adminFooter/AdminFooter";
import agentDashboardStyles from "../marketing/AgentDashboard.module.css";
import CommonNavbar from "../../../commonNavbar/CommonNavbar";
import {AppColors} from "../../../../public/AppColors";
import AppPagination from "../../../lib/AppPagination/AppPagination";

const PaymentDashboard = () => {

    const {developers, paymentData, paymentLoading} = useSelector(((state) => state.adminReducer));
    const {isLoggedIn, userDetails} = useSelector((state) => state.authReducer);
    const router = useRouter();
    const dispatch = useDispatch();
    const [userId, setUserId] = useState('');
    const [developerId, setDeveloperId] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const toggleSidebar = useSelector(((state) => state.sidebarToggleReducer.toggle));

    /**
     * @author Vipul Garg
     * @since 15-05-2023
     * @description to fetch payment data
     */

    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/signin")
        } else {
            if (userDetails?.userRoleList[0].id === Role.DEVELOPER) {
                setDeveloperId(userDetails?.userId)
                /* router.push({
                     pathname: router.pathname,
                     query: {...router.query, developerId: userDetails?.userId},
                 });*/
                dispatch(fetchPaymentData({developerId: userDetails?.userId}))
            } else {
                dispatch(getDevelopers())
            }
        }
    }, [])

    /**
     * @author Vipul Garg
     * @since 15-05-2023
     * @description to handle builder change
     */
    const handleBuilderChange = (e) => {
        const value = e.target.value
        if (value !== "") {
            setUserId(value)
            setDeveloperId(value);
            /*router.push({
                pathname: router.pathname,
                query: {...router.query, developerId: value},
            });*/
            dispatch(fetchPaymentData({developerId: value, status: statusFilter}))
        } else {
            dispatch(setPaymentData([]))
        }
    };

    const handleStatusFilterChange = (e) => {
        const value = e.target.value
        if (value !== "") {
            setUserId(value)
            setStatusFilter(value);
            /* router.push({
                 pathname: router.pathname,
                 query: {...router.query, status: value},
             });*/
            dispatch(fetchPaymentData({developerId: developerId, status: value}))
        } else {
            dispatch(setPaymentData([]))
        }
    }

    const onSubmit = ({isSuccess}) => {
        if (isSuccess) {
            dispatch(fetchPaymentData({developerId: developerId, status: statusFilter}))
        }
    }


    return (
        <>
            {/*<div className={paymentDashboardStyles['payment__main-container']} style={toggleSidebar === true ? { width: "82%" } : { width: "100%" }}>*/}
            {/*    {(isLoggedIn && (userDetails?.userRoleList[0].id === Role.ADMIN || userDetails?.userRoleList[0].id === Role.DEVELOPER || userDetails?.userRoleList[0].id === Role.CE)) && (*/}
            {/*        <>*/}
            {/*            <div className={paymentDashboardStyles['common-navbar']}>*/}
            {/*                <CommonNavbar/>*/}
            {/*            </div>*/}
            {/*            <div className={paymentDashboardStyles['breadcrumbs']}>*/}
            {/*                <p>Home / Payment</p>*/}
            {/*            </div>*/}
                        <div className={paymentDashboardStyles['payment__content-container']}>

                            <div className={paymentDashboardStyles['payment__select-dropdown-wrapper']}>
                                {(userDetails?.userRoleList[0].id === Role.ADMIN || userDetails?.userRoleList[0].id === Role.CE) &&
                                    <div className={paymentDashboardStyles['payment__select-dropdown-container']}>
                                        <select className={paymentDashboardStyles['table-select']}
                                                onChange={handleBuilderChange}>
                                            <option value="" selected disabled hidden>
                                                Select a Developer
                                            </option>
                                            {developers?.map((developer, index) => (
                                                <option key={index} value={developer.developerId}>
                                                    {developer.developerName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                }

                                <div style={{marginLeft: '1rem'}}
                                     className={paymentDashboardStyles['payment__select-dropdown-container']}>
                                    <select className={paymentDashboardStyles['table-select']}
                                            onChange={handleStatusFilterChange}>
                                        <option value="" selected disabled hidden>
                                            Select Status
                                        </option>
                                        {PaymentConstants?.map((option, index) => (
                                            <option key={index} value={option.name}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className={paymentDashboardStyles['payment__heading-table-wrapper']}>
                            <div className={paymentDashboardStyles['payment__table-download-btn-wrapper']}>
                                <div className={paymentDashboardStyles['payment__container-heading']}>
                                    {(userDetails?.userRoleList[0].id === Role.DEVELOPER) ?
                                        <h3>{userDetails?.username}</h3> :
                                        <h3>Payment Module</h3>}
                                </div>

                            </div>
                            <div className={paymentDashboardStyles['payment__table-wrapper']}>
                                <table className={paymentDashboardStyles['payment__table']}>
                                    <thead className={paymentDashboardStyles['payment__table-thead']}>
                                    <tr className={paymentDashboardStyles['payment__table-heading-container']}>
                                        <td className={paymentDashboardStyles['payment__table-th-small']}>S. No.</td>
                                        <td className={paymentDashboardStyles['payment__table-th']}>Property Id</td>
                                        <td className={paymentDashboardStyles['payment__table-th']}>Payment Id</td>
                                        <td className={paymentDashboardStyles['payment__table-th']}>Customer Id</td>
                                        <td className={paymentDashboardStyles['payment__table-th']}>Transaction Id</td>
                                        <td className={paymentDashboardStyles['payment__table-th']}>Payment Status</td>
                                        <td className={paymentDashboardStyles['payment__table-th']}>Our Status</td>
                                        <td className={paymentDashboardStyles['payment__table-th']}>Amount</td>
                                        <td className={paymentDashboardStyles['payment__table-th']}>Created At</td>
                                        <td className={paymentDashboardStyles['payment__table-th']}>Updated At</td>
                                        <td className={paymentDashboardStyles['payment__table-th']}>Payment Method</td>
                                        <td className={paymentDashboardStyles['payment__table-th']}>AccountHolders
                                            Name
                                        </td>
                                        <td className={paymentDashboardStyles['payment__table-th']}>Bank Name</td>
                                        <td className={paymentDashboardStyles['payment__table-th']}>Branch Name</td>
                                        <td className={paymentDashboardStyles['payment__table-th']}>Cheque No.</td>
                                        <td className={paymentDashboardStyles['payment__table-th']}>Issue Date</td>
                                        <td className={paymentDashboardStyles['payment__table-th']}>Account Type</td>
                                        <td className={paymentDashboardStyles['payment__table-th']}>Payment Mode</td>
                                        <td className={paymentDashboardStyles['payment__table-th']}>Media Id</td>
                                    </tr>
                                    </thead>
                                    <tbody style={{color:AppColors.tableRowTextColor}}>

                                    {(!paymentLoading && paymentData.length > 0) ? (
                                        <>
                                            {paymentData?.map((payment, i) => (
                                                <PaymentDashboardRow payment={payment} index={i} onSubmit={onSubmit}/>
                                            ))}

                                        </>
                                    ) : (!paymentLoading && paymentData.length === 0) ? (
                                        <tr>
                                            <td className={ceDashboardStyles['ce__table-td-no-data']} colSpan="19"
                                                style={{textAlign: 'center'}}>
                                                <div className={ceDashboardStyles['ce__table-no-data']}>
                                                    No Data Found
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        <tr>
                                            <td className={ceDashboardStyles['ce__table-td']} colSpan="19"
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
                                <AppPagination
                                    // onSelect={onSelect} totalItems={rmListMetaData?.totalCount}
                                />
                            </div>
                        </div>
            {/*            <AdminFooter/>*/}
            {/*        </>*/}
            {/*    )}*/}
            {/*</div>*/}

        </>
    )
}


const PaymentDashboardRow = ({payment, index, onSubmit}) => {
    const dispatch = useDispatch();
    const onUpdatePayment = (payment) => {
        dispatch(displayDataForm({
            formToggle: true,
            show: true,
            buttonName: 'updatePayment',
            data: {payment},
            onSubmit: onSubmit
        }))
    };

    return (
        <>
            <tr className={`${paymentDashboardStyles['payment__table-tr']} ${index % 2 !== 0 ? paymentDashboardStyles['payment__table-even-row'] : ''}`}
                key={index}>
            {/*<tr key={index} className={paymentDashboardStyles['payment__table-tr']}>*/}
                <td className={paymentDashboardStyles['payment__table-td-center']}>{index + 1}</td>
                <td className={paymentDashboardStyles['payment__table-td']}>{payment?.propertyId}</td>
                <td className={paymentDashboardStyles['payment__table-td']}>{payment?.paymentId}</td>
                <td className={paymentDashboardStyles['payment__table-td']}>{payment?.customerId}</td>
                <td className={paymentDashboardStyles['payment__table-td-transaction']}
                    onClick={() => onUpdatePayment(payment)}>
                    {payment?.transactionId}
                </td>
                <td className={paymentDashboardStyles['payment__table-td-transaction']}
                    onClick={() => onUpdatePayment(payment)}>
                    {payment.paymentStatus}
                </td>
                <td className={paymentDashboardStyles['payment__table-td']}>{payment?.ourStatus}</td>
                <td className={paymentDashboardStyles['payment__table-td']}>{payment?.amount}</td>
                <td className={paymentDashboardStyles['payment__table-td']}>{getFormattedDate(payment?.createdAt, "DD-MM-YYYY")}</td>
                <td className={paymentDashboardStyles['payment__table-td']}>{payment?.updatedAt ? getFormattedDate(payment?.updatedAt," DD-MM-YYYY"):''}</td>
                <td className={paymentDashboardStyles['payment__table-td']}>{payment?.paymentMethod}</td>
                <td className={paymentDashboardStyles['payment__table-td']}>{payment?.accountHoldersName}</td>
                <td className={paymentDashboardStyles['payment__table-td']}>{payment?.bankName}</td>
                <td className={paymentDashboardStyles['payment__table-td']}>{payment?.branchName}</td>
                <td className={paymentDashboardStyles['payment__table-td']}>{payment?.chequeNo}</td>
                <td className={paymentDashboardStyles['payment__table-td']}>{payment?.issueDate}</td>
                <td className={paymentDashboardStyles['payment__table-td']}>{payment?.accountType}</td>
                <td className={paymentDashboardStyles['payment__table-td']}>{payment?.paymentMode}</td>
                <td className={paymentDashboardStyles['payment__table-td']}>{payment?.mediaId}</td>
            </tr>

        </>
    )
}
export default PaymentDashboard

