import React, {useEffect, useState} from "react";
import SelectedPropertyTypesStyle
    from "../../../../styles/componentStyles/dropdownStyles/SelectedPropertyTypes.module.css"
import {useDispatch, useSelector} from "react-redux";
import {setSearchFilters} from "../../../../actions/search";
import {AppColors} from "../../../../public/AppColors";
import AppIcon from "../../../lib/AppIcon/AppIcon";

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @constructor
 * @description Selected Property types Component.
 * @since 06-02-2023
 */
const SelectedPropertyTypes = () => {

    const selectedPropertyTypes = useSelector(((state) => state.searchReducer.searchFilters?.type))

    return (
        <div className={selectedPropertyTypes.length > 0 ? SelectedPropertyTypesStyle["selected-property-types"] : SelectedPropertyTypesStyle["selected-property-hide"]}>
            {selectedPropertyTypes.length > 0 && selectedPropertyTypes.map((type,index) => {
                return <SelectedPropertyType key={index} type={type} active={true}/>
            })}

        </div>
    )
}

const SelectedPropertyType = ({type, active}) => {

    const searchFilters = useSelector(((state) => state.searchReducer.searchFilters))
    const selectedPropertyTypes = useSelector(((state) => state.searchReducer.searchFilters?.type))
    const dispatch = useDispatch();

    const onPressSelectedPropertyType = () => {
        const oldType = selectedPropertyTypes;
        let updatedType = oldType ? [...oldType] : [];
        if (type && updatedType.length < 2) {
            if (!updatedType.includes(type)) {
                updatedType.push(type);
            } else {
                updatedType = updatedType.filter((typeValue) => typeValue !== type);
            }
        } else if (updatedType.includes(type)) {
            updatedType = updatedType.filter((typeValue) => typeValue !== type);
        }

        dispatch(setSearchFilters({...searchFilters, type: updatedType}))

    }

    return (
        <div
            className={SelectedPropertyTypesStyle[active ? "property-type-dropdown__type-wrapper--active" : "property-type-dropdown__type-wrapper"]}
            onClick={() => onPressSelectedPropertyType()}>
            <p className={SelectedPropertyTypesStyle["selected-property-types__text"]}>{type}</p>
            <AppIcon name={active ? 'material-symbols:close-rounded' : ''}
                     color={AppColors.roseGold} size={20} style={{cursor: 'pointer'}}/>
        </div>
    )
}

export default SelectedPropertyTypes
