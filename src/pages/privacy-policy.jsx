import React from "react";
import Image from "next/image";
import bannerImage from "../public/images/banner_3.png"
import privacyPolicyStyles from "../styles/componentStyles/privacyPolicyStyles/PrivacyPolicy.module.css"
import Footer from "../components/pages/home/footer/Footer";

const PrivacyPolicy = () => {
    return (
        <div>
            <div className={privacyPolicyStyles['privacy__wrapper']}>
                <div className={privacyPolicyStyles['privacy__img-container']}>
                    <Image src={bannerImage} style={{width: "100%", height: "500px"}} alt={'logo'}></Image>
                </div>
                <div>
                    <h1>Privacy Policy</h1>
                </div>
                <div style={{height: '400px'}}>

                </div>

            </div>
            <Footer/>
        </div>
    )
}

export default PrivacyPolicy;