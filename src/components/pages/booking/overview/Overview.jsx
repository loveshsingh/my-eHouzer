import * as React from 'react'
import {useEffect, useState} from 'react'
import OverviewStyle from "./Overview.module.css";
import {useSelector} from "react-redux";
import {StringConstants} from "../../../../constants/StringConstants";

/**
 * @author Lovesh Singh.
 * @since 19-12-2022.
 * @description to render top developer tab.
 * @return {JSX.Element}
 */
const Overview = ({overviewRef}) => {

    const property = useSelector((state) => state.bookingReducer?.property)

    const [highLightsLength, setHighLightsLength] = useState(0)

    useEffect(() => {
        setHighLightsLength(highLightsLength)
    }, [highLightsLength]);

    useEffect(() => {
        if (property && property.highlights) {
            setHighLightsLength(property.highlights.length)
        }
    }, [property]);

    return (
        <div className={OverviewStyle["overview"]} ref={overviewRef}>
            <h1 className={OverviewStyle["overview__heading"]}>Overview</h1>
            <p className={OverviewStyle["overview__rera"]}>RERA {property?.reraId?.map((id) => {
                return <span>{id} </span>
            })}</p>
            <div className={OverviewStyle["overview__details-wrapper"]}>
                <OverviewDetail heading={property.minReraCarpetArea + "-" + property.maxReraCarpetArea + " sq. ft."}
                                subHeading={"Rera Carpet Area"}/>
                <OverviewDetail heading={"Mar, 2024"} subHeading={property.status}/>
                <OverviewDetail heading={property.avgPriceSqFt + "/sq.ft."} subHeading={"Avg. Price"}/>
            </div>
            <h1 className={OverviewStyle["overview__highlight-text"]}>Highlights</h1>
            {/*highLightsLength > 0 &&*/}
            {property && property.highlights && property.highlights.map((highlight) => {
                return (<p key={highlight} className={OverviewStyle["overview__highlight-desc"]}>{highlight}</p>)
            })}

            {/* <p className={OverviewStyle["overview__highlight-desc"]}>{property.highlights}</p>
            <p className={OverviewStyle["overview__highlight-desc"]}>Lorem ipsum dolor sit amet consetetur, est ac
                poritor eli neque in
                ac erat justo vulputate. Ut quis diam
                feugita adipcing at elita elget scelarisque doec Feuigia at elmentum viverra facuubs adipscing viteae
                etiam ame eu. Sit vauputate leo curabitur neque seuspendisse havitasse eget.</p>*/}
        </div>
    )
}

const OverviewDetail = ({heading, subHeading}) => {
    return (
        <div className={OverviewStyle["overview__detail-container"]}>
            <div className={OverviewStyle["overview__detail-leftBar"]}/>
            <div className={OverviewStyle["overview__detail"]}>
                <p className={OverviewStyle["overview__detail-heading"]}>{heading}</p>
                <p className={OverviewStyle["overview__detail-sub-heading"]}>{subHeading}</p>
            </div>
        </div>
    )
}

export default Overview;
