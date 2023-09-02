import * as React from 'react'
import BlogLeftDetailComponentStyle from "./BlogLeftDetailComponent.module.css";
import Image from "next/image";
import {StringConstants} from "../../../../constants/StringConstants";

/**
 * @author Lovesh Singh.
 * @since 19-12-2022.
 * @description to render top developer tab.
 * @return {JSX.Element}
 */
const BlogLeftDetailComponent = ({date, desc, image}) => {

    return (
        <div className={BlogLeftDetailComponentStyle["blog-detail"]}>
            <div className={BlogLeftDetailComponentStyle["blog-detail__wrapper"]}>
                <p className={BlogLeftDetailComponentStyle["blog-detail__date"]}>{date}</p>
                <p className={BlogLeftDetailComponentStyle["blog-detail__desc"]}>{desc}</p>
                <button
                    className={BlogLeftDetailComponentStyle["blog-detail__button"]}>{StringConstants.ReadMoreAction}</button>
            </div>
            <div className={BlogLeftDetailComponentStyle["blog-detail__image-wrapper"]}>
                <div className={BlogLeftDetailComponentStyle["blog-detail__image-bg"]}/>
                <Image alt={StringConstants.BlogImageText} src={image}
                       className={BlogLeftDetailComponentStyle["blog-detail__image"]}/>
            </div>
        </div>
    )
}

export default BlogLeftDetailComponent;
