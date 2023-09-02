import * as React from 'react'
import AppRoundButton from "../../../lib/AppRoundButton";
import ProfileSettingsStyle from './ProfileSettings.module.css'
import ProfileSettingComponent from "../profileSettingComponent/ProfileSettingComponent";

/**
 * @author Lovesh Singh.
 * @since 10-01-2022.
 * @description to render profile settings.
 * @return {JSX.Element}
 */
const ProfileSettings = () => {

    return (
        <div className={ProfileSettingsStyle['profile-setting']}>
            <p className={ProfileSettingsStyle['profile-setting__main-heading']}>Notification Settings</p>
            <p className={ProfileSettingsStyle['profile-setting__main-desc']}>Select the kind of notifications you get
                about your activities and recommendations.</p>
            <ProfileSettingComponent heading={"Email notification"}
                                     desc={"Get emails to find what's going on when your are not online, you can turn these off."}/>
            <ProfileSettingComponent heading={"Email notification"}
                                     desc={"Get emails to find what's going on when your are not online, you can turn these off."}/>
            <ProfileSettingComponent heading={"Email notification"}
                                     desc={"Get emails to find what's going on when your are not online, you can turn these off."}/>
            <ProfileSettingComponent heading={"Email notification"}
                                     desc={"Get emails to find what's going on when your are not online, you can turn these off."}/>
            <div className={ProfileSettingsStyle['profile-setting-wrapper']}>
                <div className={ProfileSettingsStyle['profile-setting-details-container']}>
                    <p className={ProfileSettingsStyle['profile-setting__heading']}>Account Settings</p>
                    <p className={ProfileSettingsStyle['profile-setting__delete-heading']}>Delete Profile</p>
                    <p className={ProfileSettingsStyle['profile-setting__desc']}>This will delete your profile
                        permanently.</p>
                </div>

                <div className={ProfileSettingsStyle['profile-setting-button-container']}>
                    <AppRoundButton buttonText={"Delete Profile"}
                                    buttonStyle={ProfileSettingsStyle['profile-setting-delete-button']} type={"primary"}
                                    onClick={() => {
                                    }}/>
                </div>
            </div>
        </div>
    )
}


export default ProfileSettings;
