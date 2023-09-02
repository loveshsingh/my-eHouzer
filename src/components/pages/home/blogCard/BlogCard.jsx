import * as React from 'react'
import Image from "next/image";
import AppRoundButton from "../../../lib/AppRoundButton";
import BlogCardStyle from "./BlogCard.module.css"
import {useRouter} from "next/router";

/**
 * @author Lovesh Singh.
 * @since 10-12-2022.
 * @description to render Navbar.
 * @return {JSX.Element}
 */
const BlogCard = ({propertyImage}) => {

    const router = useRouter();

    return (
        <div className={BlogCardStyle["blog"]}>

            <Image src={propertyImage} alt={"text"} className={BlogCardStyle["blog__image"]}/>

            <div className={BlogCardStyle["blog__details-wrapper"]}>

                <p className={BlogCardStyle["blog__details"]}>Lorem ipsum dolor sitamet, consectetur adipising elit</p>
                <p className={BlogCardStyle["blog__details"]}>Lorem ipsum dolor sitamet, consectetur adipising elit</p>

                <AppRoundButton buttonText={"View more"}
                                buttonStyle={BlogCardStyle["blog__button"]}
                                type={"primary"} onClick={() => {
                    router.push("/blogs")
                }}/>

            </div>
        </div>
    )
}

export default BlogCard;
