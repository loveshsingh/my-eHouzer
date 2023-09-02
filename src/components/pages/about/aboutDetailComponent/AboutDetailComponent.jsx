import * as React from 'react'
import AboutDetailComponentStyle from "./AboutDetailComponent.module.css";
import Image from "next/image";
import {StringConstants} from "../../../../constants/StringConstants";

/**
 * @author Lovesh Singh.
 * @since 19-12-2022.
 * @description to render top developer tab.
 * @return {JSX.Element}
 */
const AboutDetailComponent = ({heading, desc, image}) => {

    return (
        <div className={AboutDetailComponentStyle["about-detail"]}>
            <div className={AboutDetailComponentStyle["about-detail__wrapper"]}>
                <h1 className={AboutDetailComponentStyle["about-detail__heading"]}>{heading}</h1>
                <p className={AboutDetailComponentStyle["about-detail__desc"]}>{desc}</p>
                <p className={AboutDetailComponentStyle["about-detail__desc"]}>{desc}</p>
            </div>
            <Image alt={StringConstants.AboutDetailImageText} src={image}
                   className={AboutDetailComponentStyle["about-detail__image"]}/>
            <h1 className={AboutDetailComponentStyle["about-detail__heading_mobile_fix"]}>{heading}</h1>
        </div>
    )
}

export default AboutDetailComponent;
