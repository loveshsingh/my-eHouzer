import ceDashboardStyles from "../../pages/ce/CEDashboard.module.css";
import {RM_COLUMN} from "../../constants/Constant";
import tableTDStyles from "../../helpers/tableTD/TableTR.module.css";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {displayCustomerPopupAction} from "../../../../actions/adminActions/customerPopupTable";
import {displayDataForm, fetchRms} from "../../../../actions/adminActions";
import AppRoundButton from "../../../lib/AppRoundButton";
import AppIcon from "../../../lib/AppIcon/AppIcon";
import {AppColors} from "../../../../public/AppColors";
import {AppContextValueType as app} from "../../../../base/contexts/AppProvider";
import {ExcelDownloadService} from "../../../../services/ExcelDownloadService";
import {Role} from "../../constants/role";
import AppModal from "../../../lib/AppModal/AppModal";
import CustomersPopup from "../../pages/ce/cePopupComponents/customersPopup/CustomersPopup";
import AppPagination from "../../../lib/AppPagination/AppPagination";

const RmListComponent = () => {
    const TAG = 'RmListComponent';
    const [rms, setRms] = useState([])
    const {isLoggedIn, userDetails} = useSelector((state) => state.authReducer);
    const [showCEPopup, setShowCEPopup] = useState(false)

    const {rmList, rmListMetaData, rmListLoading} = useSelector((state) => state.adminReducer);


    useEffect(() => {
        setRms(rmList)
    }, [rmList]);

    const dispatch = useDispatch();

    const onDisplayPopupHandle = (rmId) => {
        setShowCEPopup(!showCEPopup)
        dispatch(displayCustomerPopupAction({rmId}))
        document.body.style.overflow = 'hidden';
    }

    const getRmTotalCustomers = (rms) => {
        let count = 0;
        rms.map((rm) => {
            return count = count + rm?.customerCount;
        })
        return count;
    }

    const handleAddRm = () => {

        dispatch(displayDataForm({
            formToggle: true,
            show: true,
            buttonName: 'addRm',
            data: []
        }))
    };

    const onUpdateRm = (rm) => {
        dispatch(displayDataForm({
            formToggle: true,
            show: true,
            buttonName: 'updateRm',
            data: {rm}
        }))
    };

    const downloadRmsExcelSheet = () => {
        ExcelDownloadService.downloadRms()
    }

    /**
     * @author Vipul Garg
     * @since 04-11-2023
     * @description to close the CE Popup
     */
    const onClickCloseCePopup = () => {
        setShowCEPopup(!showCEPopup)
    };


    const onSelect = (data) => {
        const {page, perPage} = data
        dispatch(fetchRms(data))
    }

    return (
        <div className={ceDashboardStyles['ce__table-section-container']}>
            <AppModal
                onClose={onClickCloseCePopup}
                show={showCEPopup}
            >
                <CustomersPopup show={showCEPopup} onClose={onClickCloseCePopup}/>
            </AppModal>
            <div className={ceDashboardStyles['ce__table-btn-wrapper']}>
                {/*<div>*/}
                {/*    <AppRoundButton onClick={handleAddRm} buttonText={"Add RM"}*/}
                {/*                    buttonStyle={ceDashboardStyles["ce__table-send-button"]}*/}
                {/*                    type={"secondary"}/>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    {userDetails?.userRoleList[0].id === Role.ADMIN &&*/}

                {/*        <div>*/}
                {/*            <AppIcon name={'vscode-icons:file-type-excel2'}*/}
                {/*                     color={AppColors.sonicSilver} size={app?.isMobile ? 20 : 40}*/}
                {/*                     style={{cursor: 'pointer'}} onClick={downloadRmsExcelSheet}/>*/}
                {/*        </div>*/}
                {/*    }*/}
                {/*</div>*/}
            </div>
            <div className={ceDashboardStyles['ce__heading-table-wrapper']}>
                <div className={ceDashboardStyles['ce__table-btn-wrapper']}>
            <div className={ceDashboardStyles['ce__section-heading']}>
                <h3>Relationship Manager</h3>
            </div>
                    <div style={{display:"flex"}}>
                    <div style={{marginRight:"1rem"}}>
                        <AppRoundButton onClick={handleAddRm} buttonText={"Add RM"}
                                        buttonStyle={ceDashboardStyles["ce__table-send-button"]}
                                        type={"secondary"}/>
                    </div>
                <div>
                    {userDetails?.userRoleList[0].id === Role.ADMIN &&

                        <div>
                            {/*<AppIcon name={'vscode-icons:file-type-excel2'}*/}
                            {/*         color={AppColors.sonicSilver} size={app?.isMobile ? 20 : 40}*/}
                            {/*         style={{cursor: 'pointer'}} onClick={downloadRmsExcelSheet}/>*/}
                            <AppIcon name={'uiw:file-excel'}
                                     color={AppColors.darkSpringGreen} size={app?.isMobile ? 15 : 30}
                                     style={{cursor: 'pointer'}} onClick={downloadRmsExcelSheet}/>
                        </div>
                    }
                </div>
                    </div>
                </div>
            <div className={ceDashboardStyles['ce__table-wrapper']}>
                <table className={ceDashboardStyles['ce__table']}>
                    <thead className={ceDashboardStyles['ce__table-thead']}>
                    <tr className={ceDashboardStyles['ce__table-heading-container']}>
                        {RM_COLUMN.map((header, i) => (
                            <th key={i} className={ceDashboardStyles['ce__table-th']}>
                                {header.name}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody style={{color:AppColors.tableRowTextColor}}>
                    {(!rmListLoading && rms.length > 0) ? (
                        <>
                            {rms.map((rm, i) => (
                                // <tr className={ceDashboardStyles['ce__table-tr']} key={i}>
                                <tr className={`${ceDashboardStyles['ce__table-tr']} ${i % 2 !== 0 ? ceDashboardStyles['ce__table-even-row'] : ''}`} key={i}>
                                    <td className={ceDashboardStyles['ce__table-td-center']}
                                        onClick={() => onUpdateRm(rm)}>{i + 1}</td>
                                    <td className={ceDashboardStyles['ce__table-td']}
                                        onClick={() => onUpdateRm(rm)}>{rm.rmId}</td>
                                    <td className={ceDashboardStyles['ce__table-td']}
                                        onClick={() => onUpdateRm(rm)}>{rm.firstName} {rm.lastName}</td>
                                    <td className={ceDashboardStyles['ce__table-td']}
                                        onClick={() => onUpdateRm(rm)}>{rm.contactNo}</td>
                                    <td className={ceDashboardStyles['ce__table-td']}
                                        onClick={() => onUpdateRm(rm)}>{rm.emailId}</td>
                                    <td className={ceDashboardStyles['ce__table-td-center']}>
                                        <div onClick={() => onDisplayPopupHandle(rm.rmId)} style={{
                                            color: 'blue',
                                            // textDecoration: 'underline',
                                            // textUnderlineOffset: '5px',
                                        }}>
                                            <span>{rm.customerCount}</span>
                                        </div>
                                    </td>
                                    <td className={ceDashboardStyles['ce__table-td']}
                                        onClick={() => onUpdateRm(rm)}></td>
                                    <td className={ceDashboardStyles['ce__table-td']}
                                        onClick={() => onUpdateRm(rm)}>{rm.remarks}</td>
                                    <td className={`${ceDashboardStyles['ce__table-action']}`}>
                                        <div  className={`${ceDashboardStyles['ce__table-action-edit-icon']}`} onClick={() => onUpdateRm(rm)}>
                                            {/*<AppIcon name={'material-symbols:edit-square-outline'}*/}
                                            {/*           color={'grey'} size={20}*/}
                                            {/*           style={{cursor: 'pointer',opacity:'0.7'}}/>*/}
                                            {/*<button style={{background:'grey',color:"white", border:"none"}}>Edit</button>*/}
                                            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                        </div>
                                        <div className={`${ceDashboardStyles['ce__table-action-delete-icon']}`} >
                                            {/*<AppIcon name={'material-symbols:delete-outline'}*/}
                                            {/*           color={'red'} size={20}*/}
                                            {/*           style={{cursor: 'pointer',opacity:'0.7',marginTop:"0.2rem"}}/>*/}
                                            {/*<button style={{background:'red',color:"white", border: '1px solid #ff0000'}}>Delete</button>*/}
                                            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            <tr className={tableTDStyles['table-tr']}>
                                <td className={ceDashboardStyles['ce__table-td']}></td>
                                <td className={ceDashboardStyles['ce__table-td']}>Total</td>
                                <td className={ceDashboardStyles['ce__table-td']}></td>
                                <td className={ceDashboardStyles['ce__table-td']}></td>
                                <td className={ceDashboardStyles['ce__table-td']}></td>
                                <td className={ceDashboardStyles['ce__table-td-center']}>{getRmTotalCustomers(rms || [])}</td>
                                <td className={ceDashboardStyles['ce__table-td']}></td>
                                <td className={ceDashboardStyles['ce__table-td']}></td>
                            </tr>
                        </>
                    ) : (!rmListLoading && rms.length === 0) ? (
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
                {/*<table className={ceDashboardStyles['ce__table']}>*/}
                {/*    <tbody style={{color:AppColors.tableRowTextColor}}>*/}
                {/*    <>*/}
                {/*        <tr className={tableTDStyles['table-tr']}>*/}
                {/*            <td className={ceDashboardStyles['ce__table-td']}></td>*/}
                {/*            <td className={ceDashboardStyles['ce__table-td']}>Total</td>*/}
                {/*            <td className={ceDashboardStyles['ce__table-td']}></td>*/}
                {/*            <td className={ceDashboardStyles['ce__table-td']}></td>*/}
                {/*            <td className={ceDashboardStyles['ce__table-td']}></td>*/}
                {/*            <td className={ceDashboardStyles['ce__table-td-center']}>{getRmTotalCustomers(rms || [])}</td>*/}
                {/*            <td className={ceDashboardStyles['ce__table-td']}></td>*/}
                {/*            <td className={ceDashboardStyles['ce__table-td']}></td>*/}
                {/*        </tr>*/}
                {/*    </>*/}
                {/*    </tbody>*/}
                {/*</table>*/}
                <AppPagination onSelect={onSelect} totalItems={rmListMetaData?.totalCount}/>
            </div>
            {/*<AppPagination onSelect={onSelect} totalItems={rmListMetaData?.totalCount}/>*/}
        </div>
    )
}

export default RmListComponent
