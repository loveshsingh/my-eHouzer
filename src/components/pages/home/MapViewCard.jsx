import * as React from 'react'
import {useEffect, useState} from 'react'
import MapViewCardStyle from "../../../styles/componentStyles/MapViewCard.module.css"
import PropertySearchCard from "../search/propertySearchCard/PropertySearchCard";
import {useSelector} from "react-redux";
import {AppColors} from "../../../public/AppColors";
import AppIcon from "../../lib/AppIcon/AppIcon";
import PropertyListCard from "../search/propertySearchListCard/PropertyListCard";
import Map from "../../lib/Map";


/**
 * @author Lovesh Singh.
 * @since 10-12-2022.
 * @description to render Navbar.
 * @return {JSX.Element}
 */
const MapViewCard = ({mapImage, listView, shouldShowGrid}) => {
    const TAG = 'MapViewCard';
    const {properties} = useSelector((state) => state.searchReducer)
    const [loading, setLoading] = useState(true);
    const [activeMap, setActiveMap] = useState(false)
    const markers = [
        {
            title: "Apna ghar",
            lat: 27.5314,
            lng: 77.8446,
            icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
        },
    ];


    useEffect(() => {
        // Simulating data fetching from reducer
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const onPressMapView = () => {
        setActiveMap(!activeMap)
    }

  /*  if (loading) {
        return <div className={SearchStyle['search__filters-loading']}>
            <h3>loading...</h3>
        </div>
    }*/

    if (properties && properties.length > 0) {
        return (
            <div style={{display: 'flex'}}>
                <div className={MapViewCardStyle['property__container']} style={{width: activeMap ? '75%' : '97%'}}>
                    {properties.map((property) => {
                        return (
                            <>
                                {shouldShowGrid || listView ? (
                                    <PropertySearchCard key={property.id} property={property}/>
                                    // grid
                                ) : (
                                    <PropertyListCard property={property}/>
                                    // list
                                )}
                            </>
                        );
                    })}
                </div>
                {activeMap && (
                    <div style={{width: '25%'}}>
                        <div className={MapViewCardStyle['map-box']}>
                            {/*<Image src={property_1} alt={"text"} className={MapViewCardStyle["map__image"]}/>*/}
                            <Map markers={markers} style={{height: '100%', width: '100%'}} zoom={12} streetView={true}/>
                        </div>
                    </div>
                )}
                <div className={MapViewCardStyle['map__button__wrapper']}>
                    <div className={MapViewCardStyle['map__show__type-wrapper']} onClick={() => onPressMapView()}>
                        <p className={MapViewCardStyle['map__show__hide__type-text']}>Map</p>
                        <AppIcon
                            name={activeMap ? 'ic:round-keyboard-arrow-left' : 'ic:round-keyboard-arrow-right'}
                            color={AppColors.white}
                            size={25}
                        />
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <div className={MapViewCardStyle['property__container']}
                     style={{justifyContent: "center", width: activeMap ? '66%' : '97%'}}>
                    {<h1>No properties found</h1>}
                </div>
            </>
        );
    }
}

export default MapViewCard;
