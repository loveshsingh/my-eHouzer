import ceDashboardStyles from "../../pages/ce/CEDashboard.module.css";
import {BUILDER_COLUMN} from "../../constants/Constant";
import builderTableStyles from "./CEBuilderTable.module.css";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    buttonName,
    displayDataForm,
    displayPropertyVariantTablePopupAction,
    fetchBuilders,
    toggleForm,
    toggleShow
} from "../../../../actions/adminActions";
import AppRoundButton from "../../../lib/AppRoundButton";
import PropertyVariantPopup from "../../pages/ce/cePopupComponents/propertyVariantPopup/PropertyVariantPopup";
import AppModal from "../../../lib/AppModal/AppModal";
import AppIcon from "../../../lib/AppIcon/AppIcon";
import {AppColors} from "../../../../public/AppColors";
import {AppContextValueType as app} from "../../../../base/contexts/AppProvider";
import {ExcelDownloadService} from "../../../../services/ExcelDownloadService";
import {Role} from "../../constants/role";
import AppPagination from "../../../lib/AppPagination/AppPagination";
import customersListStyles from "./CustomerListTableComponent.module.css";

/**
 * @author Vikrant
 * @since 22-02-2023
 * @description to contain Builder dashboard
 * @return {JSX.Element}
 * @constructor
 */
