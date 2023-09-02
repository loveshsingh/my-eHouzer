import * as React from 'react'
import {useCallback, useRef} from 'react'
import PropertiesStyle from "./PropertiesCarousel.module.css"
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import 'swiper/swiper-bundle.css';
import {Navigation} from "swiper";
import PropertyCard from "../propertyCard/PropertyCard";
import AppIcon from "../../../lib/AppIcon/AppIcon";
import {AppColors} from "../../../../public/AppColors";
import {useApp} from "../../../../base/contexts/AppProvider";

/**
 * @author Lovesh Singh.
 * @since 10-12-2022.
 * @description to render Navbar.
 * @return {JSX.Element}
 */
const PropertiesCarousel = ({propertiesData, carouselName}) => {

    const sliderRef = useRef(null);
    const app = useApp()

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    return (
        <div className={`property-carousel ${PropertiesStyle["properties-wrapper"]}`}>
            {/*TODO Have to change class name for unique swiper left & right button*/}
            <div className={PropertiesStyle["properties__button-prev"]}>
                <AppIcon name={'ic:round-keyboard-arrow-left'}
                         color={AppColors.sonicSilver} size={app?.isMobile ? 30 : 50}
                         style={{cursor: 'pointer'}} onClick={handlePrev}/>
            </div>

            <Swiper
                ref={sliderRef}
                // slidesPerView={3}
                // spaceBetween={20}
                breakpoints={{
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    },
                    // when window width is >= 480px
                    480: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    },
                    // when window width is >= 640px
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    }
                }}
                loop={true}
                navigation={{
                    enabled: true,
                }} modules={[Navigation]}
                className="mySwiper"
            >
                {propertiesData && propertiesData.map((property) => {
                    return (
                        <SwiperSlide key={property.id}>
                            <PropertyCard property={property}
                            />
                        </SwiperSlide>)
                })}
                {/*     <SwiperSlide><PropertyCard propertyImage={property_1}/></SwiperSlide>
                <SwiperSlide><PropertyCard propertyImage={property_2}/></SwiperSlide>
                <SwiperSlide><PropertyCard propertyImage={property_3}/></SwiperSlide>
                <SwiperSlide><PropertyCard propertyImage={property_1}/></SwiperSlide>
                <SwiperSlide><PropertyCard propertyImage={property_2}/></SwiperSlide>*/}
            </Swiper>

            <div className={PropertiesStyle["properties__button-next"]}>
                <AppIcon name={'ic:round-keyboard-arrow-right'}
                         color={AppColors.sonicSilver} size={app?.isMobile ? 30 : 50}
                         style={{cursor: 'pointer'}} onClick={handleNext}/>
            </div>
        </div>
    )
}

export default PropertiesCarousel;
