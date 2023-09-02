import React, {useEffect, useState} from "react";
import PropertyTypeDropdownStyle
    from "../../../../styles/componentStyles/dropdownStyles/PropertyTypeDropdown.module.css"
import {useDispatch, useSelector} from "react-redux";
import {setSearchFilters} from "../../../../actions/search";
import {CommercialPropertyTypes, ResidentialPropertyTypes} from "../../../../helper/Utility";
import {AppColors} from "../../../../public/AppColors";
import AppIcon from "../../../lib/AppIcon/AppIcon";

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @constructor
 * @description Property type Dropdown Component.
 * @since 10-12-2022
 */
const PropertyTypeDropdown = () => {
    const [showResidential, setShowResidential] = useState(false)
    const [showCommercial, setShowCommercial] = useState(false)
    const searchFilters = useSelector(((state) => state.searchReducer.searchFilters))
    const dispatch = useDispatch();
    const selectedPropertyTypes = useSelector(((state) => state.searchReducer.searchFilters?.type))

    useEffect(() => {
        setShowResidential(true)
    }, []);

    const onPressResidential = () => {
        setShowResidential(true)
        setShowCommercial(false)
    }

    const onPressCommercial = () => {
        setShowCommercial(true)
        setShowResidential(false)
    }

    return (
        <div className={PropertyTypeDropdownStyle["property-type-dropdown"]}>
            <div
                className={PropertyTypeDropdownStyle[showResidential ? "property-type-dropdown__residential--active" : "property-type-dropdown__residential"]}
                onClick={() => onPressResidential()}>
                <h1 className={PropertyTypeDropdownStyle["property-type-dropdown__residential-text"]}>Residential</h1>
                <AppIcon
                    name={showResidential ? 'material-symbols:keyboard-arrow-down-rounded' : 'material-symbols:add'}
                    size={22}/>
            </div>
            <ResidentialPropertyType show={showResidential}/>

            <div
                className={PropertyTypeDropdownStyle[showCommercial ? "property-type-dropdown__commercial--active" : "property-type-dropdown__commercial"]}
                onClick={() => onPressCommercial()}>
                <h1 className={PropertyTypeDropdownStyle["property-type-dropdown__commercial-text"]}>Commercial</h1>
                <AppIcon name={showCommercial ? 'material-symbols:keyboard-arrow-down-rounded' : 'material-symbols:add'}
                         size={22}/>
            </div>
            <CommercialPropertyType show={showCommercial}/>
        </div>
    )
}

const ResidentialPropertyType = ({show}) => {
    const dispatch = useDispatch();

    const searchFilters = useSelector(((state) => state.searchReducer.searchFilters))
    const selectedTypes = useSelector(((state) => state.searchReducer.searchFilters?.type))

    const onPressPropertyType = (value) => {
        const oldType = selectedTypes;
        let updatedType = oldType ? [...oldType] : [];
        if (value && updatedType.length < 2) {
            if (!updatedType.includes(value)) {
                updatedType.push(value);
            } else {
                updatedType = updatedType.filter((typeValue) => typeValue !== value);
            }
        } else if (updatedType.includes(value)) {
            updatedType = updatedType.filter((typeValue) => typeValue !== value);
        }


        dispatch(setSearchFilters({...searchFilters, type: updatedType}))


    }

    return (
        <div
            className={PropertyTypeDropdownStyle[show ? "property-type-dropdown__residential-wrapper--active" : "property-type-dropdown__residential-wrapper"]}>
            {
                ResidentialPropertyTypes.map((propertyType, index) => {
                    return (
                        <PropertyType key={index} type={propertyType?.name} typeValue={propertyType?.value}
                                      active={selectedTypes.includes(propertyType?.value)}
                                      onPress={onPressPropertyType}/>
                    )
                })
            }
        </div>
    )
}

const CommercialPropertyType = ({show}) => {
    const dispatch = useDispatch();

    const searchFilters = useSelector(((state) => state.searchReducer.searchFilters))
    const selectedTypes = useSelector(((state) => state.searchReducer.searchFilters?.type))

    const onPressPropertyType = (value) => {
        const oldType = selectedTypes;
        let updatedType = oldType ? [...oldType] : [];
        if (value && updatedType.length < 2) {
            if (!updatedType.includes(value)) {
                updatedType.push(value);
            } else {
                updatedType = updatedType.filter((typeValue) => typeValue !== value);
            }
        } else if (updatedType.includes(value)) {
            updatedType = updatedType.filter((typeValue) => typeValue !== value);
        }

        dispatch(setSearchFilters({...searchFilters, type: updatedType}))

    }

    return (
        <div
            className={PropertyTypeDropdownStyle[show ? "property-type-dropdown__commercial-wrapper--active" : "property-type-dropdown__commercial-wrapper"]}>
            {
                CommercialPropertyTypes.map((propertyType) => {
                    return (
                        <PropertyType key={propertyType?.name} type={propertyType?.name} typeValue={propertyType?.value}
                                      active={selectedTypes.includes(propertyType?.value)}
                                      onPress={onPressPropertyType}/>
                    )
                })
            }
        </div>
    )
}

const PropertyType = ({type, typeValue, active, onPress}) => {
    const onPressPropertyType = () => {
        onPress(typeValue)
    }

    return (
        <div
            className={PropertyTypeDropdownStyle[active ? "property-type-dropdown__type-wrapper--active" : "property-type-dropdown__type-wrapper"]}
            onClick={() => onPressPropertyType()}>
            <p className={PropertyTypeDropdownStyle["property-type-dropdown__type-text"]}>{type}</p>
            <AppIcon name={active ? 'material-symbols:close-rounded' : ''}
                     color={AppColors.jasper} style={{marginLeft: '0.5rem'}}/>
        </div>
    )
}

export default PropertyTypeDropdown
