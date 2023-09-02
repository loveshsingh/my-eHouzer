import {Component} from "react";
import Head from "next/head";
import Footer from "../components/pages/home/footer/Footer";
import LoginStyle from "../styles/componentStyles/loginStyles/Login.module.css";
import Image from "next/image";
import loginImage from "../public/images/login-image.png";
import propertyImage from "../public/images/login_right_image.png";
import logo from "../public/images/company-logo-01.png";
import RegisterComponent from "../components/pages/login/registerComponent/RegisterComponent";

export default class Signin extends Component {
    render() {
        return (
            <div>
                <Head>
                    <title>Login</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0"
                    />
                </Head>
                <div className={LoginStyle["login"]}>
                    <div className={LoginStyle["login__left-container"]}>
                        <Image
                            src={loginImage}
                            alt={"Signin image"}
                            className={LoginStyle["login__left-container-image"]}
                        />
                        <p className={LoginStyle["login__left-container-text"]}>
                            Find Your{" "}
                            <span style={{fontSize: "1.2rem", lineHeight: 0}}>
                Best Smart Real Estate
              </span>
                        </p>
                    </div>

                    <div className={LoginStyle["login__right-container"]}>
                        <Image
                            src={logo}
                            alt={"Signin image"}
                            className={LoginStyle["login__right-container-logo"]}
                        />
                        <h1 className={LoginStyle["login__right-container-heading"]}>
                            Welcome
                        </h1>
                        <RegisterComponent/>
                        <Image
                            src={propertyImage}
                            alt={"Signin image"}
                            className={LoginStyle["login__right-container-image"]}
                        />
                        <div
                            className={LoginStyle["login__right-container-image-wrapper"]}
                        />
                    </div>

                    <div className={LoginStyle["login__center-box-wrapper"]}>
                        <div className={LoginStyle["login__center-white-box"]}/>
                        <div className={LoginStyle["login__center-colored-box"]}/>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}
