import React, {useState} from "react";
import contactStyle from "../../../styles/componentStyles/contactStyles/Contact.module.css";
import {getCountries, getCountryCallingCode} from "react-phone-number-input/input";
import AppIcon from "../AppIcon/AppIcon";
import {AppColors} from "../../../public/AppColors";
import CheckOutsideClick from "../../../base/CheckOutsideClick";

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @constructor
 * @description custom Dropdown Component.
 * @since 10-12-2022
 */
const AppCountryCodeSelector = ({textStyle}) => {

    const [countryName, setCountryName] = useState('IN');
    const [show, setShow] = useState(false);

    const onClick = () => {
        if (show) {
            setShow(false);
        } else {
            setShow(true);
        }
    }

    const regionNames = new Intl.DisplayNames(
        ['en'], {type: 'region'}
    );

    return (
        <>
            <CheckOutsideClick onClickOutside={() => {
                setShow(show)
            }}>
            <div style={{
                position: "relative",
                display: 'flex',
                height: "fit-content",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                width: "100%"
            }} onClick={() => onClick()}>
                <img style={{width: '1.2rem', height: '1.2rem', borderRadius: '100%'}} alt=""
                     src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryName}.svg`}/>
                <p style={textStyle}> +{getCountryCallingCode(countryName)} </p>
                <AppIcon name={show ? 'material-symbols:arrow-drop-up' : 'material-symbols:arrow-drop-down'}
                         color={AppColors.roseGold} size={22}/>
                    <div style={{
                        position: "absolute",
                        display: show ? "flex" : "none",
                        top: "2rem",
                        left: "0"
                    }}>
                        <ul className={contactStyle["country__list"]}>
                            {getCountries().map((country) => (
                                <li style={{cursor: "pointer"}} onClick={() => {
                                    setShow(!show)
                                    setCountryName(country)
                                }} className={contactStyle["country__list__item"]} key={country}>
                                    <img className={contactStyle["country__list_flag"]} alt=""
                                         src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}/>
                                    <a key={country}>
                                        {regionNames.of(country)} (+{getCountryCallingCode(country)})
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
            </div>
            </CheckOutsideClick>
        </>
    )
}

export default AppCountryCodeSelector
