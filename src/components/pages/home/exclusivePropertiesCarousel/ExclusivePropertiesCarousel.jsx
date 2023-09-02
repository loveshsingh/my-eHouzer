import * as React from 'react'
import ExclusiveProperty from "../exclusiveProperty/ExclusiveProperty";
import ExclusivePropertiesStyle from "./ExclusivePropertiesCarousel.module.css"
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import "swiper/css/free-mode";
import "swiper/css/pagination";
import 'swiper/swiper-bundle.css';
import {Pagination} from "swiper";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {setSearchFilters} from "../../../../actions/search";

/**
 * @author Lovesh Singh.
 * @since 10-12-2022.
 * @description to render Navbar.
 * @return {JSX.Element}
 */
const ExclusivePropertiesCarousel = () => {
    const {exclusiveProperties} = useSelector((state) => state.homeReducer)

    const dispatch = useDispatch()
    const router = useRouter();

    const onClickViewMore = (condition) => {
        dispatch(setSearchFilters({[condition]: true}))
        router.pathname = '/search'
        router.query[condition] = "true"
        router.push(router)
    }

    return (
        <div className={`exc-carousel ${ExclusivePropertiesStyle["exc-properties-wrapper"]}`}>
            <div className={ExclusivePropertiesStyle["exc-properties-container"]}>
                <div className={ExclusivePropertiesStyle["exc-properties__heading-wrapper"]}>

                    <h1 className={ExclusivePropertiesStyle["exc-properties__heading"]}>Exclusive Properties</h1>
                    <p onClick={() => onClickViewMore("exclusive")}
                       className={ExclusivePropertiesStyle["exc-properties__view-more"]}>
                        View More
                    </p>
                </div>
            </div>


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
                {exclusiveProperties && exclusiveProperties.map((property) => {
                    return (<SwiperSlide key={property.id}>
                        <ExclusiveProperty property={property}/>
                    </SwiperSlide>)
                })}
            </Swiper>
        </div>
    )
}

export default ExclusivePropertiesCarousel;
