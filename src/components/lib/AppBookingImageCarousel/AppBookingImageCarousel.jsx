import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {Navigation, Pagination,EffectCoverflow} from "swiper";
import appImageCarouselStyles from "./AppBookingImageCarousel.module.css"
import AppIcon from "../AppIcon/AppIcon";
import 'swiper/swiper-bundle.css';

/**
 * @author Vipul Garg
 * @since 30-05-2023
 * @description App booking image popup carousel
 */
const AppBookingImageCarousel = ({show,onClose,property}) => {

    /**
     * @author Vipul Garg
     * @since 30-05-2023
     * @description to Access the swiper instance and assign it to the variable
     */
    const onSwiper = (swiper) => {
        // Access the swiper instance and assign it to the variable
        swiper && (window.swiper = swiper);
    };

    /**
     * @author Vipul Garg
     * @since 30-05-2023
     * @description to close the popup
     */
    const onDisplayPopupHandle = () => {
        onClose()
    }
    return (
        <div className={appImageCarouselStyles["container"]}>
            <div className={appImageCarouselStyles['customer__popup-header-close']}
                 onClick={onDisplayPopupHandle}>
                       <span
                           className={`material-symbols-rounded ${appImageCarouselStyles['admin__sidebar-icons']}`}>
                           Close
                       </span>
            </div>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate:0,
                    stretch:0,
                    depth:100,
                    modifier:2.5,
                }}
                // pagination={
                // {
                //     // el:'.swiper-pagination',
                //     dynamicBullets:true,
                //     clickable:true}
                // }
                navigation={
                {
                    nextEl:".swiper-button-next",
                    prevEl:".swiper-button-prev",
                    clickable:true,
                }
            }
                onSwiper={onSwiper}
                modules={[EffectCoverflow,Pagination,Navigation]}
                className={appImageCarouselStyles["swiper_container"]}
            >
                <Swiper>
                    {property?.medias?.map((media, index) => (
                        <SwiperSlide key={index}>
                                <img
                                    src={media.url}
                                    alt="slide-image"
                                    className={appImageCarouselStyles["swiper_image"]}
                                />
                        </SwiperSlide>
                    ))}
                    {
                        property?.videoUrl &&
                        <SwiperSlide key={3}>
                            <iframe className={appImageCarouselStyles["swiper_image"]}
                                    src={property?.videoUrl}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen

                            ></iframe>

                        </SwiperSlide>
                    }
                </Swiper>


                <div className={appImageCarouselStyles["slider-controler"]}>
                    <div className={appImageCarouselStyles["swiper-button-prev"]} onClick={() => window.swiper && window.swiper.slidePrev()}>
                        <AppIcon name={'icon-park-solid:left-c'}
                                 color={"white"} size={ 40}
                        />
                    </div>
                    <div className={appImageCarouselStyles["swiper-button-next"]} onClick={() => window.swiper && window.swiper.slideNext()}>
                        <AppIcon name={'icon-park-solid:right-c'}
                                 color={"white"} size={ 40}
                        />
                    </div>
                </div>

            </Swiper>

        </div>);
}

export default AppBookingImageCarousel;