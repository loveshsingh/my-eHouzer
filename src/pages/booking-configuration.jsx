import React, {useEffect} from "react";
import Head from "next/head";
import BookingPropertyHeader from "../components/pages/booking/bookingPropertyHeader/BookingPropertyHeader";
import Footer from "../components/pages/home/footer/Footer";
import {addViewProperty, viewProperty} from "../actions/booking";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import PropertyImagesConfig from "../components/pages/booking/propertyImagesConfig/PropertyImagesConfig";

/**
 * @author Vikrant
 * @since 24-04-2023
 * @description to select the property configuration
 * @returns {JSX.Element}
 * @constructor
 */
const BookingConfiguration = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {isLoggedIn, userDetails} = useSelector((state) => state.authReducer);
    const pid = router.query.pid;
    useEffect(() => {
        if (pid) {
            dispatch(viewProperty(pid, propertyViewed));
        }
    }, [pid]);

    const propertyViewed = (property) => {
        if (isLoggedIn) {
            dispatch(addViewProperty({
                userId: userDetails?.userId,
                propertyId: pid,
                developerEmailId: property?.developerMailId,
                propertyName: property?.name
            }));
        }
    }

    return (
        <div>
            <Head>
                <title>Booking Configuration</title>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0"
                />
            </Head>
            <BookingPropertyHeader/>
            <PropertyImagesConfig/>
            <Footer/>
        </div>
    );
}

export default BookingConfiguration;