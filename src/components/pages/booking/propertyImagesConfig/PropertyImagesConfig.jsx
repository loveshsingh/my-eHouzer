import * as React from 'react'
import {useEffect, useState} from 'react'
import PropertyImagesConfigStyle from "./PropertyImagesConfig.module.css";
import {useSelector} from "react-redux";
import PropertyConfiguration from "../propertyConfiguration/PropertyConfiguration";
import PropertyImagesGridStyle from "../propertyImagesGrid/PropertyImagesGrid.module.css";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper";

/**
 * @author Vikrant.
 * @since 24-04-2023.
 * @description to render properties images.
 * @return {JSX.Element}
 */
const PropertyImagesConfig = () => {
    const {property, propertyVariants} = useSelector((state) => state.bookingReducer)

    const [propertyImagesGrid, setPropertyImagesGrid] = useState([]);
    const [activeTabId, setActiveTabId] = useState(0);

    useEffect(() => {
        if (property && property?.medias) {
            setPropertyImagesGrid(property?.medias?.map((media) => {
                return media.url
            }));
        }
    }, [property]);

    const setActiveTab = (activeTabId) => {
        setActiveTabId(activeTabId);
    }

    return (
        <div className={PropertyImagesConfigStyle["config"]}>
            <div className={PropertyImagesConfigStyle['config__images-wrapper']}>
                <div className={PropertyImagesConfigStyle['config__image-container']}>
                    <img className={PropertyImagesConfigStyle["config__big-image"]} src={property?.media?.url}
                         alt={"image"}/>
                </div>
                <div className={PropertyImagesConfigStyle['config__short-images-container']}>

                    <img className={PropertyImagesConfigStyle["config__short-first"]}
                         src={propertyImagesGrid.length > 0 ? propertyImagesGrid[0] : ""} alt={"image"}/>
                    <img className={PropertyImagesConfigStyle["config__short-first"]}
                         src={propertyImagesGrid.length > 0 ? propertyImagesGrid[1] : ""} alt={"image"}/>
                    <img className={PropertyImagesConfigStyle["config__short-first"]}
                         src={propertyImagesGrid.length > 0 ? propertyImagesGrid[2] : ""} alt={"image"}/>
                    <img className={PropertyImagesConfigStyle["config__short-first"]}
                         src={propertyImagesGrid.length > 0 ? propertyImagesGrid[2] : ""} alt={"image"}/>

                </div>
                {propertyVariants.length > 0 &&
                    <div className={PropertyImagesConfigStyle['config__floor-img-container']}>
                        <img className={PropertyImagesConfigStyle["config__floor-plane-img"]}
                             src={propertyVariants[activeTabId]?.media?.url}
                             alt={"image"}/>
                    </div>
                }
            </div>

            <div className={PropertyImagesConfigStyle["swiper-wrapper"]}>
                <Swiper
                    // slidesPerView={2}
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
                        // 640: {
                        //     slidesPerView: 2,
                        //     spaceBetween: 20
                        // }
                    }}
                    pagination={{
                        clickable: true,
                        // renderBullet: function (index, className) {
                        //     return '<span class="' + className + '"></span>';
                        // },
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide key={1}>
                        <img className={PropertyImagesConfigStyle["swiper-image"]} src={property?.media?.url}
                             alt={"image"}/>
                    </SwiperSlide>
                    <SwiperSlide key={2}>
                        <img className={PropertyImagesConfigStyle["swiper-image"]}
                             src={propertyImagesGrid.length > 0 ? propertyImagesGrid[0] : ""} alt={"image"}/>
                    </SwiperSlide>
                    <SwiperSlide key={3}>
                        <img className={PropertyImagesConfigStyle["swiper-image"]}
                             src={propertyImagesGrid.length > 0 ? propertyImagesGrid[2] : ""} alt={"image"}/>
                    </SwiperSlide>
                    <SwiperSlide key={4}>
                        <img className={PropertyImagesConfigStyle["swiper-image"]}
                             src={propertyImagesGrid.length > 0 ? propertyImagesGrid[2] : ""} alt={"image"}/>
                    </SwiperSlide>
                </Swiper>
            </div>

            <div>
                <PropertyConfiguration property={property} setActiveConfiguration={setActiveTab}/>
            </div>

        </div>
    )
}

export default PropertyImagesConfig;
