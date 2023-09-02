import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import appPaginationStyles from "./AppPagination.module.css"
import adminSidebarStyle from "../../adminComponents/components/adminSidebar/AdminSidebar.module.css";
import AppIcon from "../AppIcon/AppIcon";
import {AppColors} from "../../../public/AppColors";

/**
 * @author Vikrant.
 * @since 20-05-2023
 * @description to handle App Pagination.
 * @param initialData
 * @param totalItems
 * @param onSelect
 * @returns {JSX.Element}
 * @constructor
 */
const AppPagination = ({initialData = {page: 1, perPage: 5}, totalItems = 5, onSelect}) => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(initialData.page);
    const [itemsPerPage, setItemsPerPage] = useState(initialData.perPage); // Number of items to display per page
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    useEffect(() => {
        handleRoute()
    }, [])


    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [totalPages]);


    /**
     * @description to handle route parameters
     */
    const handleRoute = () => {
        const {page, perPage} = router.query;
        let newPage = initialData.page;
        let newPerPage = initialData.perPage;
        if (page) {
            newPage = Number(page);
        }
        if (perPage) {
            newPerPage = Number(perPage);
        }
        setCurrentPage(newPage)
        setItemsPerPage(newPerPage)
    }

    /**
     * @description to handle page change at click on button
     * @param pageNumber
     */
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        onSelect({page: pageNumber, perPage: itemsPerPage})
    };

    /**
     * @description to handle next page
     */
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            onSelect({page: currentPage + 1, perPage: itemsPerPage})
        }
    };

    /**
     * @description to handle previous page
     */
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            onSelect({page: currentPage - 1, perPage: itemsPerPage})
        }
    };

    /**
     * @description to handle perPage count
     * @param event
     */
    const handlePerPageChange = (event) => {
        const perPage = parseInt(event.target.value);
        const newCurrentPage = Math.ceil(totalItems / perPage);
        if (newCurrentPage > currentPage) {
            setCurrentPage(newCurrentPage)
        }
        setItemsPerPage(perPage);
        onSelect({page: newCurrentPage, perPage: perPage})
    };

    /**
     * @description provide page number
     * @returns {[]}
     */
    const getPageNumbers = () => {
        const pageNumbers = [];
        const visiblePageCount = 3; // Number of page numbers to display before showing ellipsis

        if (totalPages <= visiblePageCount) {
            // Show all page numbers without ellipsis
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            const halfVisiblePageCount = Math.floor(visiblePageCount / 2);
            let startPage = currentPage - halfVisiblePageCount;
            let endPage = currentPage + halfVisiblePageCount;

            if (startPage < 1) {
                startPage = 1;
                endPage = visiblePageCount;
            }

            if (endPage > totalPages) {
                endPage = totalPages;
                startPage = totalPages - visiblePageCount + 1;
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            if (startPage > 1) {
                pageNumbers.unshift('...');
                pageNumbers.unshift(1);
            }

            if (endPage < totalPages) {
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
        }

        return pageNumbers;
    };
    return (
        <div style={{marginLeft:"auto",width:"fit-content"}}>
            <div className={appPaginationStyles['app-pagination__container']}>

                {/*<div className={appPaginationStyles['app-pagination__btn-container']}>*/}
                {/*    <button onClick={handlePreviousPage} disabled={currentPage === 1}>*/}
                {/*        Prev*/}
                {/*    </button>*/}
                {/*    {getPageNumbers().map((pageNumber, index) => (*/}
                {/*        <button*/}
                {/*            key={index}*/}
                {/*            onClick={() => handlePageChange(pageNumber)}*/}
                {/*            disabled={pageNumber === '...'}*/}
                {/*            style={pageNumber === currentPage ? {background: 'red'} : null}*/}
                {/*        >*/}
                {/*            {pageNumber}*/}
                {/*        </button>*/}
                {/*    ))}*/}
                {/*    <button onClick={handleNextPage} disabled={currentPage === totalPages}>*/}
                {/*        Next*/}
                {/*    </button>*/}
                {/*</div>*/}

                {/*<div>*/}
                {/*    <label htmlFor="itemsPerPage">Items per page:</label>*/}
                {/*    /!* <input*/}
                {/*        type="number"*/}
                {/*        id="itemsPerPage"*/}
                {/*        value={itemsPerPage}*/}
                {/*        onChange={handlePerPageChange}*/}
                {/*        style={{width: '50px', marginRight: '10px'}}*/}
                {/*    />*!/*/}
                {/*    <select value={itemsPerPage} onChange={handlePerPageChange}>*/}
                {/*        <option value={5}>5</option>*/}
                {/*        <option value={10}>10</option>*/}
                {/*        <option value={20}>20</option>*/}
                {/*        <option value={totalItems}>All</option>*/}
                {/*    </select>*/}
                {/*</div>*/}

                <div className={appPaginationStyles['app-pagination__btn-container']}>
                    <button onClick={handlePreviousPage} disabled={currentPage === 1} style={{marginRight:"1rem"}} className={appPaginationStyles['app-pagination__button']}>
                        <AppIcon name={'material-symbols:keyboard-arrow-left'}
                                  size={15}
                                 style={{
                                     paddingTop:"0.3rem"
                                 }} />
                        Previous
                    </button>
                    {/*{getPageNumbers().map((pageNumber, index) => (*/}
                    {/*    <div*/}
                    {/*        key={index}*/}
                    {/*        onClick={() => handlePageChange(pageNumber)}*/}
                    {/*        disabled={pageNumber === '...'}*/}
                    {/*        style={pageNumber === currentPage ? {background: '#d4474e',padding:"0 0.2rem",color:"white",marginRight:"1rem"} : {marginRight:"1rem"}}*/}
                    {/*    >*/}
                    {/*        {pageNumber}*/}

                    {/*    </div>*/}
                    {/*))}*/}
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}  className={appPaginationStyles['app-pagination__button']}>
                        Next
                        <AppIcon name={'material-symbols:keyboard-arrow-right'}
                                 size={15}
                                 style={{
                                     paddingTop:"0.3rem"
                                 }} />
                    </button>
                </div>

                {/*<div>*/}
                {/*    <label htmlFor="itemsPerPage">Items per page:</label>*/}
                {/*    /!* <input*/}
                {/*        type="number"*/}
                {/*        id="itemsPerPage"*/}
                {/*        value={itemsPerPage}*/}
                {/*        onChange={handlePerPageChange}*/}
                {/*        style={{width: '50px', marginRight: '10px'}}*/}
                {/*    />*!/*/}
                {/*    <select value={itemsPerPage} onChange={handlePerPageChange}>*/}
                {/*        <option value={5}>5</option>*/}
                {/*        <option value={10}>10</option>*/}
                {/*        <option value={20}>20</option>*/}
                {/*        <option value={totalItems}>All</option>*/}
                {/*    </select>*/}
                {/*</div>*/}


            </div>
        </div>
    );

}

export default AppPagination