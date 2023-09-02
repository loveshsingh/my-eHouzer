import React, {useEffect, useRef} from "react";
import custTableOnPopupStyles from "./CustTableOnPopup.module.css"
import {useDispatch, useSelector} from "react-redux";
import {fetchPropertyBookingData, setPropertyBookingData} from "../../../../../../actions/adminActions";
import {ExcelDownloadService} from "../../../../../../services/ExcelDownloadService";
import {Role} from "../../../../constants/role";
import AppIcon from "../../../../../lib/AppIcon/AppIcon";
import {AppColors} from "../../../../../../public/AppColors";
import {AppContextValueType as app} from "../../../../../../base/contexts/AppProvider";
import AppPagination from "../../../../../lib/AppPagination/AppPagination";
import ceDashboardStyles from "../../../ce/CEDashboard.module.css";
import customersPopupStyles from "../../../ce/cePopupComponents/customersPopup/CustomersPopup.module.css";

const CustTableOnPopup = ({show, onClose}) => {

    const popupRef = useRef(null);
    const {userDetails} = useSelector((state) => state.authReducer);

    const {
        adminLoading,
        popupPropertyId,
        propertyBookingData,
        propertyBookingMetaData,
        propertyBookingLoading
    } = useSelector((state) => state.adminReducer);
    const displayPropertyBookingPopup = show;
    const dispatch = useDispatch();

    useEffect(() => {
        const initialData = {page: 1, perPage: 10}
        dispatch(setPropertyBookingData({data: [], metaData: initialData}))
        if (displayPropertyBookingPopup) {
            dispatch(fetchPropertyBookingData({propertyId: popupPropertyId, page: 1, perPage: 10}))
        }
    }, [displayPropertyBookingPopup])

    const onCustDisplayPopupHandle = () => {
        onClose()
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {

                onCustDisplayPopupHandle();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [popupRef]);

    const handleDownloadExcel = () => {
        if (popupPropertyId) {
            ExcelDownloadService.downloadPropertyBookings(popupPropertyId)
        }
    }

    const onSelect = (data) => {
        const {page, perPage} = data
        dispatch(fetchPropertyBookingData({propertyId: popupPropertyId, page: page, perPage: perPage}))
    }

    return (
        <div style={{display: displayPropertyBookingPopup ? 'flex' : 'none'}}
             className={custTableOnPopupStyles['customer__popup-container']}>
            <div className={custTableOnPopupStyles['customer__popup-content']} ref={popupRef}>
                <div>
                    <div className={custTableOnPopupStyles['customer__popup-header-close']}
                         onClick={onCustDisplayPopupHandle}>
                       <span
                           className={`material-symbols-rounded ${custTableOnPopupStyles['admin__sidebar-icons']}`}>
                           Close
                       </span>
                    </div>
                    <div className={custTableOnPopupStyles['customer__popup-header']}>
                        <div className={custTableOnPopupStyles['customer__popup-header-title']}>
                            <h3>Customer Details</h3>
                        </div>
                        <div>
                            {userDetails?.userRoleList[0].id === Role.ADMIN &&

                                <div>
                                    <AppIcon name={'vscode-icons:file-type-excel2'}
                                             color={AppColors.sonicSilver} size={app?.isMobile ? 20 : 40}
                                             style={{cursor: 'pointer'}} onClick={handleDownloadExcel}/>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className={custTableOnPopupStyles['customer__table-wrapper']}>
                    <table className={custTableOnPopupStyles['customer__table']}>
                        <thead  className={custTableOnPopupStyles['table-thead']}>
                        <tr className={custTableOnPopupStyles['customer__table-heading-container']}>
                            <th className={custTableOnPopupStyles['customer__table-th']}>S. No.</th>
                            <th className={custTableOnPopupStyles['customer__table-th']}>Name</th>
                            <th className={custTableOnPopupStyles['customer__table-th']}>Project</th>
                            <th className={custTableOnPopupStyles['customer__table-th']}>Location</th>
                            <th className={custTableOnPopupStyles['customer__table-th']}>Unit</th>
                            <th className={custTableOnPopupStyles['customer__table-th']}>Property Price</th>
                            <th className={custTableOnPopupStyles['customer__table-th']}>Booking Amt</th>
                            <th className={custTableOnPopupStyles['customer__table-th']}>Booking Status</th>
                            <th className={custTableOnPopupStyles['customer__table-th']}>Booking Date</th>
                        </tr>
                        </thead>
                        <tbody style={{color:AppColors.tableRowTextColor}}>
                        {(!propertyBookingLoading && propertyBookingData.length > 0) ? (
                            <>
                                {propertyBookingData?.map((propertyData, i) => (
                                    <tr className={`${custTableOnPopupStyles['customer__table-tr']} ${i % 2 !== 0 ? custTableOnPopupStyles['customer__table-even-row'] : ''}`}
                                        key={i}>
                                    {/*<tr className={custTableOnPopupStyles['customer__table-tr']} key={i}>*/}
                                        <td className={custTableOnPopupStyles['customer__table-td-center']}>{i + 1}</td>
                                        <td className={custTableOnPopupStyles['customer__table-td']}>{propertyData?.userProfile?.firstName}</td>
                                        <td className={custTableOnPopupStyles['customer__table-td']}>{propertyData?.property?.name}</td>
                                        <td className={custTableOnPopupStyles['customer__table-td']}>{propertyData?.property?.city}</td>
                                        <td className={custTableOnPopupStyles['customer__table-td']}>{propertyData?.propertyVariant?.type}</td>
                                        <td className={custTableOnPopupStyles['customer__table-td']}>{propertyData?.propertyVariant?.price + " Cr"}</td>
                                        <td className={custTableOnPopupStyles['customer__table-td']}>{propertyData?.propertyVariant?.bookingAmt}</td>
                                        <td className={custTableOnPopupStyles['customer__table-td']}>{propertyData?.booking?.status}</td>
                                        <td className={custTableOnPopupStyles['customer__table-td']}>{propertyData?.booking?.bookingDate}</td>
                                    </tr>

                                ))}
                            </>
                        ) : (!propertyBookingLoading && propertyBookingData.length === 0) ? (
                            <tr>
                                <td className={ceDashboardStyles['ce__table-td-no-data']} colSpan="9"
                                    style={{textAlign: 'center'}}>
                                    <div className={ceDashboardStyles['ce__table-no-data']}>
                                        No Data Found
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            <tr>
                                <td className={ceDashboardStyles['ce__table-td']} colSpan="9"
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
                <div style={{padding: '0rem 1rem 2rem 0'}}>
                    <AppPagination onSelect={onSelect} totalItems={propertyBookingMetaData?.totalCount}/>
                </div>

            </div>

        </div>

    )
}

export default CustTableOnPopup
