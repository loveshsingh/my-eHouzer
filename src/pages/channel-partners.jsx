import React from "react";
import Image from "next/image";
import bannerImage from "../public/images/banner_3.png"
import channelPartnersStyles from "../styles/componentStyles/channelPartnersStyles/ChannelPartner.module.css"
import Footer from "../components/pages/home/footer/Footer";

const ChannelPartners = () => {
    return (
        <div>
            <div className={channelPartnersStyles['channel__wrapper']}>
                <div className={channelPartnersStyles['channel__img-container']}>
                    <Image src={bannerImage} style={{width: "100%", height: "500px"}} alt={'logo'}></Image>
                </div>
                <div>
                    <h1>Channel Partners</h1>
                </div>
                <div style={{height: '400px'}}>

                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default ChannelPartners;