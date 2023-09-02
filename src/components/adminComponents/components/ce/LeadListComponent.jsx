import leadDashboardStyles from "./LeadListComponent.module.css";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ExcelDownloadService} from "../../../../services/ExcelDownloadService";
import tableTDStyles from "../../helpers/tableTD/TableTR.module.css";
import {LEAD_STATUS} from "../../constants/Constant";
import {fetchLeads, updateLeadStatus} from "../../../../actions/adminActions";
import AppPagination from "../../../lib/AppPagination/AppPagination";
import ceDashboardStyles from "../../pages/ce/CEDashboard.module.css";
import {AppColors} from "../../../../public/AppColors";


/**
 * @author Vipul Garg
 * @since 02-05-2023
 * @description Lead List Component
 */

const LeadListComponent = () => {
    const [leads, setLeads] = useState([])
    const {adminLeads, adminLeadsLoading, adminLeadsMetaData} = useSelector((state) => state.adminReducer);
    const {userDetails} = useSelector((state) => state.authReducer);
    const dispatch = useDispatch()

    console.log('LeadListComponent metadata', adminLeadsMetaData)

    useEffect(() => {
        setLeads(adminLeads)
    }, [adminLeads]);

    /**
     * @author Vipul Garg
     * @since 02-05-2023
     * @description to download Admin Leads Excel Sheet
     */
    const downloadLeadsExcelSheet = () => {
        ExcelDownloadService.downloadAdminLeads()
    }
    const handleStatusChange = (e, leadId, agentId) => {
        const selectedStatus = e.target.value;
        const details = {
            agentId: agentId,
            leadId: leadId,
            status: selectedStatus
        }
        dispatch(updateLeadStatus(details))
    };

    const onSelect = (data) => {
        const {page, perPage} = data
        dispatch(fetchLeads(data))
    }

    return (
        <div className={leadDashboardStyles['lead__table-section-container']}>
            <div className={leadDashboardStyles['lead__heading-table-wrapper']}>
            <div className={leadDashboardStyles['lead__table-heading-wrapper']}>
                <div className={leadDashboardStyles['lead__section-heading']}><h3>Leads List</h3></div>
                {/*<div>
                    {userDetails?.userRoleList[0].id === Role.ADMIN &&
                        <Tippy content={
                            <div className={leadDashboardStyles['download__tooltip']}>Download</div>
                        }>
                            <div>
                                <AppIcon name={'vscode-icons:file-type-excel2'}
                                         color={AppColors.sonicSilver} size={app?.isMobile ? 20 : 40}
                                         style={{cursor: 'pointer'}} onClick={downloadLeadsExcelSheet}/>
                            </div>
                        </Tippy>
                    }
                </div>*/}
            </div>

            <div className={leadDashboardStyles['lead__table-wrapper']}>
                <table className={leadDashboardStyles['lead__table']}>
                    <thead className={ceDashboardStyles['lead__table-thead']}>
                    <tr className={leadDashboardStyles['lead__table-heading-container']}>

                        <th className={leadDashboardStyles['lead__table-th']}>S. No.</th>
                        <th className={leadDashboardStyles['lead__table-th']}>Name</th>
                        <th className={leadDashboardStyles['lead__table-th']}>Mobile No.</th>
                        <th className={leadDashboardStyles['lead__table-th']}>Email Address</th>
                        <th className={leadDashboardStyles['lead__table-th']}>Address</th>
                        <th className={leadDashboardStyles['lead__table-th']}>Status</th>

                    </tr>
                    </thead>
                    <tbody style={{color:AppColors.tableRowTextColor}}>
                    {(!adminLeadsLoading && leads.length > 0) ? (
                        <>
                            {leads?.map((lead, i) => (
                                <tr className={`${leadDashboardStyles['lead__table-tr']} ${i % 2 !== 0 ? leadDashboardStyles['lead__table-even-row'] : ''}`}
                                 key={lead.leadId}>
                                    <td className={leadDashboardStyles['lead__table-td-center']}>{i + 1}</td>
                                    <td className={leadDashboardStyles['lead__table-td']}>{lead.customerName}</td>
                                    <td className={leadDashboardStyles['lead__table-td']}>{lead.contactNo}</td>
                                    <td className={leadDashboardStyles['lead__table-td']}>{lead.emailId}</td>
                                    <td className={leadDashboardStyles['lead__table-td']}>{lead.address}</td>
                                    <td className={leadDashboardStyles['lead__table-td']}>
                                        {/*{lead.status}*/}
                                        <select className={tableTDStyles['table-select']} value={lead.status}
                                                onChange={(e) => handleStatusChange(e, lead.leadId, lead.agentId)}>
                                            {LEAD_STATUS?.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                        {/*<CustomerProperty key={i} customerProperty={lead.leadId} customerId={lead.agentId}/>*/}
                                    </td>
                                </tr>
                            ))}
                        </>
                    ) : (!adminLeadsLoading && leads.length === 0) ? (
                        <tr>
                            <td className={ceDashboardStyles['ce__table-td']} colSpan="6" style={{textAlign: 'center'}}>
                                <div className={ceDashboardStyles['ce__table-no-data']}>
                                    No Data Found
                                </div>
                            </td>
                        </tr>
                    ) : (
                        <tr>
                            <td className={ceDashboardStyles['ce__table-td']} colSpan="6" style={{textAlign: 'center'}}>
                                <div className={ceDashboardStyles['ce__table-no-data']}>
                                    Loading...
                                </div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
                <AppPagination onSelect={onSelect} totalItems={adminLeadsMetaData?.totalCount}/>
            </div>
        </div>
    )
}
// const CustomerProperty = ({customerProperty, customerId}) => {
//     return (
//         <table className={customersListStyles['ce_customer__table']}>
//             <tr className={customersListStyles['ce_customer__table-tr']}>
//                 <td className={customersListStyles['ce_customer__table-td']}>{customerProperty?.propertyName}</td>
//                 <td className={customersListStyles['ce_customer__table-td']}>{customerProperty?.developerName}</td>
//                 <td className={customersListStyles['ce_customer__table-td']}>{customerProperty?.propertyArea}</td>
//                 <td className={customersListStyles['ce_customer__table-td']}>{customerProperty?.minBudget + 'cr - ' + customerProperty?.maxBudget + ' cr'}</td>
//                 <td className={customersListStyles['ce_customer__table-td']}>
//                     <select className={tableTDStyles['table-select']} value={status}
//                             onChange={handleStatusChange}>
//                         {CUSTOMER_STATUS?.map((option) => (
//                             <option key={option} value={option}>
//                                 {option}
//                             </option>
//                         ))}
//                     </select>
//                 </td>
//                 <td className={customersListStyles['ce_customer__table-td']}>{getDateFromTimestamp(customerProperty?.propertyDate)}</td>
//                 <td className={customersListStyles['ce_customer__table-td']}>
//                     <select className={tableTDStyles['table-select']} value={rmId} onChange={handleRmChange}>
//                         <option value="" disabled hidden selected>
//                             Select RM
//                         </option>
//                         {rmList?.map((rm) => (
//                             <option key={rm.rmId} value={rm.rmId}>
//                                 {rm.firstName} {rm.lastName}
//                             </option>
//                         ))}
//                     </select></td>
//             </tr>
//         </table>
//     )
// }

export default LeadListComponent