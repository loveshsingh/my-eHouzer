import * as React from 'react'
import PropertiesMapStyle from "./PropertiesMap.module.css";
import Map from "../../../lib/Map";

/**
 * @author Lovesh Singh.
 * @since 19-12-2022.
 * @description to render top developer tab.
 * @return {JSX.Element}
 */
const PropertiesMap = () => {
    const markers = [
        {
            title: "Metazone",
            lat: 28.3654697,
            lng: 77.3269767,
            icon: "http://maps.google.com/mapfiles/ms/icons/pink-dot.png"
        },
        {title: "Address2", lat: 27.5314, lng: 77.8446, icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"},
        {title: "Address3", lat: -33.5642, lng: 151.7769, icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
    ];
    return (
        <div className={PropertiesMapStyle["properties-map"]}>
            <h1 className={PropertiesMapStyle["properties-map__heading"]}>Find Properties Near You</h1>
            <Map markers={markers} style={{height: '70vh', width: '100%'}}/>
        </div>
    )
}

export default PropertiesMap;
