import React, {useState} from "react";
import CheckOutsideClick from "../../base/CheckOutsideClick";
import {AppColors} from "../../public/AppColors";
import AppIcon from "./AppIcon/AppIcon";
import {useApp} from "../../base/contexts/AppProvider";

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @constructor
 * @description custom Dropdown Component.
 * @since 10-12-2022
 */
const AppDropdown = ({
                         name,
                         selectedName = "",
                         nameStyle,
                         toShowSelectRange = false,
                         selectedNameStyle = undefined,
                         icon,
                         iconStyle,
                         dropdownComponent,
                         dropdownComponentStyle,
                         selectedDropdownComponent,
                         selectedDropdownComponentStyle,
                     }) => {

    const app = useApp();
    const [show, setShow] = useState(false)
    const [showSelectedDropdown, setShowSelectedDropdown] = useState(false)

    const onClick = () => {
        setShow(!show)
    }

    return (
        <>
            <div style={{
                position: "relative",
                display: 'flex',
                height: "fit-content",
                alignItems: "center",
                cursor: "pointer",
                width: "100%"
            }}>
                {selectedName ? <p className={selectedNameStyle} onClick={() => {
                        setShowSelectedDropdown(!showSelectedDropdown)
                        setShow(false)
                    }}>{app.isMobile ? selectedName : selectedName?.substring(0, 5) + '...'}</p> :
                    <p className={nameStyle} onClick={() => onClick()}>{name}</p>}


                {toShowSelectRange ?
                    <AppIcon name={icon} onClick={() => {
                        setShowSelectedDropdown(!showSelectedDropdown)
                        setShow(false)
                    }}
                             color={AppColors.sonicSilver} size={20}/>
                    :
                    <AppIcon name={icon} onClick={() => onClick()}
                             color={AppColors.sonicSilver} size={20}/>
                }

            </div>
            <CheckOutsideClick onClickOutside={() => {
                setShow(show)
            }}>

                {show ? <div style={dropdownComponentStyle}>
                    {dropdownComponent}
                </div> : null}
            </CheckOutsideClick>
            <CheckOutsideClick onClickOutside={() => {
                setShowSelectedDropdown(showSelectedDropdown)
            }}>
                <div style={{...dropdownComponentStyle, ...{display: showSelectedDropdown ? "block" : "none"}}}>
                    {selectedDropdownComponent}
                </div>
            </CheckOutsideClick>
        </>
    )
}

export default AppDropdown
