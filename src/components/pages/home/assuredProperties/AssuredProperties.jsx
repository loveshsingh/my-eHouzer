import * as React from 'react'
import AssuredPropertiesStyle from "./AssuredProperties.module.css";
import PropertiesCarouselWithHeading from "../propertiesCarouselWithHeading/PropertiesCarouselWithHeading";
import PropertiesCarousel from "../propertiesCarousel/PropertiesCarousel";
import {useSelector} from "react-redux";
import {StringConstants} from "../../../../constants/StringConstants";

/**
 * @author Lovesh Singh.
 * @since 19-12-2022.
 * @description to render top developer tab.
 * @return {JSX.Element}
 */
const AssuredProperties = () => {
    const assuredProperties = useSelector((state) => state.homeReducer?.assuredProperties)

    return (
        <div className={AssuredPropertiesStyle["assured-properties"]}>
            <PropertiesCarouselWithHeading condition={"assured"} tabHeading={StringConstants.EHouzerAssured + " Properties"}/>
            <PropertiesCarousel propertiesData={assuredProperties} carouselName={"assured"}/>
        </div>
    )
}

export default AssuredProperties;
