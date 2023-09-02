import * as React from 'react'
import {useEffect, useState} from 'react'
import PropertyImagesGridStyle from "./PropertyImagesGrid.module.css";
import {useSelector} from "react-redux";
import {Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import ExclusiveProperty from "../../home/exclusiveProperty/ExclusiveProperty";
import CustomersPopup from "../../../adminComponents/pages/ce/cePopupComponents/customersPopup/CustomersPopup";
import AppModal from "../../../lib/AppModal/AppModal";
import AppBookingImageCarousel from "../../../lib/AppBookingImageCarousel/AppBookingImageCarousel";
import {displayCustomerPopupAction} from "../../../../actions/adminActions/customerPopupTable";

/**
 * @author Lovesh Singh.
 * @since 19-12-2022.
 * @description to render top developer tab.
 * @return {JSX.Element}
 */
const PropertyImagesGrid = () => {
    const {property} = useSelector((state) => state.bookingReducer)
    const [showImagePopup, setShowImagePopup] = useState(false)
    const [propertyImagesGrid, setPropertyImagesGrid] = useState([]);

    /**
     * @author Vipul Garg
     * @since 30-05-2023
     * @description to close the Image Popup
     */
    const onClickCloseImagePopup = () => {
        setShowImagePopup(!showImagePopup)
    };

    /**
     * @author Vipul Garg
     * @since 30-05-2023
     * @description to handle display popup
     */
    const onDisplayPopupHandle = () => {
        setShowImagePopup(!showImagePopup)
        document.body.style.overflow = 'hidden';
    }

    useEffect(() => {
        if (property && property?.medias) {
            setPropertyImagesGrid(property?.medias?.map((media) => {
                return media.url
            }));
        }
    }, [property]);


    // console.log("imageUrls",propertyImagesGrid)
    return (
        <div>
            <AppModal
                onClose={onClickCloseImagePopup}
                show={showImagePopup}
                changeBackground={true}
            >
                <AppBookingImageCarousel show={showImagePopup} onClose={onClickCloseImagePopup} property={property}/>
            </AppModal>

        <div className={PropertyImagesGridStyle["grid"]}>
            {/*<div className={PropertyImagesGridStyle["grid__big-image"]}>*/}
            {/*</div>*/}
            <img className={PropertyImagesGridStyle["grid__big-image"]} src={property?.media?.url} alt={"image"}/>
            <img className={PropertyImagesGridStyle["grid__short-first"]}
                 src={propertyImagesGrid.length > 0 ? propertyImagesGrid[0] : ""} alt={"image"}/>
            <img className={PropertyImagesGridStyle["grid__short-second"]}
                 src={propertyImagesGrid.length > 0 ? propertyImagesGrid[1] : ""} alt={"image"}/>

            <div className={PropertyImagesGridStyle["grid__short-third"]} onClick={() => onDisplayPopupHandle()}>
                <img className={PropertyImagesGridStyle["grid__short-third-image"]}
                     src={propertyImagesGrid.length > 0 ? propertyImagesGrid[2] : ""} alt={"image"}/>
                <div className={PropertyImagesGridStyle["grid__more-photos"]}>
                    <p className={PropertyImagesGridStyle["grid__more-photos-text"]}>more+</p>
                </div>
            </div>
        </div>
        <div className={PropertyImagesGridStyle["swiper-wrapper"]}>
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
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20
                }
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

                 <img className={PropertyImagesGridStyle["swiper-image"]} src={property?.media?.url} alt={"image"}/>
                </SwiperSlide>
            <SwiperSlide key={2}>
                 <img className={PropertyImagesGridStyle["swiper-image"]}
                      src={propertyImagesGrid.length > 0 ? propertyImagesGrid[0] : ""} alt={"image"}/>
            </SwiperSlide>
                <SwiperSlide key={3}>
                <img className={PropertyImagesGridStyle["swiper-image"]}
                      src={propertyImagesGrid.length > 0 ? propertyImagesGrid[1] : ""} alt={"image"}/>
                </SwiperSlide>
            <SwiperSlide key={4}>
            <img className={PropertyImagesGridStyle["swiper-image"]}
                 src={propertyImagesGrid.length > 0 ? propertyImagesGrid[2] : ""}  alt={"image"}/>
            </SwiperSlide>
        </Swiper>
        </div>
        </div>
    )
}

export default PropertyImagesGrid;
