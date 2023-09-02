import React, {useEffect} from "react";
import PropertySearchCard from "../../search/propertySearchCard/PropertySearchCard";
import PropertyListCard from "../../search/propertySearchListCard/PropertyListCard";
import {useDispatch, useSelector} from "react-redux";
import {useApp} from "../../../../base/contexts/AppProvider";
import {fetchBookedProperties} from "../../../../actions/login";

const BookedPropertyList = () => {
    const dispatch = useDispatch();
    const app = useApp()
    const {bookedProperties} = useSelector((state) => state.authReducer);

    useEffect(() => {
        dispatch(fetchBookedProperties(""))
    }, []);
    return (
        <>
            {bookedProperties.length > 0 ? bookedProperties.map((bookedProperty,i) => {
                return (app?.isMobile ? <PropertySearchCard key={i} property={bookedProperty?.property} booked={true}/> :
                    <PropertyListCard key={i} property={bookedProperty?.property} booked={true}/>)
            }) : <h1 style={{color: '#747474', fontWeight: 500, fontSize: '2rem', textAlign: "center"}}>No data
                found</h1>}
        </>
    )
}

export default BookedPropertyList
