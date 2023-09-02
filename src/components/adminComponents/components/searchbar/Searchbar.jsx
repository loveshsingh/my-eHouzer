import React from "react";
import searchbarStyles from "./Searchbar.module.css"
import {useDispatch, useSelector} from "react-redux";
import {toggleAction} from "../../../../actions/adminActions/sidebarToggle";

const Searchbar = () => {
    const toggleSidebar = useSelector(((state) => state.sidebarToggleReducer.toggle));
    const dispatch = useDispatch();
    const onSidebarToggleHandle = () => {
        dispatch(toggleAction(!toggleSidebar))
    }
    return (

        <div className={searchbarStyles["search-container"]}>
            <div style={{display:"flex"}}>

                    <span className={`material-symbols-rounded ${searchbarStyles["section-menu-icon"]}`}
                          onClick={onSidebarToggleHandle}
                    >
                        Menu
                    </span>
                <p style={{marginLeft:"0.3rem",marginTop:"0.2rem"}}>Menu</p>
            </div>

            {/*DON"T DELETE the commented code because it is single search for whole module*/}
            {/*<div className={searchbarStyles["search_form-container"]}>
                <form className={searchbarStyles["search_form"]}>
                    <button className={searchbarStyles["search_btn"]} type="submit">Search</button>
                    <input className={searchbarStyles["search_input"]}
                           type="search" placeholder="Search..."/>
                </form>
            </div>*/}
        </div>
    )
}

export default Searchbar
