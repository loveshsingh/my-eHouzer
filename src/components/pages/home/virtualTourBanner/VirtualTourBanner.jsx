import * as React from 'react'
import BannerStyle from "./VirtualTourBanner.module.css"
import bannerImage from "../../../../public/images/banner_2.png";
import Image from "next/image";

/**
 * @author Lovesh Singh.
 * @since 10-12-2022.
 * @description to render Navbar.
 * @return {JSX.Element}
 */
const VirtualTourBanner = ({bannerText, bannerDesc}) => {
    return (

        <div className={BannerStyle["banner"]}>

            <div className={BannerStyle["banner__details-wrapper"]}>
                <h1 className={BannerStyle["banner__main-heading"]}>How we work</h1>
                <h2 className={BannerStyle["banner__heading"]}>Virtual Tour and Visits</h2>

                <p className={BannerStyle["banner__desc"]}>Lorem ipsum dolor sit amte, consectetur adipsicing elit.</p>
                <p className={BannerStyle["banner__desc"]}>Lorem ipusm doloe sit amet, consecture adispicing elit.</p>
                <p className={BannerStyle["banner__desc"]}>Lorem ipusm doloe sit amet, consecture adispicing elit.</p>
                <p className={BannerStyle["banner__desc"]}>Lorem ipusm doloe sit amet, consecture adispicing <br/> elit.
                </p>

            </div>

            <Image src={bannerImage} alt={"text"} className={BannerStyle["banner__image"]}/>


        </div>
    )
}

export default VirtualTourBanner;
