import React from "react";
import AdminNavbar from "../adminComponents/components/adminNavbar/AdminNavbar";
import {useRouter} from "next/router";
import Navbar from "../pages/home/navbar/Navbar";

/**
 * @author Vikrant
 * @since 17-03-2023
 * @description to handle Navbar
 * @return {JSX.Element}
 * @constructor
 */
const CommonNavbar = () => {
    const router = useRouter();
    const pathname = router.pathname;
    const isPath = pathname.includes('admin');

    return (
        <>
            {isPath ? <AdminNavbar/> : <Navbar/>}
        </>
    )
}

export default CommonNavbar;
