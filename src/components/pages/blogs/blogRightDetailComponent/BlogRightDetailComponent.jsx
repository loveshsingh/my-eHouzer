import * as React from 'react'
import BlogRightDetailComponentStyle from "./BlogRightDetailComponent.module.css";
import Image from "next/image";
import {StringConstants} from "../../../../constants/StringConstants";

/**
 * @author Lovesh Singh.
 * @since 19-12-2022.
 * @description to render top developer tab.
 * @return {JSX.Element}
 */
const BlogRightDetailComponent = ({date, desc, image}) => {

    return (
        <div className={BlogRightDetailComponentStyle["blog-detail"]}>
            <div className={BlogRightDetailComponentStyle["blog-detail__image-wrapper"]}>
                <div className={BlogRightDetailComponentStyle["blog-detail__image-bg"]}/>
                <Image alt={StringConstants.BlogImageText} src={image}
                       className={BlogRightDetailComponentStyle["blog-detail__image"]}/>
            </div>
            <div className={BlogRightDetailComponentStyle["blog-detail__wrapper"]}>
                <p className={BlogRightDetailComponentStyle["blog-detail__date"]}>{date}</p>
                <p className={BlogRightDetailComponentStyle["blog-detail__desc"]}>{desc}</p>
                <button
                    className={BlogRightDetailComponentStyle["blog-detail__button"]}>{StringConstants.ReadMoreAction}</button>
            </div>
        </div>
    )
}

export default BlogRightDetailComponent;
