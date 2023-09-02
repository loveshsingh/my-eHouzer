import React, {useEffect} from "react";
import PropertyListCard from "../../search/propertySearchListCard/PropertyListCard";
import {useDispatch, useSelector} from "react-redux";
import {fetchVisitedProperties} from "../../../../actions/login";
import PropertySearchCard from "../../search/propertySearchCard/PropertySearchCard";
import {useApp} from "../../../../base/contexts/AppProvider";

const VisitedPropertyList = () => {
    const dispatch = useDispatch();
    const app = useApp()
    const {userDetails, visitedProperties} = useSelector((state) => state.authReducer);

    useEffect(() => {
        dispatch(fetchVisitedProperties())
    }, []);

    return (
        <>
            {visitedProperties.length > 0 ? visitedProperties.map((property) => {
                return (app?.isMobile ? <PropertySearchCard key={property.id} property={property}/> :
                    <PropertyListCard key={property.id} property={property}/>)
            }) : <h1 style={{color: '#747474', fontWeight: 500, fontSize: '2rem', textAlign: "center"}}>No data
                found</h1>}
        </>
    )
}

export default VisitedPropertyList
