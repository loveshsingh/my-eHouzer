import * as React from 'react'
import Service from "../service/Service";
import ServicesWrapperStyle from "./ServicesWrapper.module.css"

/**
 * @author Lovesh Singh.
 * @since 10-12-2022.
 * @description to render Navbar.
 * @return {JSX.Element}
 */
const ServicesWrapper = () => {
    return (
        <div className={ServicesWrapperStyle["service-wrapper"]}>
            <Service icon={'ic:round-maps-home-work'} serviceName={"Exclusive Properties"}/>
            <Service icon={'fluent:person-money-20-filled'} serviceName={"0% Brokerage"}/>
            <Service icon={'material-symbols:tour-rounded'} serviceName={"Virtual Tours, Site Visits"}/>
            <Service icon={'carbon:information-filled'} serviceName={"Constant Updates"}/>
            <Service icon={'heroicons-outline:status-online'} serviceName={"Online Booking"}/>
        </div>
    )
}

export default ServicesWrapper;
