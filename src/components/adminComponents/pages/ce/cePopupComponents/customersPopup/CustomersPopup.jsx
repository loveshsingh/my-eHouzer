import React, {useEffect, useRef} from "react";
import customersPopupStyles from "./CustomersPopup.module.css";
import {useDispatch, useSelector} from "react-redux";
import {fetchRmCustomer, setAdminRmCustomer} from "../../../../../../actions/adminActions";
import {getDateFromTimestamp} from "../../../../../../helper/Utility";
import AppIcon from "../../../../../lib/AppIcon/AppIcon";
import {AppColors} from "../../../../../../public/AppColors";
import {AppContextValueType as app} from "../../../../../../base/contexts/AppProvider";
import {ExcelDownloadService} from "../../../../../../services/ExcelDownloadService";
import {Role} from "../../../../constants/role";
import AppPagination from "../../../../../lib/AppPagination/AppPagination";

const CustomersPopup = ({show, onClose}) => {
    const TAG = 'CustomersPopup';
    const custPopupRef = useRef(null);
    const {userDetails} = useSelector((state) => state.authReducer);

    const {adminLoading, popupRmId, rmCustomers} = useSelector((state) => state.adminReducer);
    const displayCEPopup = show
    const dispatch = useDispatch();
    console.log(TAG, 'loading', adminLoading)

    useEffect(() => {
        if (displayCEPopup) {
            dispatch(fetchRmCustomer({rmId: popupRmId}))
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [displayCEPopup])


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (custPopupRef.current && !custPopupRef.current.contains(event.target)) {
                onDisplayPopupHandle();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [custPopupRef]);


    const onDisplayPopupHandle = () => {
        onClose()
        dispatch(setAdminRmCustomer({data: [], metaData: {}}))
    }

    const handleDownloadExcel = () => {
        ExcelDownloadService.downloadRmCustomers(popupRmId)
    }

    return (
        /*TODO at optimization time use AppModel lib*/
        <div style={{display: displayCEPopup ? 'flex' : 'none'}}
             className={customersPopupStyles['customer__popup-container']}>
            <div className={customersPopupStyles['customer__popup-content']} ref={custPopupRef}>

                <div className={customersPopupStyles['customer__popup-header-close']}
                     onClick={onDisplayPopupHandle}>
                       <span
                           className={`material-symbols-rounded ${customersPopupStyles['admin__sidebar-icons']}`}>
                           Close
                       </span>
                </div>
                <div className={customersPopupStyles['customer__popup-header']}>
                    <div className={customersPopupStyles['customer__popup-header-title']}>
                        <h3>RM Customers</h3>
                    </div>
                    <div className={customersPopupStyles['customer__table-btn-wrapper']}>
                        {userDetails?.userRoleList[0].id === Role.ADMIN &&

                            <div>
                                <AppIcon name={'vscode-icons:file-type-excel2'}
                                         color={AppColors.sonicSilver} size={app?.isMobile ? 20 : 40}
                                         style={{cursor: 'pointer'}} onClick={handleDownloadExcel}/>
                            </div>
                        }
                    </div>
                </div>

                {
                    rmCustomers && rmCustomers.length > 0 ? (
                        <div>
                        <div className={customersPopupStyles['customer__table-wrapper']}>
                            <table className={customersPopupStyles['customer__table']}>
                                <thead className={customersPopupStyles['customer__popup-thead']} >
                                <tr className={customersPopupStyles['customer__table-heading-container']}>
                                    <th className={customersPopupStyles['customer__table-th-center']}>S. No.</th>
                                    <th className={customersPopupStyles['customer__table-th']}>Name
                                    </th>
                                    <th className={customersPopupStyles['customer__table-th']}>Mobile no.
                                    </th>
                                    <th className={customersPopupStyles['customer__table-th']}>Email Address
                                    </th>
                                    <th className={customersPopupStyles['customer__table-th']}>Address</th>
                                    <th className={customersPopupStyles['customer__table-th']}>Project</th>
                                    <th className={customersPopupStyles['customer__table-th']}>Location</th>
                                    <th className={customersPopupStyles['customer__table-th']}>Property Price
                                    </th>
                                    <th className={customersPopupStyles['customer__table-th']}>Status</th>
                                    <th className={customersPopupStyles['customer__table-th']}>Date</th>
                                </tr>
                                </thead>
                                <tbody style={{color:AppColors.tableRowTextColor}}>
                                {rmCustomers?.map((rmCustomer, i) => (
                                    <>
                                        <tr className={`${customersPopupStyles['customer__table-tr']} ${i % 2 !== 0 ? customersPopupStyles['customer__table-even-row'] : ''}`}
                                            key={i}>
                                            <td className={customersPopupStyles['customer__table-td-center']}
                                                /*rowSpan={rmCustomer?.customerProperties?.length }*/>{i + 1}</td>
                                            <td className={customersPopupStyles['customer__table-td']}
                                                /*rowSpan={rmCustomer?.customerProperties?.length }*/>{rmCustomer?.customerProfile?.firstName}</td>
                                            <td className={customersPopupStyles['customer__table-td']}
                                                /*rowSpan={rmCustomer?.customerProperties?.length }*/>{rmCustomer?.customerProfile?.contactNo}</td>
                                            <td className={customersPopupStyles['customer__table-td']}
                                                /*rowSpan={rmCustomer?.customerProperties?.length }*/>{rmCustomer?.customerProfile?.emailId}</td>
                                            <td className={customersPopupStyles['customer__table-td']}
                                                /*rowSpan={rmCustomer?.customerProperties?.length }*/>{rmCustomer?.customerProfile?.address}</td>
                                            <td className={customersPopupStyles['customer__table-td']}
                                                colSpan={6}>
                                                {rmCustomer?.customerProperties?.map((customerProperty, i) => (

                                                    <table>
                                                        <tr className={`${customersPopupStyles['customer__table-tr']} ${i % 2 !== 0 ? customersPopupStyles['customer__table-even-row'] : ''}`}
                                                            key={i}>
                                                        {/*<tr className={customersPopupStyles['customer__table-tr']}*/}
                                                        {/*    key={i}>*/}
                                                            <td className={customersPopupStyles['customer__table-internal-td']}>{customerProperty?.propertyName}</td>
                                                            <td className={customersPopupStyles['customer__table-internal-td']}>{customerProperty?.propertyArea}</td>
                                                            <td className={customersPopupStyles['customer__table-internal-td']}>{customerProperty?.minBudget + 'cr - ' + customerProperty?.maxBudget + ' cr'}</td>
                                                            <td className={customersPopupStyles['customer__table-internal-td']}>{customerProperty?.status}</td>
                                                            <td className={customersPopupStyles['customer__table-internal-td']}>{getDateFromTimestamp(customerProperty?.propertyDate)}</td>
                                                        </tr>
                                                    </table>
                                                ))}
                                            </td>
                                        </tr>
                                    </>
                                ))}
                                </tbody>
                            </table>
                        </div>
                            <div style={{marginBottom:"2rem",marginRight:"0.5rem"}}>
                                <AppPagination
                                    // onSelect={onSelect} totalItems={rmListMetaData?.totalCount}
                                />
                            </div>
                    </div>

                    ) : <div style={{
                        marginLeft: '1rem',
                        display: "flex",
                        justifyContent: "center",
                        fontSize: "2rem",
                        marginTop: "200px",
                        marginBottom: "200px"
                    }}>{adminLoading ? 'loading...' : 'No Data Found'}</div>

                }
            </div>

        </div>

    )
}

export default CustomersPopup;
