import * as React from 'react'
import {useCallback, useRef} from 'react'
import BlogsStyle from "./BlogsCarousel.module.css"
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import 'swiper/swiper-bundle.css';
import {Navigation} from "swiper";
import property_1 from "../../../../public/images/property_1.png";
import property_2 from "../../../../public/images/property_2.png";
import property_3 from "../../../../public/images/property_3.png";
import BlogCard from "../blogCard/BlogCard";
import Link from "next/link";
import AppIcon from "../../../lib/AppIcon/AppIcon";
import {AppColors} from "../../../../public/AppColors";
import {useApp} from "../../../../base/contexts/AppProvider";

/**
 * @author Lovesh Singh.
 * @since 10-12-2022.
 * @description to render Navbar.
 * @return {JSX.Element}
 */
const BlogsCarousel = () => {

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
        <div className={`${BlogsStyle["blogs"]}`}>

            <div className={BlogsStyle["blogs__heading-wrapper"]}>
                <h1 className={BlogsStyle["blogs__heading"]}>Blogs & Press Mentions</h1>
                <Link href={"/blogs"}><p className={BlogsStyle["blogs__view-more"]}>View More</p></Link>
            </div>

            <div className={`${BlogsStyle["blogs-wrapper"]}`}>

                <div className={BlogsStyle["blogs__button-prev"]}>
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
                    <SwiperSlide><BlogCard propertyImage={property_1}/></SwiperSlide>
                    <SwiperSlide><BlogCard propertyImage={property_2}/></SwiperSlide>
                    <SwiperSlide><BlogCard propertyImage={property_3}/></SwiperSlide>
                    <SwiperSlide><BlogCard propertyImage={property_1}/></SwiperSlide>
                    <SwiperSlide><BlogCard propertyImage={property_2}/></SwiperSlide>
                </Swiper>

                <div className={BlogsStyle["blogs__button-next"]}>
                    <AppIcon name={'ic:round-keyboard-arrow-right'}
                             color={AppColors.sonicSilver} size={app?.isMobile ? 30 : 50}
                             style={{cursor: 'pointer'}} onClick={handleNext}/>
                </div>
            </div>
        </div>
    )
}

export default BlogsCarousel;
