import * as React from 'react'
import {useCallback, useRef} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import 'swiper/swiper-bundle.css';
import {Navigation, Pagination} from "swiper";
import {AppContextValueType as app, useApp} from "../../../base/contexts/AppProvider";
import appImageCarouselStyles from "./AppImageCarousel.module.css"
import Image from "next/image";
import propertyVariantPopupStyles
    from "../../adminComponents/pages/ce/cePopupComponents/propertyVariantPopup/PropertyVariantPopup.module.css";
import AppIcon from "../AppIcon/AppIcon";
import {AppColors} from "../../../public/AppColors";

/**
 * @author Lovesh Singh.
 * @since 10-12-2022.
 * @description to render Navbar.
 * @return {JSX.Element}
 */
const AppImageCarousel = ({imageFiles, onDelete, carouselName}) => {
    // const testUrl = URL?.createObjectURL(imageFiles[0]?.[0])

    console.log('selectedImages.... image test ', imageFiles, Array.isArray(imageFiles))

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
        <div>

            <Swiper

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
                        slidesPerView: 1,
                        spaceBetween: 20
                    }
                }}
                navigation={true}
                pagination={{clickable: true}}
                modules={[Navigation, Pagination]}
                className="mySwiper"
            >
                {imageFiles && imageFiles.map((imageFile, i) => {
                    console.log("selectedImages....", imageFile)
                    let sliderImage;
                    console.log("image urls... ", imageFile.url)
                    if (imageFile.url) {
                        sliderImage = imageFile.url;
                    } else {
                        sliderImage = URL?.createObjectURL(imageFile);
                    }
                    return (
                        <SwiperSlide key={i}>
                            <div className={appImageCarouselStyles["image__carousel-img-container"]}>
                                {/* <span
                                        className={`material-symbols-rounded ${appImageCarouselStyles['image__carousel-close-icon']}`}>
                                        Close
                                    </span>*/}

                                <AppIcon name={'material-symbols:close-rounded'}
                                         color={AppColors.roseWood} size={app?.isMobile ? 15 : 30}
                                         style={{
                                             cursor: 'pointer',
                                             position: 'absolute',
                                             right: 0,
                                             top: 0,
                                             zIndex: 1
                                         }} onClick={() => onDelete({data: imageFile, index: i})}/>

                                <Image fill
                                       src={sliderImage} alt="image"/>
                            </div>
                        </SwiperSlide>)
                })}

            </Swiper>

        </div>
    )
}

export default AppImageCarousel;
