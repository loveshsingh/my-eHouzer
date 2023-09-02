import * as React from 'react'
import ServiceStyle from "./Service.module.css"
import {AppColors} from "../../../../public/AppColors";
import AppIcon from "../../../lib/AppIcon/AppIcon";

/**
 * @author Lovesh Singh.
 * @since 10-12-2022.
 * @description to render Navbar.
 * @return {JSX.Element}
 */
const Service = ({icon, serviceName}) => {
    return (
        <div className={ServiceStyle["service"]}>

            <div className={ServiceStyle["service__icon-wrapper"]}>
                <AppIcon name={icon}
                         color={AppColors.white} size={30}/>
            </div>

            <p className={ServiceStyle["service__text"]}>{serviceName}</p>
        </div>
    )
}

export default Service;
