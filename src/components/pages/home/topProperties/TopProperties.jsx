import * as React from 'react'
import TopPropertiesStyle from "./TopProperties.module.css";
import PropertiesCarouselWithHeading from "../propertiesCarouselWithHeading/PropertiesCarouselWithHeading";
import PropertiesCarousel from "../propertiesCarousel/PropertiesCarousel";
import {useSelector} from "react-redux";

/**
 * @author Lovesh Singh.
 * @since 19-12-2022.
 * @description to render top developer tab.
 * @return {JSX.Element}
 */
const TopProperties = () => {
    const topProperties = useSelector((state) => state.homeReducer.topProperties)
    return (
        <div className={TopPropertiesStyle["top-properties"]}>
            <PropertiesCarouselWithHeading condition={"top"} tabHeading={"Top Properties"}/>
            <PropertiesCarousel propertiesData={topProperties} carouselName={"topProperties"}/>
        </div>
    )
}

export default TopProperties
