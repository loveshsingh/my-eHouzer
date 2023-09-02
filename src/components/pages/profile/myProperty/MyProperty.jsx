import * as React from 'react'
import {useEffect} from 'react'
import BookedPropertyCard from "../bookedPropertyCard/BookedPropertyCard";
import MyPropertyStyles from "./MyProperty.module.css"
import ProgressTracker from "../progressTracker/ProgressTracker";
import {useDispatch, useSelector} from "react-redux";
import {useApp} from "../../../../base/contexts/AppProvider";
import {fetchBookedProperties} from "../../../../actions/login";

/**
 * @author Lovesh Singh.
 * @since 10-01-2022.
 * @description to render my property.
 * @return {JSX.Element}
 */
const MyProperty = () => {

    const app = useApp()
    const dispatch = useDispatch();
    const {bookedProperties, bookedPropertiesLoading} = useSelector((state) => state.authReducer);

    useEffect(() => {
        dispatch(fetchBookedProperties(""))
    }, []);


    return (
        <div className={MyPropertyStyles['my-property']}>
            {(!bookedPropertiesLoading && bookedProperties?.length > 0) ? (
                <>
                    {bookedProperties?.map((bookProperty) => (
                        <BookedProperty key={bookProperty.id} bookProperty={bookProperty}/>
                    ))}
                </>
            ) : (
                <>
                    {!bookedPropertiesLoading && bookedProperties?.length === 0 ? (
                        <h1 style={{color: '#747474', fontWeight: 500, fontSize: '2rem', textAlign: 'center'}}>
                            No data found
                        </h1>
                    ) : (
                        <h1 style={{color: '#747474', fontWeight: 400, fontSize: '1.5rem', textAlign: 'center'}}>
                            Loading...
                        </h1>
                    )}
                </>
            )}
        </div>
    )
}

const BookedProperty = ({bookProperty}) => {
    return (
        <>
            <p className={MyPropertyStyles['my-property__booked-property-text']}>Progress Tracker</p>
            <div className={MyPropertyStyles['my-property__progress-tracker']}>
                <ProgressTracker status={bookProperty?.bookingStatus}/>
            </div>
            <div className={MyPropertyStyles['my-property__booked-property-card']}>
                <BookedPropertyCard bookedProperty={bookProperty}/>
            </div>
        </>
    )
}


export default MyProperty;
