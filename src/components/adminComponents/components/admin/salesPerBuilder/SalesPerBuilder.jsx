import React from "react";
import salesPerBuilderStyles from "./SalesPerBuilder.module.css";
import PieChart from "../../charts/pie/PieChart";
import {ExcelDownloadService} from "../../../../../services/ExcelDownloadService";
import AppIcon from "../../../../lib/AppIcon/AppIcon";
import {AppColors} from "../../../../../public/AppColors";
import {AppContextValueType as app} from "../../../../../base/contexts/AppProvider";
import ceDashboardStyles from "../../../pages/ce/CEDashboard.module.css";

/**
 * @author Vikrant
 * @since 01-03-2023
 * @description to display sales builder table
 * @return {JSX.Element}
 * @constructor
 */
const SalesPerBuilder = () => {

    const handleDownloadExcel = () => {
        ExcelDownloadService.downloadBuilderSales()
    }

    return (
        <div className={salesPerBuilderStyles['admin__section-main-container']}>
            <div className={salesPerBuilderStyles['admin__section-heading-table-wrapper']}>
            <div className={salesPerBuilderStyles['admin__section-button-wrapper']}>
                <div className={salesPerBuilderStyles['admin__section-heading']}>
                    <h3 >Sales Per Builder last 6 months</h3>
                </div>
                <div className={salesPerBuilderStyles['excel--button-wrapper']}>
                  {/*  <AppIcon name={'vscode-icons:file-type-excel2'}
                             color={AppColors.sonicSilver} size={app?.isMobile ? 20 : 40}
                             style={{cursor: 'pointer'}} onClick={handleDownloadExcel}/> */}
                    <AppIcon name={'uiw:file-excel'}
                             color={AppColors.darkSpringGreen} size={app?.isMobile ? 15 : 30}
                             style={{cursor: 'pointer'}} onClick={handleDownloadExcel}/>
                </div>
            </div>
            <div className={salesPerBuilderStyles['table-wrapper']}>
                <table className={salesPerBuilderStyles["table"]}>
                    <thead className={salesPerBuilderStyles["table-thead"]}>
                    <tr className={salesPerBuilderStyles["table-heading-container"]}>
                        <th className={salesPerBuilderStyles["table-th"]}>Builder</th>
                        <th className={salesPerBuilderStyles["table-th"]}>Sales (cr)</th>
                        <th className={salesPerBuilderStyles["table-th"]}>Sales Unit</th>
                    </tr>
                    </thead>
                    <tbody style={{color:AppColors.tableRowTextColor}}>
                    <tr className={salesPerBuilderStyles["table-tr"]}>
                        <td className={salesPerBuilderStyles["table-td"]}>AKG</td>
                        <td className={salesPerBuilderStyles["table-td"]}>12</td>
                        <td className={salesPerBuilderStyles["table-td"]}>12</td>
                    </tr>
                    <tr className={`${salesPerBuilderStyles['table-tr']} ${salesPerBuilderStyles['table-even-row']}`}
                        // className={salesPerBuilderStyles["table-tr"]}
                        >
                        <td className={salesPerBuilderStyles["table-td"]}>VKG</td>
                        <td className={salesPerBuilderStyles["table-td"]}>5</td>
                        <td className={salesPerBuilderStyles["table-td"]}>12</td>
                    </tr>
                    <tr className={salesPerBuilderStyles["table-tr"]}>
                        <td className={salesPerBuilderStyles["table-td"]}>LODHA</td>
                        <td className={salesPerBuilderStyles["table-td"]}>25</td>
                        <td className={salesPerBuilderStyles["table-td"]}>12</td>
                    </tr>
                    <tr className={`${salesPerBuilderStyles['table-tr']} ${salesPerBuilderStyles['table-even-row']}`}
                        // className={salesPerBuilderStyles["table-tr"]}
                    >
                        <td className={salesPerBuilderStyles["table-td"]}>SRS</td>
                        <td className={salesPerBuilderStyles["table-td"]}>50</td>
                        <td className={salesPerBuilderStyles["table-td"]}>12</td>
                    </tr>
                    <tr className={salesPerBuilderStyles["table-tr"]}>
                        <td className={salesPerBuilderStyles["table-td"]}>KANAKIA</td>
                        <td className={salesPerBuilderStyles["table-td"]}>20</td>
                        <td className={salesPerBuilderStyles["table-td"]}>12</td>
                    </tr>
                    <tr className={`${salesPerBuilderStyles['table-tr']} ${salesPerBuilderStyles['table-even-row']}`}
                        // className={salesPerBuilderStyles["table-tr"]}
                    >
                        <td className={salesPerBuilderStyles["table-td"]}>Total</td>
                        <td className={salesPerBuilderStyles["table-td"]}>112</td>
                        <td className={salesPerBuilderStyles["table-td"]}>12</td>
                    </tr>
                    </tbody>
                </table>

            </div>
            </div>
            <div className={salesPerBuilderStyles['admin__section-container']}>

                <div className={salesPerBuilderStyles['admin__chart-container']}>
                    <PieChart/>
                </div>
            </div>
        </div>
    )
}

export default SalesPerBuilder;
