import React, {useEffect} from 'react';
import LoaderStyle from "./loader.module.css"
import {useSelector} from "react-redux";

const FullPageLoader = () => {
    const isLoading = useSelector(((state) => +state.commonLoadingReducer.loadingCount)) > 0

    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isLoading]);

    return (
        isLoading ?
            <div className={LoaderStyle["fp-container"]}>
                <div className={LoaderStyle['fp-loader loader__container']}>
                    {/*           <Image src={houseLoader} alt={'loading'}/>*/}
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                         width="50px" height="50px" viewBox="0 0 24 30" /*style="enable-background:new 0 0 50 50;"*/ >
                        <rect x="0" y="0" width="4" height="10" fill="#B0474C">
                            <animateTransform attributeType="xml"
                                              attributeName="transform" type="translate"
                                              values="0 0; 0 20; 0 0"
                                              begin="0" dur="0.6s" repeatCount="indefinite"/>
                        </rect>
                        <rect x="10" y="0" width="4" height="10" fill="#B0474C">
                            <animateTransform attributeType="xml"
                                              attributeName="transform" type="translate"
                                              values="0 0; 0 20; 0 0"
                                              begin="0.2s" dur="0.6s" repeatCount="indefinite"/>
                        </rect>
                        <rect x="20" y="0" width="4" height="10" fill="#B0474C">
                            <animateTransform attributeType="xml"
                                              attributeName="transform" type="translate"
                                              values="0 0; 0 20; 0 0"
                                              begin="0.4s" dur="0.6s" repeatCount="indefinite"/>
                        </rect>
                    </svg>
                </div>
            </div> : null
    )
}
export default FullPageLoader;
