import {GoogleMap, MarkerF, StandaloneSearchBox, useJsApiLoader} from "@react-google-maps/api";
import React, {useEffect, useRef, useState} from "react";
import LocationMarker from "../../../public/images/location_marker.gif";
import adminStyles from "./AdminMap.module.css";

const AdminMap = ({
                      markers,
                      contentContainerStyle = {height: '20rem'},
                      zoom = 10,
                      getCoordinates
                  }) => {
    const TAG = "Map: ";
    const {isLoaded, loadError, url} = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyAHAY-6kYuugMFxE-hw11ojuUJR-FjQMWs',
        libraries: ['places'],
    });

    const originRef = useRef();
    const [mapRef, setMapRef] = useState();
    const [markersRef, setMarkersRef] = useState(markers);
    const [coordinates, setCoordinates] = useState({
        lat: 0,
        lng: 0,
    })

    useEffect(() => {
        mapRef?.panTo({lat: markers?.lat, lng: markers?.lng});
        setMarkersRef(markers)
        if (isLoaded) {
            const geocoder = new window.google.maps.Geocoder();
            const latlng = {
                lat: parseFloat(markers?.lat),
                lng: parseFloat(markers?.lng),
            };

            geocoder.geocode({location: latlng}, (results, status) => {
                if (status === 'OK') {
                    if (results[0]) {
                        originRef.current.value = results[0].formatted_address;
                    }
                }
            });
        }
    }, [markers?.lat, markers?.lng])

    const onMapLoad = (map) => {
        setMapRef(map);
        const lat = 28.3654697;
        const lng = 77.3269767;
        map.setCenter({lat, lng});
        map.setZoom(zoom);
    };
    const getOrigin = () => {
        const geocoder = new window.google.maps.Geocoder();
        const address = originRef.current.value;
        // Use the Geocoder to get the latitude and longitude
        geocoder.geocode({address}, (results, status) => {
            if (status === "OK" && results.length > 0) {
                const location = results[0].geometry.location;
                const lat = location.lat();
                const lng = location.lng();

                setMarkersRef([{
                    title: "ehouzer Property",
                    lat: lat,
                    lng: lng,
                    icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                }])

                mapRef?.panTo(location);
                mapRef?.setZoom(12);

                getCoordinates({lat: lat, lng: lng,})
            } else {
                console.log("Geocode was not successful for the following reason:", status);
            }
        });
    }

    const handleMarkerDragEnd = (markerIndex) => (event) => {
        const geocoder = new window.google.maps.Geocoder();
        const position = event.latLng;
        const lat = position.lat();
        const lng = position.lng();

        // Reverse geocoding to get the address from the latLng
        geocoder.geocode({location: position}, (results, status) => {
            if (status === "OK" && results.length > 0) {
                const address = results[0].formatted_address;
                originRef.current.value = address;
                /* setMarkersRef((prevMarkers) => {
                     const updatedMarkers = [...prevMarkers];
                     updatedMarkers[markerIndex] = { ...updatedMarkers[markerIndex], lat, lng };
                     return updatedMarkers;
                 });*/

                setMarkersRef([{lat, lng}]);
            }
        });

        getCoordinates({lat: lat, lng: lng,})
    };

    const onHandleKeyPress = (event) => {
        if (event.key === 'Enter') {
            getOrigin();
        }
    }

    return (
        <div>
            {isLoaded && (
                <div style={{position: 'relative',zIndex:"0"}}>
                    <GoogleMap
                        mapContainerStyle={contentContainerStyle}
                        onLoad={onMapLoad}
                        options={{streetViewControl: false, mapTypeControl: false}}
                    >
                        {markersRef &&
                            <MarkerF
                                position={{lat: markersRef?.lat, lng: markersRef?.lng}}
                                animation={google.maps.Animation.BOUNCE}
                                icon={LocationMarker}
                                draggable={true}
                                onDragEnd={handleMarkerDragEnd(1)}
                            />
                        }
                        {/*  {markersRef?.map(({title, lat, lng, icon}, index) => (
                            <MarkerF
                                key={index}
                                position={{lat, lng}}
                                animation={google.maps.Animation.BOUNCE}
                                icon={LocationMarker}
                                draggable={true}
                                // title={title}
                                onDragEnd={handleMarkerDragEnd(index)}
                            />
                        ))}*/}
                    </GoogleMap>
                    <StandaloneSearchBox
                        onPlaceChanged={getOrigin}>
                        <input className={adminStyles['admin__map-autocomplete-input']}
                               onKeyDown={onHandleKeyPress}
                               type="text" placeholder="Search Address" ref={originRef}/>
                    </StandaloneSearchBox>
                </div>
            )}
        </div>
    );
};

export default AdminMap
