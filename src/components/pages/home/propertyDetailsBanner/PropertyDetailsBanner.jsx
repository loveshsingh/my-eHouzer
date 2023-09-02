import * as React from 'react'
import BannerStyle from "./PropertyDetailsBanner.module.css"
import bannerImage from "../../../../public/images/banner_2.png";
import Image from "next/image";

/**
 * @author Lovesh Singh.
 * @since 10-12-2022.
 * @description to render Navbar.
 * @return {JSX.Element}
 */
const PropertyDetailsBanner = ({bannerText, bannerDesc}) => {
    return (

        <div className={BannerStyle["banner"]}>

            <div className={BannerStyle["banner__details-wrapper"]}>

                <PropertyDetailComponent heading={"3,68,000 + sq.ft."} subHeading={"Residential inventory"}
                                         desc={"Best end to end property listing site"}/>

                <PropertyDetailComponent heading={"1,000 +"} subHeading={"Verified projects"}
                                         desc={"From top developers"}/>

                <PropertyDetailComponent heading={"10,000 +"} subHeading={"Customers"}
                                         desc={"Touched every day"}/>
            </div>

            <Image src={bannerImage} alt={"text"} className={BannerStyle["banner__image"]}/>

        </div>
    )
}

const PropertyDetailComponent = ({heading, subHeading, desc}) => {
    return (
        <div>
            <h1 className={BannerStyle["property-details__heading"]}>{heading}</h1>
            <h3 className={BannerStyle["property-details__sub-heading"]}>{subHeading}</h3>
            <p className={BannerStyle["property-details__desc"]}>{desc}</p>
        </div>
    )
}

export default PropertyDetailsBanner;
