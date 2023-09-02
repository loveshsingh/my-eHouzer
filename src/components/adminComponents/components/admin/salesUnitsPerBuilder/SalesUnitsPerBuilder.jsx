import React from "react";
import salesUnitsPerBuilderStyles from "./SalesUnitsPerBuilder.module.css";
import BarChart from "../../charts/bar/BarChart";
import {ExcelDownloadService} from "../../../../../services/ExcelDownloadService";
import AppIcon from "../../../../lib/AppIcon/AppIcon";
import {AppColors} from "../../../../../public/AppColors";
import {AppContextValueType as app} from "../../../../../base/contexts/AppProvider";

/**
 * @author Vikrant
 * @since 01-03-2023
 * @description to handle sales units per builder
 * @return {JSX.Element}
 * @constructor
 */
const SalesUnitsPerBuilder = () => {

    const handleDownloadExcel = () => {
        ExcelDownloadService.downloadBuilderSalesUnit()
    }

    return (
        <div style={{display:"flex"}}>
            <div className={salesUnitsPerBuilderStyles['admin__section-heading-table-wrapper']}>
            <div className={salesUnitsPerBuilderStyles['admin__section-button-wrapper']}>
                <div className={salesUnitsPerBuilderStyles['admin__section-heading']}>
                    <h3 style={{fontSize:"23px"}}>Sales units per Builder over period</h3>
                </div>
                <div className={salesUnitsPerBuilderStyles['excel--button-wrapper']}>
                    <AppIcon name={'vscode-icons:file-type-excel2'}
                             color={AppColors.sonicSilver} size={app?.isMobile ? 20 : 40}
                             style={{cursor: 'pointer'}} onClick={handleDownloadExcel}/>
                </div>

            </div>
            <div className={salesUnitsPerBuilderStyles['table-wrapper']}>
                <table className={salesUnitsPerBuilderStyles["table"]}>
                    <thead>
                    <tr className={salesUnitsPerBuilderStyles["table-heading-container"]}>
                        <th className={salesUnitsPerBuilderStyles["table-th"]}>Builder</th>
                        <th className={salesUnitsPerBuilderStyles["table-th"]}>Sales Unit</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className={salesUnitsPerBuilderStyles["table-tr"]}>
                        <td className={salesUnitsPerBuilderStyles["table-td"]}>AKG</td>
                        <td className={salesUnitsPerBuilderStyles["table-td"]}>1</td>
                    </tr>
                    <tr className={salesUnitsPerBuilderStyles["table-tr"]}>
                        <td className={salesUnitsPerBuilderStyles["table-td"]}>VKG</td>
                        <td className={salesUnitsPerBuilderStyles["table-td"]}>3</td>
                    </tr>
                    <tr className={salesUnitsPerBuilderStyles["table-tr"]}>
                        <td className={salesUnitsPerBuilderStyles["table-td"]}>SRS</td>
                        <td className={salesUnitsPerBuilderStyles["table-td"]}>2</td>
                    </tr>
                    <tr className={salesUnitsPerBuilderStyles["table-tr"]}>
                        <td className={salesUnitsPerBuilderStyles["table-td"]}>LODHA</td>
                        <td className={salesUnitsPerBuilderStyles["table-td"]}>0</td>
                    </tr>
                    <tr className={salesUnitsPerBuilderStyles["table-tr"]}>
                        <td className={salesUnitsPerBuilderStyles["table-td"]}>KANAKIA</td>
                        <td className={salesUnitsPerBuilderStyles["table-td"]}>1</td>
                    </tr>
                    <tr className={salesUnitsPerBuilderStyles["table-tr"]}>
                        <td className={salesUnitsPerBuilderStyles["table-td"]}>Total</td>
                        <td className={salesUnitsPerBuilderStyles["table-td"]}>7</td>
                    </tr>
                    </tbody>
                </table>

            </div>
            </div>
            <div className={salesUnitsPerBuilderStyles['admin__section-container']}>
                <div className={salesUnitsPerBuilderStyles['admin__chart-container']}>
                    <BarChart/>
                </div>
            </div>
        </div>
    )
}

export default SalesUnitsPerBuilder;
