import React from "react";
import totalSalesStyles from "./TotalSales.module.css";
import LineChart from "../../charts/line/LineChart"
import {ExcelDownloadService} from "../../../../../services/ExcelDownloadService";
import AppIcon from "../../../../lib/AppIcon/AppIcon";
import {AppColors} from "../../../../../public/AppColors";
import {AppContextValueType as app} from "../../../../../base/contexts/AppProvider";

/**
 * @author Vikrant
 * @since 01-03-2023
 * @description to handle total sales table
 * @return {JSX.Element}
 * @constructor
 */
const TotalSales = () => {

    const handleDownloadExcel = () => {
        ExcelDownloadService.downloadTotalSales()
    }

    return (
        <div style={{display:"flex"}}>
            <div className={totalSalesStyles['admin__section-heading-table-wrapper']}>
            <div className={totalSalesStyles['admin__section-button-wrapper']}>
                <div className={totalSalesStyles['admin__section-heading']}>
                    <h3>Total sales over period</h3>
                </div>
                <div className={totalSalesStyles['excel--button-wrapper']}>
                    {/*<AppIcon name={'vscode-icons:file-type-excel2'}*/}
                    {/*         color={AppColors.sonicSilver} size={app?.isMobile ? 20 : 40}*/}
                    {/*         style={{cursor: 'pointer'}} onClick={handleDownloadExcel}/>*/}
                    <AppIcon name={'uiw:file-excel'}
                             color={AppColors.darkSpringGreen} size={app?.isMobile ? 15 : 30}
                             style={{cursor: 'pointer'}} onClick={handleDownloadExcel}/>
                </div>
            </div>
            <div className={totalSalesStyles['table-wrapper']}>
                <table className={totalSalesStyles["table"]}>
                    <thead className={totalSalesStyles["table-thead"]}>
                    <tr className={totalSalesStyles["table-heading-container"]}>
                        <th className={totalSalesStyles["table-th"]}>Month & Year</th>
                        <th className={totalSalesStyles["table-th"]}>Week</th>
                        <th className={totalSalesStyles["table-th"]}>Sales</th>
                        <th className={totalSalesStyles["table-th"]}>Sales Units</th>
                    </tr>
                    </thead>
                    <tbody style={{color:AppColors.tableRowTextColor}}>
                    <tr className={totalSalesStyles["table-tr"]}>
                        <td className={totalSalesStyles["table-td"]}>2023</td>
                        <td className={totalSalesStyles["table-td"]}>1</td>
                        <td className={totalSalesStyles["table-td"]}>40</td>
                        <td className={totalSalesStyles["table-td"]}>3</td>
                    </tr>
                    <tr className={`${totalSalesStyles['table-tr']} ${totalSalesStyles['table-even-row']}`}
                        // className={totalSalesStyles["table-tr"]}
                    >
                        <td className={totalSalesStyles["table-td"]}>2023</td>
                        <td className={totalSalesStyles["table-td"]}>2</td>
                        <td className={totalSalesStyles["table-td"]}>30</td>
                        <td className={totalSalesStyles["table-td"]}>2</td>
                    </tr>
                    <tr className={totalSalesStyles["table-tr"]}>
                        <td className={totalSalesStyles["table-td"]}>2023</td>
                        <td className={totalSalesStyles["table-td"]}>3</td>
                        <td className={totalSalesStyles["table-td"]}>30</td>
                        <td className={totalSalesStyles["table-td"]}>2</td>
                    </tr>
                    <tr className={`${totalSalesStyles['table-tr']} ${totalSalesStyles['table-even-row']}`}
                        // className={totalSalesStyles["table-tr"]}
                    >
                        <td className={totalSalesStyles["table-td"]}>2023</td>
                        <td className={totalSalesStyles["table-td"]}>4</td>
                        <td className={totalSalesStyles["table-td"]}>0</td>
                        <td className={totalSalesStyles["table-td"]}>0</td>
                    </tr>
                    <tr className={totalSalesStyles["table-tr"]}>
                        <td className={totalSalesStyles["table-td"]}>2023</td>
                        <td className={totalSalesStyles["table-td"]}>5</td>
                        <td className={totalSalesStyles["table-td"]}>0</td>
                        <td className={totalSalesStyles["table-td"]}>0</td>
                    </tr>
                    <tr className={`${totalSalesStyles['table-tr']} ${totalSalesStyles['table-even-row']}`}
                        // className={totalSalesStyles["table-tr"]}
                    >
                        <td className={totalSalesStyles["table-td"]}></td>
                        <td className={totalSalesStyles["table-td"]}>Total</td>
                        <td className={totalSalesStyles["table-td"]}>100</td>
                        <td className={totalSalesStyles["table-td"]}>7</td>
                    </tr>
                    </tbody>
                </table>

            </div>
            </div>
            <div className={totalSalesStyles['admin__section-container']}>

                <div className={totalSalesStyles['admin__chart-container']}>
                    <LineChart/>
                </div>
            </div>
        </div>
    )
}

export default TotalSales;
