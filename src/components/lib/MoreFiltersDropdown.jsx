import React, {useState} from "react";
import PropertyFilterDropdown from "../pages/home/dropdowns/PropertyFilterDropdown";
import CheckOutsideClick from "../../base/CheckOutsideClick";
import FiltersDropdownStyle from "./MoreFiltersDropdown.module.css"
import {AppColors} from "../../public/AppColors";
import AppIcon from "./AppIcon/AppIcon";

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @constructor
 * @description custom Dropdown Component.
 * @since 10-12-2022
 */
const MoreFiltersDropdown = ({name, nameStyle, icon, iconStyle,display}) => {

    const [show, setShow] = useState(false)

    const onClick = () => {
        setShow(!show)
    }

    return (
        <>
            <div style={{
                position: "relative",
                // display: 'flex',
                display: display===false ? "none" : "flex",
                height: "fit-content",
                alignItems: "center",
                cursor: "pointer",
                // marginLeft: "auto";
                marginLeft: "10px"
            }}
            >
                <p onClick={() => onClick()} className={nameStyle}>{name}</p>
                <AppIcon name={icon}
                         color={AppColors.jasper} size={20} style={iconStyle}/>

                <CheckOutsideClick onClickOutside={() => {
                    setShow(show)
                }}>
                    {show ? <div className={FiltersDropdownStyle["filters-dropdown"]}>
                        <PropertyFilterDropdown handleClick={() => onClick()}/>
                    </div> : null}
                </CheckOutsideClick>
            </div>

        </>
    )
}

export default MoreFiltersDropdown
