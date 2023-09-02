import {GoogleMap, MarkerF, useJsApiLoader} from "@react-google-maps/api";
import {useState} from "react";
import LocationMarker from "../../public/images/location_marker.gif";

const Map = ({
                 markers,
                 key,
                 style = {height: '70vh', width: '100%'},
                 contentContainerStyle = {height: '100%', width: '100%'},
                 streetView = false,
                 zoom = 10
             }) => {

    const TAG = "Map: ";
    const {isLoaded, loadError, url} = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyAHAY-6kYuugMFxE-hw11ojuUJR-FjQMWs', libraries: ['places'],
    });

    const [mapRef, setMapRef] = useState();
    const [markersRef, setMarkersRef] = useState(markers);
    const onMapLoad = (map) => {
        setMapRef(map);
        //console.log(TAG, 'Get markers', markers, markers.length)
        if (markersRef.length > 1) {
            const bounds = new google.maps.LatLngBounds();
            markersRef?.forEach(({lat, lng}) => bounds.extend({lat, lng}));
            map.fitBounds(bounds);
        } else {
            markersRef?.forEach(({lat, lng}) => map.setCenter({lat, lng}));
            map.setZoom(zoom);
        }
    };


    return (<div style={style}>
        {isLoaded && (/* <GoogleMap mapContainerClassName={MapStyle["map-container"]} center={center} zoom={10} >
                     {markers.map(marker => (
                         <MarkerF key={marker.address} position={{ lat: marker.lat, lng: marker.lng }} icon={marker.icon} />

                     ))}
                 </GoogleMap>*/
            <GoogleMap
                mapContainerStyle={contentContainerStyle}
                onLoad={onMapLoad}
                options={{streetViewControl: streetView}}
            >

                {markersRef?.map(({title, lat, lng, icon}, index) => (<MarkerF
                    key={index}
                    animation={google.maps.Animation.BOUNCE}
                    position={{lat, lng}}
                    icon={LocationMarker}
                />))}
            </GoogleMap>)}
    </div>);
};

export default Map
