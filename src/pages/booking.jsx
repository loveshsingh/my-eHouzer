import React, {useEffect} from "react";
import PropertyImagesGrid from "../components/pages/booking/propertyImagesGrid/PropertyImagesGrid";
import Head from "next/head";
import BookingPropertyHeader from "../components/pages/booking/bookingPropertyHeader/BookingPropertyHeader";
import BookingPriceWrapper from "../components/pages/booking/bookingPriceWrapper/BookingPriceWrapper";
import BookingNavbar from "../components/pages/booking/bookingNavbar/BookingNavbar";
import Footer from "../components/pages/home/footer/Footer";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {addViewProperty, viewProperty} from "../actions/booking";

const Booking = () => {
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
                <title>Booking</title>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0"
                />
            </Head>
            <BookingPropertyHeader/>
            <PropertyImagesGrid/>
            <BookingPriceWrapper/>
            <BookingNavbar/>
            <Footer/>
        </div>
    );
};
/*}*/


export default Booking;
