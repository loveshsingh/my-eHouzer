import React, {useEffect} from "react";
import propertyVariantPopupStyles from "./PropertyVariantPopup.module.css";
import {useDispatch, useSelector} from "react-redux";
import {
    displayDataForm,
    displayPropertyVariantTablePopupAction,
    fetchPropertyVariants,
    setPropertyVariants
} from "../../../../../../actions/adminActions";
import AppRoundButton from "../../../../../lib/AppRoundButton";
import AppIcon from "../../../../../lib/AppIcon/AppIcon";
import {AppColors} from "../../../../../../public/AppColors";
import {AppContextValueType as app} from "../../../../../../base/contexts/AppProvider";
import {ExcelDownloadService} from "../../../../../../services/ExcelDownloadService";
import {Role} from "../../../../constants/role";
import ceDashboardStyles from "../../CEDashboard.module.css";
import AppPagination from "../../../../../lib/AppPagination/AppPagination";
import custTableOnPopupStyles from "../../../builder/components/custTablePopup/CustTableOnPopup.module.css";

const PropertyVariantPopup = ({show, onClose}) => {

    const {userDetails} = useSelector((state) => state.authReducer);

    const {
        popupPropertyIdVariant,
        propertyVariants,
        propertyVariantsMetaData,
        propertyVariantsLoading
    } = useSelector((state) => state.adminReducer);
    const displayVariantPopup = show
    const dispatch = useDispatch();

    // const [variants, setVariants] = useState([]);

    useEffect(() => {
        if (displayVariantPopup) {
            dispatch(fetchPropertyVariants({propertyId: popupPropertyIdVariant, page: 1, perPage: 10}))
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [displayVariantPopup])

    /*
        useEffect(() => {
            setVariants(propertyVariants)
        }, [propertyVariants])
    */

    console.log("dp",propertyVariants)

    const onDisplayPopupHandle = () => {
        onClose()
        dispatch(displayPropertyVariantTablePopupAction({propertyId: ''}))
        dispatch(setPropertyVariants([]))
        document.body.style.overflow = 'unset';
    }

    const addVariant = () => {
        dispatch(displayDataForm({
            formToggle: true,
            show: true,
            buttonName: 'addPropertyVariant',
            data: {popupPropertyIdVariant}
        }))
    };

    const onUpdateVariant = (propertyVariant) => {
        dispatch(displayDataForm({
            formToggle: true,
            show: true,
            buttonName: 'updatePropertyVariant',
            data: {propertyVariant}
        }))
    };


    const handleDownloadExcel = () => {
        ExcelDownloadService.downloadPropertyVariants(popupPropertyIdVariant)
    }


    const onSelect = (data) => {
        const {page, perPage} = data
        dispatch(fetchPropertyVariants({propertyId: popupPropertyIdVariant, page: page, perPage: perPage}))
    }

    return (
        <div style={{display: displayVariantPopup ? 'flex' : 'none'}}
             className={propertyVariantPopupStyles['property_variant__popup-container']}>
            <div className={propertyVariantPopupStyles['property_variant__popup-content']}>
                <div className={propertyVariantPopupStyles['property_variant__popup-header']}>
                    <div className={propertyVariantPopupStyles['property_variant__popup-header-title']}>
                        <h3>Property Variants</h3>
                    </div>
                    <div className={propertyVariantPopupStyles['property_variant__popup-header-close']}
                         onClick={onDisplayPopupHandle}>
                       <span
                           className={`material-symbols-rounded ${propertyVariantPopupStyles['admin__sidebar-icons']}`}>
                           Close
                       </span>
                    </div>
                </div>
                <div className={propertyVariantPopupStyles["add__property-variant-send-button-wrapper"]}>
                    <div>
                        <AppRoundButton onClick={addVariant}
                                        buttonText={"Add Variant"}
                                        buttonStyle={propertyVariantPopupStyles["add__property-variant-send-button"]}
                                        type={"secondary"}
                        />
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
                <div className={propertyVariantPopupStyles['property_variant__table-wrapper']}>
                    <table className={propertyVariantPopupStyles['property_variant__table']}>
                        <thead>
                        <tr className={propertyVariantPopupStyles['property_variant__table-heading-container']}>
                            <th className={propertyVariantPopupStyles['property_variant__table-th']}>S. No.</th>
                            <th className={propertyVariantPopupStyles['property_variant__table-th']}>Name</th>
                            <th className={propertyVariantPopupStyles['property_variant__table-th']}>Area</th>
                            <th className={propertyVariantPopupStyles['property_variant__table-th']}>Bathroom Count</th>
                            <th className={propertyVariantPopupStyles['property_variant__table-th']}>Type</th>
                            <th className={propertyVariantPopupStyles['property_variant__table-th']}>Price</th>
                            <th className={propertyVariantPopupStyles['property_variant__table-th']}>Booking Amount</th>
                            <th className={propertyVariantPopupStyles['property_variant__table-th']}>Floor Plan</th>
                        </tr>
                        </thead>
                        <tbody style={{color:AppColors.tableRowTextColor}}>
                        {(!propertyVariantsLoading && propertyVariants?.length > 0) ? (
                            <>
                                {propertyVariants?.map((propertyVariant, i) => (
                                    <tr className={`${propertyVariantPopupStyles['property_variant__table-tr']} ${i % 2 !== 0 ? propertyVariantPopupStyles['property_variant__table-even-row'] : ''}`}
                                        onClick={() => onUpdateVariant(propertyVariant)} key={i}>
                                    {/*<tr className={propertyVariantPopupStyles['property_variant__table-tr']}*/}
                                    {/*    onClick={() => onUpdateVariant(propertyVariant)} key={i}>*/}
                                        <td className={propertyVariantPopupStyles['property_variant__table-td-center']}>{i + 1}</td>
                                        <td className={propertyVariantPopupStyles['property_variant__table-td']}>{propertyVariant?.name}</td>
                                        <td className={propertyVariantPopupStyles['property_variant__table-td']}>{propertyVariant?.area} sq.ft</td>
                                        <td className={propertyVariantPopupStyles['property_variant__table-td']}>{propertyVariant?.bathroomCount}</td>
                                        <td className={propertyVariantPopupStyles['property_variant__table-td']}>{propertyVariant?.type}</td>
                                        <td className={propertyVariantPopupStyles['property_variant__table-td']}>{propertyVariant?.price}</td>
                                        <td className={propertyVariantPopupStyles['property_variant__table-td']}>{propertyVariant?.bookingAmt}</td>
                                        <td className={propertyVariantPopupStyles['property_variant__table-td']}>{propertyVariant?.floorPlan}</td>
                                    </tr>
                                ))}
                            </>
                        ) : (!propertyVariantsLoading &&propertyVariants?.length === 0) ? (
                            <tr>
                                <td className={ceDashboardStyles['ce__table-td-no-data']} colSpan="8"
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
                <div style={{padding: "0 1rem 2rem 0"}}>
                    <AppPagination onSelect={onSelect} totalItems={propertyVariantsMetaData?.totalCount}/>
                </div>
            </div>

        </div>

    )
}

export default PropertyVariantPopup;
