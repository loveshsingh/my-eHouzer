import * as React from 'react'
import {useEffect, useState} from 'react'
import navbarStyles from './Navbar.module.css'
import AppDropdown from "../../../lib/AppDropdown";
import company_logo from "../../../../public/images/company-logo-01.png"
import Image from "next/image";
import ShortlistedDropdown from "../navbarComponents/ShortlistedDropdown";
import MenuDropdown from "../navbarComponents/MenuDropdown";
import LoginDropdown from "../navbarComponents/LoginDropdown";
import PropertyTypeDropdown from "../dropdowns/PropertyTypeDropdown";
import PriceRangeDropdown from "../dropdowns/PriceRangeDropdown";
import {useDispatch, useSelector} from "react-redux";
import {encryptListOfObject, getBudgetRangeTextFromSliderValue} from "../../../../helper/Utility";
import SelectedPropertyTypes from "../dropdowns/SelectedPropertyTypes";
import {useRouter} from "next/router";
import CheckOutsideClick from "../../../../base/CheckOutsideClick";
import {AppColors} from "../../../../public/AppColors";
import AppIcon from "../../../lib/AppIcon/AppIcon";
import {fetchAllProperties} from "../../../../actions/home";
import KeywordSearchDropdown from "../dropdowns/KeywordSearchDropdown";
import {setVisitInfo} from "../../../../actions/visit";
import {setSearchFilters} from "../../../../actions/search";

/**
 * @author Lovesh Singh.
 * @since 10-12-2022.
 * @description to render Navbar.
 * @return {JSX.Element}
 */
