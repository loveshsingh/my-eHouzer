import React from "react";
import customerDashboardStyles from "./CustomerDashboard.module.css";
import LineChart from "../../charts/line/LineChart"
import AppIcon from "../../../../lib/AppIcon/AppIcon";
import {AppColors} from "../../../../../public/AppColors";
import {AppContextValueType as app} from "../../../../../base/contexts/AppProvider";
import {ExcelDownloadService} from "../../../../../services/ExcelDownloadService";
import salesUnitsPerBuilderStyles from "../salesUnitsPerBuilder/SalesUnitsPerBuilder.module.css";
import totalSalesStyles from "../totalSales/TotalSales.module.css";

const CustomerDashboard = () => {

    const handleDownloadExcel = () => {
        ExcelDownloadService.downloadCustomerDashboard()
    }

    return (
        <div style={{display:"flex"}}>
            <div className={customerDashboardStyles['admin__section-heading-table-wrapper']}>
            <div className={customerDashboardStyles['admin__section-button-wrapper']}>
                <div className={customerDashboardStyles['admin__section-heading']}>
                    <h3>Customer Dashboard</h3>
                </div>
                <div className={customerDashboardStyles['excel--button-wrapper']}>

                    {/*<AppIcon name={'vscode-icons:file-type-excel2'}*/}
                    {/*         color={AppColors.sonicSilver} size={app?.isMobile ? 20 : 40}*/}
                    {/*         style={{cursor: 'pointer'}} onClick={handleDownloadExcel}/>*/}
                    <AppIcon name={'uiw:file-excel'}
                             color={AppColors.darkSpringGreen} size={app?.isMobile ? 15 : 30}
                             style={{cursor: 'pointer'}} onClick={handleDownloadExcel}/>

                </div>
            </div>
                <div className={customerDashboardStyles['table-wrapper']}>
                    <table className={customerDashboardStyles["table"]}>
                        <thead className={customerDashboardStyles["table-thead"]}>
                        <tr className={customerDashboardStyles["table-heading-container"]}>
                            <th className={customerDashboardStyles["table-th"]}>Date</th>
                            <th className={customerDashboardStyles["table-th"]}>No. of Total Views</th>
                            <th className={customerDashboardStyles["table-th"]}>A/C created</th>
                            <th className={customerDashboardStyles["table-th"]}>No. of Physical site visited</th>
                            <th className={customerDashboardStyles["table-th"]}>No. of Property Booked</th>
                        </tr>
                        </thead>
                        <tbody style={{color:AppColors.tableRowTextColor}}>
                        <tr className={customerDashboardStyles["table-tr"]}>
                            <td className={customerDashboardStyles["table-td"]}>15/03/2023</td>
                            <td className={customerDashboardStyles["table-td"]}>5</td>
                            <td className={customerDashboardStyles["table-td"]}>1</td>
                            <td className={customerDashboardStyles["table-td"]}>4</td>
                            <td className={customerDashboardStyles["table-td"]}>1</td>
                        </tr>
                        <tr className={`${customerDashboardStyles['table-tr']} ${customerDashboardStyles['table-even-row']}`}
                            // className={customerDashboardStyles["table-tr"]}
                        >
                            <td className={customerDashboardStyles["table-td"]}>16/03/2023</td>
                            <td className={customerDashboardStyles["table-td"]}>2</td>
                            <td className={customerDashboardStyles["table-td"]}>2</td>
                            <td className={customerDashboardStyles["table-td"]}>3</td>
                            <td className={customerDashboardStyles["table-td"]}>0</td>
                        </tr>
                        <tr className={customerDashboardStyles["table-tr"]}>
                            <td className={customerDashboardStyles["table-td"]}>17/03/2023</td>
                            <td className={customerDashboardStyles["table-td"]}>4</td>
                            <td className={customerDashboardStyles["table-td"]}>2</td>
                            <td className={customerDashboardStyles["table-td"]}>3</td>
                            <td className={customerDashboardStyles["table-td"]}>3</td>
                        </tr>
                        <tr className={`${customerDashboardStyles['table-tr']} ${customerDashboardStyles['table-even-row']}`}
                            // className={customerDashboardStyles["table-tr"]}
                        >
                            <td className={customerDashboardStyles["table-td"]}>18/03/2023</td>
                            <td className={customerDashboardStyles["table-td"]}>6</td>
                            <td className={customerDashboardStyles["table-td"]}>4</td>
                            <td className={customerDashboardStyles["table-td"]}>5</td>
                            <td className={customerDashboardStyles["table-td"]}>2</td>
                        </tr>
                        <tr className={customerDashboardStyles["table-tr"]}>
                            <td className={customerDashboardStyles["table-td"]}>19/03/2023</td>
                            <td className={customerDashboardStyles["table-td"]}>8</td>
                            <td className={customerDashboardStyles["table-td"]}>3</td>
                            <td className={customerDashboardStyles["table-td"]}>2</td>
                            <td className={customerDashboardStyles["table-td"]}>4</td>
                        </tr>
                        <tr className={`${customerDashboardStyles['table-tr']} ${customerDashboardStyles['table-even-row']}`}
                            // className={customerDashboardStyles["table-tr"]}
                        >
                            <td className={customerDashboardStyles["table-td"]}>Total</td>
                            <td className={customerDashboardStyles["table-td"]}>25</td>
                            <td className={customerDashboardStyles["table-td"]}>12</td>
                            <td className={customerDashboardStyles["table-td"]}>17</td>
                            <td className={customerDashboardStyles["table-td"]}>10</td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>
            <div className={customerDashboardStyles['admin__section-container']}>
                <div className={customerDashboardStyles['admin__chart-container']}>
                    <LineChart/>
                </div>
            </div>
        </div>
    )
}

export default CustomerDashboard;
