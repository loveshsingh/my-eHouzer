import * as React from 'react'
import 'swiper/css';
import "swiper/css/free-mode";
import "swiper/css/pagination";
import 'swiper/swiper-bundle.css';
import {Autoplay, Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import Banner from "../banner/Banner";
import VirtualTourBanner from "../virtualTourBanner/VirtualTourBanner.jsx";
import PropertyDetailsBanner from "../propertyDetailsBanner/PropertyDetailsBanner";
import MobileSearchBar from "../mobileSearchBar/MobileSearchBar";

/**
 * @author Lovesh Singh.
 * @since 10-12-2022.
 * @description to render Navbar.
 * @return {JSX.Element}
 */
const Header = () => {
    return (
        <>
            <MobileSearchBar/>
            <div className={"header-swiper"}>

                <Swiper
                    pagination={{
                        clickable: true,
                        renderBullet: function (index, className) {
                            return '<span class="' + className + '"></span>';
                        },
                    }} modules={[Pagination, Autoplay]} className="mySwiper"
                    breakpoints={{
                        // when window width is >= 320px
                        320: {
                            allowTouchMove:true
                        },
                        // when window width is >= 640px
                        640: {
                            allowTouchMove:false
                        }
                    }}
                    autoplay={{
                        delay: 8000,
                        disableOnInteraction: true,
                    }}
                >
                    <SwiperSlide>
                        {/*<Image src={headerImage} alt={"text"} width={1300} height={620}/>*/}
                        <Banner bannerText={"Find Your Best \n Smart Real Estate"}
                                bannerDesc={"Lorem ipsum dolor sit amte,consectetur adipsicing elit Lorem ipusm doloe sit amet, consecture adispicing elit."}/>

                    </SwiperSlide>
                    <SwiperSlide>
                        <VirtualTourBanner bannerText={"Second Find Your Best \n Smart Real Estate"}
                                           bannerDesc={"Lorem ipsum dolor sit amte,consectetur adipsicing elit Lorem ipusm doloe sit amet, consecture adispicing elit."}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <PropertyDetailsBanner bannerText={"Third Find Your Best \n Smart Real Estate"}
                                               bannerDesc={"Lorem ipsum dolor sit amte,consectetur adipsicing elit Lorem ipusm doloe sit amet, consecture adispicing elit."}/>
                    </SwiperSlide>
                </Swiper>
            </div>

        </>
    )
}

export default Header;