const Navbar = () => {

    const minBudget = useSelector((state) => state.searchReducer.minBudget);
    const maxBudget = useSelector((state) => state.searchReducer.maxBudget);
    const searchFilters = useSelector(((state) => state.searchReducer.searchFilters))
    const [selectedPropertyType, setSelectedPropertyType] = useState('')
    const [selectedRange, setSelectedRange] = useState('')
    const [showLocDropdown, setShowLocDropdown] = useState(false)
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(fetchAllProperties);
    }, [])

    useEffect(() => {
        if (minBudget > 0 || (maxBudget < 10.0 && maxBudget > 0)) {
            setSelectedRange(`${getBudgetRangeTextFromSliderValue(minBudget)}-${getBudgetRangeTextFromSliderValue(maxBudget)}`)
        } else {
            setSelectedRange("Select Range")
        }
    }, [minBudget, maxBudget])

    useEffect(() => {
        if (searchFilters?.minBudget > 0 || (searchFilters?.maxBudget < 10.0 && searchFilters?.maxBudget > 0)) {
            setSelectedRange(`${getBudgetRangeTextFromSliderValue(searchFilters?.minBudget)}-${getBudgetRangeTextFromSliderValue(searchFilters?.maxBudget)}`)
        } else {
            setSelectedRange("Select Range")
        }
    }, [searchFilters]);

    const handle = async () => {
        let updatedAreas = [];
        let updatedDevelopers = [];
        let updatedProperties = [];
        searchFilters.query.forEach((queryItem) => {
            const {type} = queryItem;

            switch (type) {
                case 'Location':
                    updatedAreas.push(queryItem?.name);
                    break;
                case 'Developer':
                    updatedDevelopers.push(queryItem?.name);
                    break;
                case 'Project':
                    updatedProperties.push(queryItem?.name);
                    break;
                default:
                    break;
            }
        });
        dispatch(setSearchFilters({
            ...searchFilters,
            areas: updatedAreas,
            developers: updatedDevelopers,
            properties: updatedProperties
        }));
    }

    const onPressSearch = async () => {
        await handle()
        router.pathname = '/search'
        if (searchFilters?.query?.length > 0) {
            const queryObject = searchFilters?.query
            const encryptedData = encryptListOfObject(queryObject);
            const queryNames = encryptedData.map((queryItem) => queryItem);
            router.query["query"] = queryNames.join(',');

        } else {
            delete router.query["query"];
        }
        if (searchFilters?.type?.length > 0) {
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
    const handleLogoClick = () => {
        router.replace('/')
          /*  .then(r => {
            dispatch(setVisitInfo({
                bookingDate: "",
                bookingTimeSlot: "",
                propertyId: "",
                type: ""
            }))
        })*/
    }

    return (
        <div className={navbarStyles["nav"]}>
            <div onClick={handleLogoClick} style={{cursor: "pointer"}}>
                <Image src={company_logo}
                       className={navbarStyles['nav__logo']}
                       alt={"company_logo"}/></div>
            {/*<Link href={"/"} ><Image src={company_logo} className={navbarStyles['nav__logo']}*/}
            {/*                        alt={"company_logo"}/></Link>*/}

            <div className={navbarStyles["nav__loc-wrapper"]}>
                <AppIcon name={'material-symbols:location-on'}
                         color={AppColors.roseWood}/>
                <p className={navbarStyles["nav__loc-name"]}>Faridabad</p>
            </div>

            <div className={navbarStyles["nav__search-wrapper"]}>

                <div className={navbarStyles["nav__loc-dropdown"]}>
                    <CheckOutsideClick onClickOutside={() => {
                        setShowLocDropdown(showLocDropdown)
                    }}>
                        <KeywordSearchDropdown showLocDropdown={showLocDropdown} setShowLocDropdown={setShowLocDropdown}
                                               listDropdownStyle={navbarStyles["nav__list__dropdown"]}/>
                    </CheckOutsideClick>
                </div>

                <div className={navbarStyles["nav__divider"]}/>

                <div className={navbarStyles["nav__property-type"]}>
                    <AppDropdown name={"Property Type"}
                                 selectedName={searchFilters?.type.length > 0 && searchFilters?.type?.[0]}
                                 nameStyle={navbarStyles["nav__loc-dropdown-text"]}
                                 selectedNameStyle={navbarStyles["nav__loc-dropdown-selected-text"]}
                                 icon={'material-symbols:arrow-drop-down'}
                                 iconStyle={navbarStyles["nav__dropdown-icon"]}
                                 dropdownComponent={<PropertyTypeDropdown/>}
                                 selectedDropdownComponent={<SelectedPropertyTypes/>} dropdownComponentStyle={{
                        position: "absolute",
                        width: "auto",
                        height: "auto",
                        marginTop: "1.5rem",
                    }}/>
                </div>

                <div className={navbarStyles["nav__divider"]}/>

                <div className={navbarStyles["nav__range_dropdown"]}>
                    <AppDropdown name={"Select Range"} selectedName={selectedRange}
                                 selectedNameStyle={navbarStyles["nav__loc-dropdown-text"]}
                                 nameStyle={navbarStyles["nav__loc-dropdown-text"]}
                                 icon={'material-symbols:arrow-drop-down'}
                                 iconStyle={navbarStyles["nav__dropdown-icon"]}
                                 dropdownComponent={<PriceRangeDropdown/>} dropdownComponentStyle={{
                        position: "absolute",
                        width: "auto",
                        height: "auto",
                        marginTop: "1.5rem",
                    }} selectedDropdownComponent={<PriceRangeDropdown/>}
                                 toShowSelectRange={true}/>
                </div>

                <div className={navbarStyles["nav__search-icon-wrapper"]} onClick={onPressSearch}>
                    <AppIcon name={'material-symbols:search'}
                             color={AppColors.white} size={22}/>
                </div>
            </div>

            <ShortlistedDropdown/>

            <LoginDropdown/>

            {/* <AppRoundButton buttonStyle={loginDropdownStyles["login-button-wrapper__button"]}
                            buttonText={"Admin login"}
                            type={"primary"} onClick={() => router.push("/admin-login")}/>*/}

            <MenuDropdown/>
        </div>
    )
}

export default Navbar;
