import * as React from 'react'
import MyVisitsStyle from "./MyVisits.module.css"
import MyVisitNavbar from "../myVisitNavbar/MyVisitNavbar";

/**
 * @author Lovesh Singh.
 * @since 10-01-2022.
 * @description to render my visits.
 * @return {JSX.Element}
 */
const MyVisits = () => {

    return (
        <div className={MyVisitsStyle['my-visits']}>
            <MyVisitNavbar/>
        </div>
    )
}


export default MyVisits;
