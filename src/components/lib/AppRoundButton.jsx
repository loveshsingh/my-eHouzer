import React, {useEffect, useState} from "react";
import AppRoundButtonStyle from "../../styles/libComponentsStyles/AppRoundButton.module.css"

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @constructor
 * @description custom round button Component.
 * @since 12-12-2022
 */
const AppRoundButton = ({buttonText, buttonStyle, type = "primary", onClick}) => {

    const [buttonType, setButtonType] = useState(type);

    useEffect(() => {
        setButtonType(type)
    }, [type])

    return (
        <button onClick={(e) => onClick(e)}
                className={`${buttonStyle} ${buttonType === "primary" ? AppRoundButtonStyle["button--primary"] : AppRoundButtonStyle["button--secondary"]}`}>
            {buttonText}
        </button>
    )
}

export default AppRoundButton
