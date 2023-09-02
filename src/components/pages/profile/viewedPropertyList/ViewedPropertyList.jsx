import React, {useEffect} from "react";
import PropertyListCard from "../../search/propertySearchListCard/PropertyListCard";
import {useDispatch, useSelector} from "react-redux";
import {fetchViewedProperties} from "../../../../actions/login";
import PropertySearchCard from "../../search/propertySearchCard/PropertySearchCard";
import {useApp} from "../../../../base/contexts/AppProvider";


const ViewedPropertyList = () => {
    const dispatch = useDispatch();
    const app = useApp()

    const {viewedProperties} = useSelector((state) => state.authReducer);

    useEffect(() => {
        dispatch(fetchViewedProperties())
    }, []);

    return (
        <>
            {viewedProperties.length > 0 ? viewedProperties.map((property) => {
                return (app?.isMobile ? <PropertySearchCard key={property.id} property={property}/> :
                    <PropertyListCard key={property.id} property={property}/>)
            }) : <h1 style={{color: '#747474', fontWeight: 500, fontSize: '2rem', textAlign: "center"}}>No data
                found</h1>}
        </>
    )
}

export default ViewedPropertyList
