import React, {useEffect, useState} from "react";
import AppUserNotLoggedInDialogStyle from "./AppUserNotLoggedInDialog.module.css";
import AppRoundButton from "../AppRoundButton";

const AppUserNotLoggedInDialog = ({onClickGoToSignIn,onClose}) => {


    return (
        <div className={AppUserNotLoggedInDialogStyle["userNotLoggedInDialog-container"]}>
            <div className={AppUserNotLoggedInDialogStyle["userNotLoggedInDialog-wrapper"]}>
                <h2>You are not Logged In</h2>
                <div className={`material-symbols-rounded ${AppUserNotLoggedInDialogStyle['userNotLoggedInDialog-close-icon']}`}
                    onClick={()=>onClose()}>
                           Close
                       </div>
                <p>Please login first, to continue Book a Visit !!</p>
                <AppRoundButton buttonText={"Go to Sign In"}
                                buttonStyle={AppUserNotLoggedInDialogStyle["userNotLoggedInDialog-proceed-button"]}
                                type={"primary"} onClick={() => {
                    onClickGoToSignIn()
                }}/>
            </div>
        </div>

    )
}

export default AppUserNotLoggedInDialog