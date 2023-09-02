import React, {useEffect, useState} from "react";
import shortlistedDropdownStyles
    from "../../../../styles/componentStyles/navbarComponentsStyles/ShortlistedDropdown.module.css"
import Image from "next/image";
import {useSelector} from "react-redux";
import CheckOutsideClick from "../../../../base/CheckOutsideClick";
import {useShortlisted} from "../../../../base/contexts/ShortlistedProvider";
import AppIcon from "../../../lib/AppIcon/AppIcon";
import {AppColors} from "../../../../public/AppColors";
import {useRouter} from "next/router";

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @constructor
 * @description shortlisted Dropdown Component.
 * @since 10-01-2023
 */
const ShortlistedDropdown = () => {
    const {shortlistedProperties} = useSelector((state) => state.authReducer);
    const [shakeShortlisted, setShakeShortlisted] = useState(false)

    useEffect(() => {
        setShakeShortlisted(true)
        setTimeout(function () {
            setShakeShortlisted(false)
        }, 200);
    }, [shortlistedProperties]);

    const [show, setShow] = useState(false)

    const onClick = () => {
        setShow(!show)
    }
    useEffect(() => {
        // add event listener to toggle body overflow when dropdown is shown/hidden
        if (show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }

        // cleanup function to remove event listener
        return () => {
            document.body.style.overflow = "visible";
        };
    }, [show]);


    return (
        <>
            <div className={shortlistedDropdownStyles["shortlisted"]}>
                <div className={shortlistedDropdownStyles["shortlisted__container"]} onClick={() => onClick()}>

                    <div
                        className={shakeShortlisted ? shortlistedDropdownStyles["shortlisted__wrapper--shake"] : shortlistedDropdownStyles["shortlisted__wrapper"]}>
                        <AppIcon name={'material-symbols:favorite'} color={AppColors.white}/>
                        <div style={{display: shortlistedProperties.length > 0 ? "flex" : "none"}}
                             className={shortlistedDropdownStyles["shortlisted__badge"]}>
                            <p className={shortlistedDropdownStyles["shortlisted__badge-text"]}>{shortlistedProperties.length}</p>
                        </div>
                    </div>

                    <p className={shortlistedDropdownStyles["shortlisted__text"]}>Shortlisted</p>
                </div>

                <CheckOutsideClick onClickOutside={() => {
                    setShow(show)
                }}>
                    <div
                        className={show ? shortlistedDropdownStyles["shortlisted__dropdown--show"] : shortlistedDropdownStyles["shortlisted__dropdown--hide"]}>
                        <div className={shortlistedDropdownStyles["shortlisted__dropdown-header"]}>
                            <p className={shortlistedDropdownStyles["shortlisted__dropdown-heading"]}>Shortlisted({shortlistedProperties.length})</p>
                            <AppIcon name={'material-symbols:close-rounded'}
                                     color={AppColors.roseGold} size={22} style={{cursor: 'pointer'}}
                                     onClick={() => onClick()}/>
                        </div>
                        <div className={shortlistedDropdownStyles["shortlisted__dropdown-list-container"]}>
                            {shortlistedProperties.length > 0 ? shortlistedProperties.map((property) => {
                                return (<ShortlistedCard key={property?.id} property={property} onClick={onClick}/>)
                            }) : <div className={shortlistedDropdownStyles["shortlisted-card__property-name"]}>No
                                Property Found!!</div>}
                        </div>
                    </div>
                </CheckOutsideClick>
            </div>
        </>
    )
}

const ShortlistedCard = ({property, onClick}) => {
    const router = useRouter();
    const {shortlisted} = useShortlisted()

    /**
     * @author Vikrant
     * @since 25-04-2023.
     * @description on click book property.
     * @return {JSX.Element}
     */
    const onClickBookPropertyView = (propertyId) => {
        onClick();
        router.pathname = '/booking'
        router.query["pid"] = propertyId
        router.push(router)
    }

    return (
        <div className={shortlistedDropdownStyles["shortlisted-card"]}>

            <Image src={property?.media?.url} height={100} width={100} alt={"text"}
                   onClick={() => onClickBookPropertyView(property?.id)}
                   className={shortlistedDropdownStyles["shortlisted-card__image"]}/>

            <div className={shortlistedDropdownStyles["shortlisted-card__details-wrapper"]}
                 onClick={() => onClickBookPropertyView(property?.id)}
            >

                <p className={shortlistedDropdownStyles["shortlisted-card__property-name"]}>{property.name}</p>
                <p className={shortlistedDropdownStyles["shortlisted-card__property-loc"]}>{property.city}</p>
            </div>

            <AppIcon name={'ic:baseline-delete'}
                     color={AppColors.roseGold} size={22} style={{cursor: 'pointer', marginLeft: 'auto'}}
                     onClick={() => shortlisted(property)}/>
        </div>
    )
}

export default ShortlistedDropdown
