import React, {useEffect, useState} from "react";
import menuDropdownStyles from "../../../../styles/componentStyles/navbarComponentsStyles/MenuDropdown.module.css"
import Link from "next/link";
import CheckOutsideClick from "../../../../base/CheckOutsideClick";
import {AppColors} from "../../../../public/AppColors";
import AppIcon from "../../../lib/AppIcon/AppIcon";

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @constructor
 * @description Menu Dropdown Component.
 * @since 10-01-2023
 */
const MenuDropdown = () => {

    const [show, setShow] = useState(false)

    useEffect(() => {
        // add event listener to toggle body overflow when dropdown is shown/hidden
        if (show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }

        // cleanup function to remove event listener
        return () => {
            document.body.style.overflow = "visible";
        };
    }, [show]);

    const onClick = () => {
        setShow(!show)
    }

    return (
        <>
            <div className={menuDropdownStyles["menu"]}>
                <AppIcon name={'material-symbols:menu-rounded'}
                         color={AppColors.roseWood} size={24} style={{
                    cursor: 'pointer'
                }} onClick={() => onClick()}/>

                <CheckOutsideClick onClickOutside={() => {
                    setShow(show)
                }}>
                    <div
                        className={show ? menuDropdownStyles["menu__dropdown--show"] : menuDropdownStyles["menu__dropdown--hide"]}>

                        <AppIcon name={'material-symbols:close-rounded'}
                                 color={AppColors.roseGold}
                                 size={22}
                                 style={{
                                     position: 'absolute',
                                     right: '1rem', cursor: 'pointer'
                                 }}
                                 onClick={() => onClick()}/>

                        <ul className={menuDropdownStyles["menu__dropdown-list-container"]}>
                            <Link href={"/about"} onClick={() => onClick()}>
                                <li className={menuDropdownStyles["menu__dropdown-list"]}>About Us</li>
                            </Link>
                            <Link href={"/blogs"} onClick={() => onClick()}>
                                <li className={menuDropdownStyles["menu__dropdown-list"]}>Blogs and Press Mentions</li>
                            </Link>
                            <Link href={"/contact"} onClick={() => onClick()}>
                                <li className={menuDropdownStyles["menu__dropdown-list"]}>Contact Us</li>
                            </Link>
                            <Link href={"/services"} onClick={() => onClick()}>
                                <li className={menuDropdownStyles["menu__dropdown-list"]}>Services</li>
                            </Link>
                        </ul>
                    </div>
                </CheckOutsideClick>
            </div>
        </>
    )
}


export default MenuDropdown