const BuilderTableComponent = () => {

    const {builders, buildersListMetaData, buildersListLoading} = useSelector((state) => state.adminReducer);
    const {isLoggedIn, userDetails} = useSelector((state) => state.authReducer);
    const displayForm = useSelector((state) => state.adminReducer.formToggle);
    const show = useSelector((state) => state.adminReducer.show);
    const dispatch = useDispatch();

    const handleAddBuilderAgent = () => {
        dispatch(toggleShow(!show))
        dispatch(toggleForm(!displayForm))
        dispatch(buttonName('addbuilder'));
    };

    const handleAddProperty = () => {
        dispatch(toggleShow(!show))
        dispatch(toggleForm(!displayForm))
        dispatch(buttonName('addProperty'));
    };

    const [buildersData, setBuildersData] = useState(builders);

    useEffect(() => {
        setBuildersData(builders);
    }, [builders])

    const onUpdateDeveloper = (developer, profile) => {
        dispatch(displayDataForm({
            formToggle: true,
            show: true,
            buttonName: 'updateBuilder',
            data: {developer, profile}
        }))
    }

    const handleDownloadExcel = () => {
        ExcelDownloadService.downloadBuilders()
    }

    const onSelect = (data) => {
        const {page, perPage} = data
        dispatch(fetchBuilders(data))
    }

    return (
        <>
            <div className={ceDashboardStyles['ce__table-section-container']}>

                <div className={builderTableStyles['builder__heading-table-wrapper']}>
                <div className={ceDashboardStyles['ce__table-btn-wrapper']}>
                    <div className={ceDashboardStyles['ce__section-heading']}>
                        <h3>Builders List</h3>
                    </div>
                    <div style={{display:"flex"}}>
                        <div className={builderTableStyles['builder__table-btn-wrapper']}>
                            <div>
                                <AppRoundButton onClick={handleAddBuilderAgent} buttonText={"Add Builder"}
                                                buttonStyle={ceDashboardStyles["ce__table-send-button"]}
                                                type={"secondary"}/>
                            </div>

                            <div style={{marginLeft: '1rem'}}>
                                <AppRoundButton onClick={handleAddProperty} buttonText={"Add Property"}
                                                buttonStyle={ceDashboardStyles["ce__table-send-button"]}
                                                type={"secondary"}/>
                            </div>
                        </div>
                    <div>
                        {userDetails?.userRoleList[0].id === Role.ADMIN &&

                            <div className={ceDashboardStyles['excel--button-wrapper']}>

                                {/*<AppIcon name={'vscode-icons:file-type-excel2'}*/}
                                {/*         color={AppColors.sonicSilver} size={app?.isMobile ? 20 : 40}*/}
                                {/*         style={{cursor: 'pointer'}} onClick={handleDownloadExcel}/>*/}
                                <AppIcon name={'uiw:file-excel'}
                                         color={AppColors.darkSpringGreen} size={app?.isMobile ? 15 : 30}
                                         style={{cursor: 'pointer'}} onClick={handleDownloadExcel}/>
                            </div>
                        }
                    </div>
                    </div>
                </div>
                <div className={ceDashboardStyles['ce__table-wrapper']}>
                    <table className={builderTableStyles['builder__table']}>
                        <thead className={builderTableStyles['builder__table-thead']}>
                        <tr className={builderTableStyles['builder__table-heading-container']}>
                            {BUILDER_COLUMN.map((header, i) => (
                                <th key={i} className={builderTableStyles['builder__table-th']}>
                                    {header.name}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody style={{height: '200px', overflowY: 'scroll',color:AppColors.tableRowTextColor}}>
                        {(!buildersListLoading && buildersData.length > 0) ? (
                            <>
                                {buildersData?.map((builder, i) => (
                                    <>
                                        <tr className={`${builderTableStyles['builder__table-tr']} ${i % 2 !== 0 ? builderTableStyles['builder__table-tr-even-row'] : ''}`} key={i}>
                                        {/*<tr className={builderTableStyles['builder__table-tr']} key={i}>*/}
                                            <td className={builderTableStyles['builder__table-td-center']}
                                                onClick={() => onUpdateDeveloper(builder?.developer, builder?.userProfile)}>{i + 1}</td>
                                            <td className={builderTableStyles['builder__table-td']}
                                                onClick={() => onUpdateDeveloper(builder?.developer, builder?.userProfile)}>{builder?.developer?.developerName}</td>
                                            <td className={builderTableStyles['builder__table-td']}
                                                onClick={() => onUpdateDeveloper(builder?.developer, builder?.userProfile)}>{builder?.developer?.developerGroup}</td>

                                            <td className={builderTableStyles['builder__table-td-colspan']} colSpan={6}>
                                                <BuilderProperties properties={builder?.properties}
                                                                   developer={builder?.developer}/>
                                            </td>
                                        </tr>
                                    </>
                                ))}
                            </>
                        ) : (!buildersListLoading && buildersData?.length === 0) ? (
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
                    <AppPagination onSelect={onSelect} totalItems={buildersListMetaData?.totalCount}/>
                </div>

            </div>
        </>
    )
}

const BuilderProperties = ({properties, developer}) => {

    const [builderProperties, setBuilderProperties] = useState(properties);

    useEffect(() => {
        setBuilderProperties(properties);
    }, [properties])

    return (
        <>
            {builderProperties?.map((property, i) => (
                <BuilderProperty property={property} developer={developer} key={i}/>
            ))}
        </>
    )
}


const BuilderProperty = ({property, developer}) => {

    const dispatch = useDispatch();
    const [showPropertyVariantPopup, setShowPropertyVariantPopup] = useState(false)

    const onUpdateProperty = (property, developer) => {
        dispatch(displayDataForm({
            formToggle: true,
            show: true,
            buttonName: 'updateProperty',
            data: {property: property, developer: developer}
        }))
    };

    const onViewVariants = (propertyId) => {
        //console.log("property-id",propertyId)
        setShowPropertyVariantPopup(!showPropertyVariantPopup)
        dispatch(displayPropertyVariantTablePopupAction({propertyId}))
    }
    /**
     * @author Vipul Garg
     * @since 04-11-2023
     * @description to close the Property Variant Popup
     */
    const onClickClosePropertyVariantPopup = () => {
        setShowPropertyVariantPopup(!showPropertyVariantPopup)
    };

    return (
        <>
            <AppModal
                onClose={onClickClosePropertyVariantPopup}
                show={showPropertyVariantPopup}
            >
                <PropertyVariantPopup show={showPropertyVariantPopup} onClose={onClickClosePropertyVariantPopup}/>
            </AppModal>

            <table className={builderTableStyles['builder__property-table']}>
                <tbody>
                <tr className={builderTableStyles['builder__table-tr']}>
                    <td className={builderTableStyles['builder__table-td']}
                        onClick={() => onUpdateProperty(property, developer)}>{property?.name}</td>
                    <td className={builderTableStyles['builder__table-td']}
                        onClick={() => onUpdateProperty(property, developer)}>{property?.area}</td>
                    <td className={builderTableStyles['builder__table-td']}
                        onClick={() => onUpdateProperty(property, developer)}>{property?.city}</td>
                    <td className={builderTableStyles['builder__table-td']}>
                        <AppRoundButton onClick={() => onViewVariants(property?.id)} buttonText={"view Variants"}
                                        buttonStyle={ceDashboardStyles["ce__table-send-button"]}
                                        type={"secondary"}/>
                    </td>
                    <td className={builderTableStyles['builder__table-td']}>{}</td>
                    <td className={builderTableStyles['builder__table-td']}>{}</td>
                </tr>
                </tbody>
            </table>
        </>
    )
}


export default BuilderTableComponent;
