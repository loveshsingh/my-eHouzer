import React from "react";
import AppToggleSwitchStyle from "../../styles/libComponentsStyles/AppToggleSwitch.module.css"

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @constructor
 * @description custom Toggle Switch Component.
 * @since 17-01-2023
 */
const AppToggleSwitch = ({name}) => {


    return (
        <div className={AppToggleSwitchStyle["toggle-switch"]}>
            <input
                type="checkbox"
                className={AppToggleSwitchStyle["toggle-switch-checkbox"]}
                name={name}
                id={name}
            />
            <label className={AppToggleSwitchStyle["toggle-switch-label"]} htmlFor={name}>
                <span className={AppToggleSwitchStyle["toggle-switch-inner"]}/>
                <span className={AppToggleSwitchStyle["toggle-switch-switch"]}/>
            </label>
        </div>
    )
}

export default AppToggleSwitch
