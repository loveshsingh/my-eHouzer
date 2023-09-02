import React, {useEffect, useState} from "react";
import ceTableStyles from "./ceTable.module.css";
import AppIcon from "../../../../lib/AppIcon/AppIcon";
import {AppColors} from "../../../../../public/AppColors";
import {AppContextValueType as app} from "../../../../../base/contexts/AppProvider";
import {ExcelDownloadService} from "../../../../../services/ExcelDownloadService";
import {useDispatch, useSelector} from "react-redux";
import {displayDataForm, fetchCEList} from "../../../../../actions/adminActions";
import AppRoundButton from "../../../../lib/AppRoundButton";
import ceDashboardStyles from "../../../pages/ce/CEDashboard.module.css";
import AppPagination from "../../../../lib/AppPagination/AppPagination";

/**
 * @author Vipul Garg
 * @since 02-05-2023
 * @description CE Table Component
 */
const CETable = () => {
    const [ces, setCes] = useState([])
    const {ceList, ceListMetaData, ceListLoading} = useSelector((state) => state.adminReducer);
    const dispatch = useDispatch()

    useEffect(() => {
        setCes(ceList)
    }, [ceList]);
    useEffect(() => {
        dispatch(fetchCEList())
    }, []);

    /**
     * @author Vipul Garg
     * @since 02-05-2023
     * @description to download CE List Excel Sheet
     */
    const handleDownloadExcel = () => {
        ExcelDownloadService.downloadCEList()
    }
    const handleAddCE = () => {

        dispatch(displayDataForm({
            formToggle: true,
            show: true,
            buttonName: 'addCE',
            data: []
        }))
    };
    const onUpdateCE = (ce) => {
        dispatch(displayDataForm({
            formToggle: true,
            show: true,
            buttonName: 'updateCE',
            data: {ce}
        }))
    };


    const onSelect = (data) => {
        // const {page, perPage} = data
        dispatch(fetchCEList(data))
    }

    return (
        <div style={{marginTop: "2rem"}}>
            <div className={ceTableStyles['ce__table-btn-wrapper']}>

            </div>
            <div className={ceTableStyles['ce__heading-table-wrapper']}>
            <div className={ceTableStyles['ce__section-button-wrapper']}>

                <div className={ceTableStyles['ce__section-heading']}>
                    <h3>CE Table</h3>
                </div>
                <div style={{display:"flex"}}>

                    <div style={{marginRight:"1rem"}}>
                        <AppRoundButton onClick={handleAddCE} buttonText={"Add CE"}
                                        buttonStyle={ceDashboardStyles["ce__table-send-button"]}
                                        type={"secondary"}/>
                    </div>

                    <div className={ceTableStyles['excel--button-wrapper']}>

                        {/*<AppIcon name={'vscode-icons:file-type-excel2'}*/}
                        {/*         color={AppColors.sonicSilver} size={app?.isMobile ? 20 : 40}*/}
                        {/*         style={{cursor: 'pointer'}} onClick={handleDownloadExcel}/>*/}
                        <AppIcon name={'uiw:file-excel'}
                                 color={AppColors.darkSpringGreen} size={app?.isMobile ? 15 : 30}
                                 style={{cursor: 'pointer'}} onClick={handleDownloadExcel}/>

                    </div>

                </div>

            </div>
            <div className={ceTableStyles['ce__section-container']}>
                <div className={ceTableStyles['table-wrapper']}>
                    <table className={ceTableStyles["table"]}>
                        <thead className={ceTableStyles["table-thead"]}>
                        <tr className={ceTableStyles["table-heading-container"]}>
                            <th className={ceTableStyles["table-th-center"]}>S. No.</th>
                            <th className={ceTableStyles["table-th"]}>Employee ID</th>
                            <th className={ceTableStyles["table-th"]}>Name</th>
                            <th className={ceTableStyles["table-th"]}>Mobile No.</th>
                            <th className={ceTableStyles["table-th"]}>Email Address</th>
                            <th className={ceTableStyles["table-th"]}>Remarks</th>
                        </tr>
                        </thead>
                        <tbody style={{color:AppColors.tableRowTextColor}}>

                        {(!ceListLoading && ces?.length > 0) ? (
                            <>
                                {ces?.map((ce, i) => (
                                    <tr className={`${ceTableStyles['table-tr']} ${i % 2 !== 0 ? ceTableStyles['table-even-row'] : ''}`}
                                        key={i}>
                                        <td className={ceTableStyles['table-td-center']}
                                            onClick={() => onUpdateCE(ce)}>{i + 1}</td>
                                        <td className={ceTableStyles['table-td']}
                                            onClick={() => onUpdateCE(ce)}>{ce.userId}</td>
                                        <td className={ceTableStyles['table-td']}
                                            onClick={() => onUpdateCE(ce)}>{ce.firstName} {ce.lastName}</td>
                                        <td className={ceTableStyles['table-td']}
                                            onClick={() => onUpdateCE(ce)}>{ce.contactNo}</td>
                                        <td className={ceTableStyles['table-td']}
                                            onClick={() => onUpdateCE(ce)}>{ce.emailId}</td>
                                        <td className={ceTableStyles['table-td']}
                                            onClick={() => onUpdateCE(ce)}>{ce.remarks}</td>
                                    </tr>
                                ))}

                            </>
                        ) : (!ceListLoading && ces?.length === 0) ? (
                            <tr>
                                <td className={ceDashboardStyles['ce__table-td']} colSpan="8"
                                    style={{textAlign: 'center'}}>
                                    <div className={ceDashboardStyles['ce__table-no-data']}>
                                        No Data Found
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            <tr>
                                <td className={ceDashboardStyles['ce__table-td']} colSpan="8"
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

            </div>
                <AppPagination onSelect={onSelect} totalItems={ceListMetaData?.totalCount}/>
            </div>

        </div>
    )
}

export default CETable;