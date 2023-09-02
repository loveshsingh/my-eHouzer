import React from "react";
import AppAccountTypeToggleSwitchToggleSwitchStyle from "../../styles/libComponentsStyles/AppAccountTypeToggleSwitch.module.css"
// import AppAccountTypeToggleSwitch from "./AppAccountTypeToggleSwitch";
const AccountTypeToggleSwitch = ({ accountType, handleChange }) => {
    return (
        <div className={AppAccountTypeToggleSwitchToggleSwitchStyle["toggle-switch"]}>
            <input
                type="checkbox"
                className={AppAccountTypeToggleSwitchToggleSwitchStyle["toggle-switch-checkbox"]}
                name="accountType"
                id="accountType"
                checked={accountType !== "savings"}
                onChange={handleChange}
            />
            <label className={AppAccountTypeToggleSwitchToggleSwitchStyle["toggle-switch-label"]} htmlFor="accountType">
                                            <span className={AppAccountTypeToggleSwitchToggleSwitchStyle["toggle-switch-inner"]}>
                                                {/*{accountType === "savings" ? "Saving" : "Current"} Account*/}
                                            </span>
                <span className={AppAccountTypeToggleSwitchToggleSwitchStyle["toggle-switch-switch"]} />
            </label>
        </div>
    );
};

export default AccountTypeToggleSwitch;