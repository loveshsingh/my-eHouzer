import React from "react";
import Image from "next/image";
import bannerImage from "../public/images/banner_2.png"
import tncStyles from "../styles/componentStyles/tncStyles/Tnc.module.css"
import Footer from "../components/pages/home/footer/Footer";

const Tnc = () => {
    return (
        <div>
            <div className={tncStyles['tnc__container-wrapper']}>
                <div className={tncStyles['tnc__img-container']}>
                    <Image src={bannerImage} style={{width: "100%", height: "500px"}} alt={'logo'}></Image>
                </div>
                <div>
                    <h1>Terms and Conditions</h1>
                </div>
                <div style={{height: '400px'}}>

                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Tnc;