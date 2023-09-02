import * as React from 'react'
import ProfileSettingComponentStyle from './ProfileSettingComponent.module.css'
import AppToggleSwitch from "../../../lib/AppToggleSwitch";

/**
 * @author Lovesh Singh.
 * @since 10-01-2022.
 * @description to render profile settings.
 * @return {JSX.Element}
 */
const ProfileSettingComponent = ({heading, desc}) => {

    return (
        <div className={ProfileSettingComponentStyle['profile-setting']}>
            <div className={ProfileSettingComponentStyle['profile-setting__heading-container']}>
                <p className={ProfileSettingComponentStyle['profile-setting__heading']}>{heading}</p>
                <p className={ProfileSettingComponentStyle['profile-setting__desc']}>{desc}</p>
            </div>
            <div className={ProfileSettingComponentStyle['setting-wrapper']}>
                <SettingComponent heading={"News and updates"}
                                  desc={"Get emails to find what's going on when your are not online, you can turn these off."}/>
                <SettingComponent heading={"News and updates"}
                                  desc={"Get emails to find what's going on when your are not online, you can turn these off."}/>
                <SettingComponent heading={"News and updates"}
                                  desc={"Get emails to find what's going on when your are not online, you can turn these off."}/>
                <SettingComponent heading={"News and updates"}
                                  desc={"Get emails to find what's going on when your are not online, you can turn these off."}/>
            </div>
        </div>
    )
}

const SettingComponent = ({heading, desc}) => {
    return (
        <div className={ProfileSettingComponentStyle['setting']}>
            <div className={ProfileSettingComponentStyle['']}>
                {/*<input className={ProfileSettingComponentStyle['setting__input']} type={"checkbox"}/>*/}
                <AppToggleSwitch name={"Yes"}/>
            </div>
            <div className={ProfileSettingComponentStyle['setting__heading-container']}>
                <p className={ProfileSettingComponentStyle['setting__heading']}>{heading}</p>
                <p className={ProfileSettingComponentStyle['setting__desc']}>{desc}</p>
            </div>
        </div>
    )
}


export default ProfileSettingComponent;
