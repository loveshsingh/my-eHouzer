import * as React from 'react'
import ImageViewPopUpStyle from "./ImageViewPopUp.module.css";
import {Swiper} from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import 'swiper/swiper-bundle.css';
import {Navigation} from "swiper";

/**
 * @author Lovesh Singh.
 * @since 19-12-2022.
 * @description to render top developer tab.
 * @return {JSX.Element}
 */
const ImageViewPopUp = () => {

    return (
        <div className={ImageViewPopUpStyle["image-view"]}>
            <Swiper
                slidesPerView={1}
                spaceBetween={20}
                navigation={{
                    enabled: true,
                }} modules={[Navigation]}
                className="mySwiper"
            >
                {/* <SwiperSlide><PropertyCard propertyImage={property_1}/></SwiperSlide>
                <SwiperSlide><PropertyCard propertyImage={property_2}/></SwiperSlide>
                <SwiperSlide><PropertyCard propertyImage={property_3}/></SwiperSlide>
                <SwiperSlide><PropertyCard propertyImage={property_1}/></SwiperSlide>
                <SwiperSlide><PropertyCard propertyImage={property_2}/></SwiperSlide>*/}
            </Swiper>
        </div>
    )
}

export default ImageViewPopUp;
