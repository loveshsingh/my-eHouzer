import React from "react";
import PropertyTypeFilterStyle from "../../styles/componentStyles/PropertyTypefilter.module.css";
import {AppColors} from "../../public/AppColors";
import AppIcon from "./AppIcon/AppIcon";

const PropertyTypeFilterButton = ({type, onClick, active}) => {

    // const [activePropertyType, setActivePropertyType] = useState(false)

    const onPressPropertyType = () => {
        // setActivePropertyType(!activePropertyType)
        onClick()
    }

    return (
        <div
            className={PropertyTypeFilterStyle[active ? "property-type-filter__type-wrapper--active" : "property-type-filter__type-wrapper"]}
            onClick={() => onPressPropertyType()}>
            <p className={PropertyTypeFilterStyle[active ? "property-type-filter__type-text--active" : "property-type-filter__type-text"]}>{type}</p>
            <AppIcon name={active ? 'material-symbols:close-rounded' : ''}
                     color={AppColors.jasper} size={18} style={{cursor: 'pointer', marginLeft: '0.5rem'}}/>
        </div>
    )
}

export default PropertyTypeFilterButton
