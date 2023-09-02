import React from "react";
import PropertyListCard from "../../search/propertySearchListCard/PropertyListCard";
import {useSelector} from "react-redux";
import PropertySearchCard from "../../search/propertySearchCard/PropertySearchCard";
import {useApp} from "../../../../base/contexts/AppProvider";

const FavouritesList = () => {

    const {shortlistedProperties} = useSelector((state) => state.authReducer);
    const app = useApp()

    return (
        <>
            {shortlistedProperties.length > 0 ? shortlistedProperties?.map((property) => {
                return (app?.isMobile ? <PropertySearchCard key={property.id} property={property} width={""}/> :
                    <PropertyListCard key={property.id} property={property}/>)
            }) : <h1 style={{color: '#747474', fontWeight: 500, fontSize: '2rem', textAlign: "center"}}>No data
                found</h1>}
        </>
    )
}

export default FavouritesList
