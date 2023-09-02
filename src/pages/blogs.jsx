import {Component} from "react";
import Head from "next/head";
import Footer from "../components/pages/home/footer/Footer";
import BlogLeftDetailComponent from "../components/pages/blogs/blogLeftDetailComponent/BlogLeftDetailComponent";
import blogImage from "../public/images/property_1.png"
import BlogRightDetailComponent from "../components/pages/blogs/blogRightDetailComponent/BlogRightDetailComponent";
import BlogsStyle from "../styles/componentStyles/blogsStyles/Blogs.module.css"


export default class Blogs extends Component {
    render() {
        return (
            <div>
                <Head>
                    <title>Blogs</title>
                    <link rel="stylesheet"
                          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0"/>
                </Head>
                <h1 className={BlogsStyle["blogs__heading"]}>Blogs And Press Mentions</h1>
                <BlogLeftDetailComponent date={"December 11, 2022"}
                                         desc={"Lorem ipsum dolor sit amet, consectetur adipiscing eli. Tortor ornare placrat at imperdiet nam interdam justo, elit purus. Placerat vitae enim placerat ac sit"}
                                         image={blogImage}/>
                <BlogRightDetailComponent date={"December 11, 2022"}
                                          desc={"Lorem ipsum dolor sit amet, consectetur adipiscing eli. Tortor ornare placrat at imperdiet nam interdam justo, elit purus. Placerat vitae enim placerat ac sit"}
                                          image={blogImage}/>
                <BlogLeftDetailComponent date={"December 11, 2022"}
                                         desc={"Lorem ipsum dolor sit amet, consectetur adipiscing eli. Tortor ornare placrat at imperdiet nam interdam justo, elit purus. Placerat vitae enim placerat ac sit"}
                                         image={blogImage}/>
                <BlogRightDetailComponent date={"December 11, 2022"}
                                          desc={"Lorem ipsum dolor sit amet, consectetur adipiscing eli. Tortor ornare placrat at imperdiet nam interdam justo, elit purus. Placerat vitae enim placerat ac sit"}
                                          image={blogImage}/>
                <Footer/>
            </div>
        )
    }
}
