import * as React from 'react'
import adminFooterStyles from "./AdminFooter.module.css"

/**
 * @author Vikrant.
 * @since 29-05-2023.
 * @description to render Admin Footer.
 * @return {JSX.Element}
 */
const AdminFooter = () => {
    return (
        <div className={adminFooterStyles["admin__footer-container"]}>
            <div>
                <span>
                    &#169; Copyright 2023 Pibyten Techverse Private Limited
                </span>
            </div>
        </div>
    )
}

export default AdminFooter;
