import React, {useState} from "react";

const AppChooser = ({name, keyId, label, description, type, labelClassName, onChange, multiple}) => {
    function onClick() {
        document.getElementById(keyId)?.click();
    }

    return (
        <>
            <label htmlFor={keyId} style={{display: "block",paddingTop:"0.75rem"}}
                   className={labelClassName}
            >
                <button style={{padding: "0.1rem", fontSize: "14px"}} onClick={onClick}>{label}</button>
                 {description}

            </label>
            <input style={{display: "none"}} id={keyId} name={keyId} type={'file'}
                   multiple={multiple}
                   onChange={onChange}
            />
        </>
    )
}

export default AppChooser;