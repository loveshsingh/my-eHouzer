import * as React from 'react'
import LocalityStyle from "./Locality.module.css";
import Map from "../../../lib/Map";

/**
 * @author Lovesh Singh.
 * @since 19-12-2022.
 * @description to render top developer tab.
 * @return {JSX.Element}
 */
const Locality = ({localityRef}) => {
    const markers = [
        {title: "Address2", lat: 27.5314, lng: 77.8446, icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
    ];
    return (
        <div className={LocalityStyle["locality"]} ref={localityRef}>
            <h1 className={LocalityStyle["locality__heading"]}>Locality</h1>
            <Map markers={markers} style={{height: '70vh', width: '100%'}} zoom={12} streetView={true}/>
        </div>
    )
}

export default Locality;
