import * as React from 'react'
import {useEffect, useState} from 'react'
import BannerStyle from "./BannerStyle.module.css"
import bannerImage from "../../../../public/images/headerImage.png";
import Image from "next/image";
import AppDropdown from "../../../lib/AppDropdown";
import PropertyTypeDropdown from "../dropdowns/PropertyTypeDropdown";
import PriceRangeDropdown from "../dropdowns/PriceRangeDropdown";
import LocationDropdown from "../dropdowns/LocationDropdown";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import {getBudgetRangeTextFromSliderValue} from "../../../../helper/Utility";
import navbarStyles from "../navbar/Navbar.module.css";
import SelectedPropertyTypes from "../dropdowns/SelectedPropertyTypes";
import CheckOutsideClick from "../../../../base/CheckOutsideClick";
import {AppColors} from "../../../../public/AppColors";
import AppIcon from "../../../lib/AppIcon/AppIcon";

/**
 * @author Lovesh Singh.
 * @since 10-12-2022.
 * @description to render Navbar.
 * @return {JSX.Element}
 */
const Banner = ({bannerText, bannerDesc}) => {
    const minBudget = useSelector((state) => state.searchReducer.minBudget);
    const maxBudget = useSelector((state) => state.searchReducer.maxBudget);
    const [selectRangeLabel, setSelectRangeLabel] = useState("Select Range")
    const searchFilters = useSelector(((state) => state.searchReducer.searchFilters))
    const [selectedPropertyType, setSelectedPropertyType] = useState('')
    const [selectedRange, setSelectedRange] = useState('')
    const router = useRouter();
    const [showLocDropdown, setShowLocDropdown] = useState(false)

    useEffect(() => {
        if (minBudget > 0 || (maxBudget < 10.0 && maxBudget > 0)) {
            setSelectedRange(`${getBudgetRangeTextFromSliderValue(minBudget)}-${getBudgetRangeTextFromSliderValue(maxBudget)}`)
        } else {
            setSelectedRange("Select Range")
        }
    }, [minBudget, maxBudget])

    const getValue = (value) => {
        switch (value) {
            case '0':
                return "0";
            case '0.1':
                return "10 Lacs";
            case '0.25':
                return "25 Lacs";
            case '0.50':
                return "50 Lacs";
            case '1.0':
                return "1 Cr";
            case '5.0':
                return "5 Cr";
            case '10.0':
                return "10 Cr";
            default:
                return ""
        }
    }

    useEffect(() => {
        setSelectedPropertyType(searchFilters?.type[0])
        if (searchFilters?.minBudget > 0 || (searchFilters?.maxBudget < 10.0 && searchFilters?.maxBudget > 0)) {
            setSelectedRange(`${getBudgetRangeTextFromSliderValue(searchFilters?.minBudget)}-${getBudgetRangeTextFromSliderValue(searchFilters?.maxBudget)}`)
        } else {
            setSelectedRange("Select Range")
        }
    }, [searchFilters]);


    const onPressSearch = () => {
        router.pathname = '/search'
        if (searchFilters?.query.length > 0) {
            router.query["query"] = searchFilters?.query.join(',')
        } else {
            delete router.query["query"];
        }
        if (searchFilters?.type.length > 0) {
            router.query["type"] = searchFilters?.type.join(',')
        } else {
            delete router.query["type"];
        }
        if (searchFilters?.minBudget && searchFilters?.maxBudget) {
            router.query["minBudget"] = searchFilters?.minBudget
            router.query["maxBudget"] = searchFilters?.maxBudget
        } else {
            delete router.query["minBudget"];
            delete router.query["maxBudget"];
        }
        router.push(router)
    }

    return (

        <div className={BannerStyle["banner"]}>

            <Image src={bannerImage} alt={"text"} className={BannerStyle["banner__image"]}/>

            <div className={BannerStyle["banner__details-wrapper"]}>

                <h1 className={BannerStyle["banner__brand-title"]}>Find Your Best <br/>Smart Real Estate</h1>

                <h1 className={BannerStyle["banner__brand-desc"]}>Lorem ipsum dolor sit amte,
                    consectetur <br/> adipsicing
                    elit <br/> Lorem ipusm doloe sit amet, consecture adispicing elit.</h1>
            </div>


            {/*Search bar at banner*/}
            {/*<div className={BannerStyle["banner__search-wrapper"]}>

                <div className={BannerStyle["banner__property-wrapper"]}>

                    <p className={BannerStyle["banner__property-type_text"]}>Property
                        Type</p>
                    <AppDropdown name={"Choose property type"}
                                 nameStyle={BannerStyle["banner__property-dropdown-text"]}
                                 icon={"arrow_drop_down"}
                                 iconStyle={BannerStyle["banner__property-dropdown-icon"]}
                                 dropdownComponent={<PropertyTypeDropdown/>} dropdownComponentStyle={{
                        position: "absolute",
                        width: "auto",
                        height: "auto",
                        left: "3rem",
                        bottom: "5.5rem"
                    }}/>
                    <AppDropdown name={"Choose property type"}
                                 selectedName={searchFilters?.type.length > 1 ? selectedPropertyType + '...' : selectedPropertyType}
                                 nameStyle={navbarStyles["nav__loc-dropdown-text"]}
                                 selectedNameStyle={navbarStyles["nav__loc-dropdown-selected-text"]}
                                 icon={'material-symbols:arrow-drop-down'}
                                 iconStyle={navbarStyles["nav__dropdown-icon"]}
                                 dropdownComponent={<PropertyTypeDropdown/>}
                                 selectedDropdownComponent={<SelectedPropertyTypes/>} dropdownComponentStyle={{
                        position: "absolute",
                        width: "auto",
                        height: "auto",
                        left: "3rem",
                        bottom: "5.5rem"
                    }}/>
                </div>

                <div className={BannerStyle["banner__divider"]}/>

                <div className={BannerStyle["banner__price-range-wrapper"]}>

                    <p className={BannerStyle["banner__price-range_text"]}>Price
                        Range</p>
                    <AppDropdown name={"Choose a Range"}
                                 nameStyle={BannerStyle["banner__price-range-dropdown-text"]}
                                 icon={"arrow_drop_down"}
                                 iconStyle={BannerStyle["banner__price-range-dropdown-icon"]}
                                 dropdownComponent={<PriceRangeDropdown/>} dropdownComponentStyle={{
                        position: "absolute",
                        width: "auto",
                        height: "auto",
                        left: "13rem",
                        bottom: "5.5rem"
                    }}/>
                    <AppDropdown name={"Choose a Range"} selectedName={selectedRange}
                                 selectedNameStyle={navbarStyles["nav__loc-dropdown-text"]}
                                 nameStyle={navbarStyles["nav__loc-dropdown-text"]}
                                 icon={'material-symbols:arrow-drop-down'}
                                 iconStyle={navbarStyles["nav__dropdown-icon"]}
                                 dropdownComponent={<PriceRangeDropdown/>} dropdownComponentStyle={{
                        position: "absolute",
                        width: "auto",
                        height: "auto",
                        left: "13rem",
                        bottom: "5.5rem"
                    }} selectedDropdownComponent={<PriceRangeDropdown/>}/>

                </div>

                <div className={BannerStyle["banner__divider"]}/>

                <div className={BannerStyle["banner__location-wrapper"]}>

                    <p className={BannerStyle["banner__location_text"]}>Location</p>
                    <CheckOutsideClick onClickOutside={() => {
                        setShowLocDropdown(showLocDropdown)
                    }}>
                        <LocationDropdown showLocDropdown={showLocDropdown} setShowLocDropdown={setShowLocDropdown}
                                          listDropdownStyle={{
                                              position: "absolute",
                                              width: "auto",
                                              height: "auto",
                                              left: "13rem",
                                              bottom: "5.5rem"
                                          }}/>
                    </CheckOutsideClick>

                </div>

                <button className={BannerStyle["banner__search-button"]} onClick={onPressSearch}>

                    <AppIcon name={'material-symbols:search'}
                             color={AppColors.white} size={25} style={{marginRight: '0.5rem'}}/>
                    <p className={BannerStyle["banner__search-text"]}>Search</p>
                </button>
            </div>*/}
        </div>
    )
}

export default Banner;
