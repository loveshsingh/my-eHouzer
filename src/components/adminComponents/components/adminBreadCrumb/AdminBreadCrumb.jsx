import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import breadCrumbStyles from './AdminBreadCrumb.module.css'

const AdminBreadCrumb = () => {
    const router = useRouter();

    const [breadCrumb,setBreadCrumb]=useState('')

    useEffect(() => {
        setBreadCrumb(getBreadcrumb(router.pathname));
    }, [router.pathname]);

    const getBreadcrumb = (pathname) => {
        switch (pathname) {
            case '/admin':
                return '';
            case '/admin/ce':
                return '/ Customer Experience';
            case '/admin/rm':
                return '/ Relationship Manager';
            case '/admin/builder':
                return '/ Builder';
            case '/admin/agent':
                return '/ Agent';
            case '/admin/payment':
                return '/ Payment';
            default:
                return '';
        }
    };
    return (
        <div className={breadCrumbStyles['breadcrumbs']}>
            {breadCrumb===''?
                <p className={breadCrumbStyles['current-breadcrumb-text']} >Home</p>
                :
                <p><a href={"/admin"} className={breadCrumbStyles['hover-breadcrumb']}>Home</a> <span className={breadCrumbStyles['current-breadcrumb-right']}>{breadCrumb}</span> </p>}
        </div>
    )
}

export default AdminBreadCrumb;