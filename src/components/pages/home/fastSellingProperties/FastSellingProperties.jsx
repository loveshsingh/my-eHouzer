import * as React from 'react'
import FastSellingPropertiesStyle from "./FastSellingProperties.module.css";
import PropertiesCarouselWithHeading from "../propertiesCarouselWithHeading/PropertiesCarouselWithHeading";
import PropertiesCarousel from "../propertiesCarousel/PropertiesCarousel";
import {useSelector} from "react-redux";

/**
 * @author Lovesh Singh.
 * @since 19-12-2022.
 * @description to render top developer tab.
 * @return {JSX.Element}
 */
const FastSellingProperties = () => {
    const fastSellingProperties = useSelector((state) => state.homeReducer?.fastSellingProperties)

    return (
        <div className={FastSellingPropertiesStyle["fast-selling-properties"]}>
            <PropertiesCarouselWithHeading condition={"fastSelling"} tabHeading={"Fast Selling Properties"}/>
            <PropertiesCarousel propertiesData={fastSellingProperties} carouselName={"fastSelling"}/>
        </div>
    )
}

export default FastSellingProperties;
