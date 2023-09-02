import React from "react";
import Image from "next/image";
import bannerImage from "../public/images/banner_3.png"
import servicesStyles from "../styles/componentStyles/servicesStyles/Services.module.css"
import Footer from "../components/pages/home/footer/Footer";

const Services = () => {
    return (
        <div>
            <div className={servicesStyles['services__wrapper']}>
                <div className={servicesStyles['services__img-container']}>
                    <Image src={bannerImage} style={{width: "100%", height: "500px"}} alt={'logo'}></Image>
                </div>
                <div>
                    <h1>Services Page</h1>
                </div>
                <div style={{height: '400px'}}>

                </div>

            </div>
            <Footer/>
        </div>
    )
}

export default Services;