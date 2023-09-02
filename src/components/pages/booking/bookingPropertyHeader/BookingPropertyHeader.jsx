import * as React from 'react'
import BookingPropertyHeaderStyle from "./BookingPropertyHeader.module.css";
import logo from "../../../../public/images/vip_logo.png";
import {useSelector} from "react-redux";

/**
 * @author Lovesh Singh.
 * @since 19-12-2022.
 * @description to render top developer tab.
 * @return {JSX.Element}
 */
const BookingPropertyHeader = () => {

    const {property} = useSelector((state) => state.bookingReducer)

    return (
        <div className={BookingPropertyHeaderStyle["header"]}>
            <img src={property?.developer?.media?.url} alt={"logo"}
                 className={BookingPropertyHeaderStyle["header__image"]}/>
            <h1 className={BookingPropertyHeaderStyle["header__text"]}>{property?.developer?.name}</h1>
        </div>
    )
}

export default BookingPropertyHeader;
