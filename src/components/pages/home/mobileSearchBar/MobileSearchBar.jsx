import React, {useEffect, useState} from "react";
import MobileSearchBarStyle from "./MobileSearchBar.module.css"
import CheckOutsideClick from "../../../../base/CheckOutsideClick";
import navbarStyles from "../navbar/Navbar.module.css";
import PriceRangeDropdown from "../dropdowns/PriceRangeDropdown";
import AppDropdown from "../../../lib/AppDropdown";
import PropertyTypeDropdown from "../dropdowns/PropertyTypeDropdown";
import SelectedPropertyTypes from "../dropdowns/SelectedPropertyTypes";
import {useDispatch, useSelector} from "react-redux";
import AppRoundButton from "../../../lib/AppRoundButton";
import {useRouter} from "next/router";
import {encryptListOfObject, getBudgetRangeTextFromSliderValue} from "../../../../helper/Utility";
import {AppColors} from "../../../../public/AppColors";
import AppIcon from "../../../lib/AppIcon/AppIcon";
import {setSearchFilters} from "../../../../actions/search";
import KeywordSearchDropdown from "../dropdowns/KeywordSearchDropdown";

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @constructor
 * @description mobile search bar Component.
 * @since 18-02-2023
 */
const MobileSearchBar = () => {

    const router = useRouter();
    const minBudget = useSelector((state) => state.searchReducer.minBudget);
    const maxBudget = useSelector((state) => state.searchReducer.maxBudget);
    const searchFilters = useSelector(((state) => state.searchReducer.searchFilters))
    const [selectedPropertyType, setSelectedPropertyType] = useState('')
    const [selectedRange, setSelectedRange] = useState('')
    const [showLocDropdown, setShowLocDropdown] = useState(false)
    const dispatch = useDispatch();
    const [showSearchInputs, setShowSearchInputs] = useState(false)


    useEffect(() => {
        if (minBudget > 0 || (maxBudget < 10.0 && maxBudget > 0)) {
            setSelectedRange(`${getBudgetRangeTextFromSliderValue(minBudget)}-${getBudgetRangeTextFromSliderValue(maxBudget)}`)
        } else {
            setSelectedRange("Select Range")
        }
    }, [minBudget, maxBudget])

    useEffect(() => {
        // setSelectedPropertyType(searchFilters?.type[0])


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

    const onPressDownArrow = () => {
        setShowSearchInputs(!showSearchInputs)
    }

    return (
        <div className={MobileSearchBarStyle["mobile-search-bar"]}>

            <div style={{display: showSearchInputs ? 'flex' : 'none'}}
                 className={MobileSearchBarStyle["mobile-search-bar__input-wrapper"]}>
                <div className={MobileSearchBarStyle["mobile-search-bar__input"]}>
                    <div style={{width: "100%"}}>
                        <CheckOutsideClick onClickOutside={() => {
                            setShowLocDropdown(showLocDropdown)
                        }}>
                            {/*<LocationDropdown showLocDropdown={showLocDropdown} setShowLocDropdown={setShowLocDropdown}
                                              listDropdownStyle={{
                                                  position: "absolute",
                                                  width: "auto",
                                                  height: "auto",
                                                  left: "0.5rem",
                                                  top: "3rem",
                                                  backgroundColor: "white"
                                              }}/>*/}
                            <KeywordSearchDropdown showLocDropdown={showLocDropdown}
                                                   setShowLocDropdown={setShowLocDropdown}
                                                   listDropdownStyle={navbarStyles["nav__list__dropdown"]}/>

                        </CheckOutsideClick>
                    </div>
                </div>

                <div className={MobileSearchBarStyle["mobile-search-bar__input"]}>
                    <AppDropdown name={"Choose property type"}
                                 selectedName={searchFilters?.type.length > 0 && searchFilters?.type?.[0]}
                                 nameStyle={navbarStyles["nav__loc-dropdown-text"]}
                                 selectedNameStyle={navbarStyles["nav__loc-dropdown-selected-text"]}
                                 icon={"material-symbols:arrow-drop-down"}
                                 iconStyle={navbarStyles["nav__dropdown-icon"]}
                                 dropdownComponent={<PropertyTypeDropdown/>}
                                 selectedDropdownComponent={<SelectedPropertyTypes/>} dropdownComponentStyle={{
                        position: "absolute",
                        width: "auto",
                        height: "auto",
                        left: "0.5rem",
                        top: "3rem"
                    }}/>
                </div>

                <div className={MobileSearchBarStyle["mobile-search-bar__input"]}>
                    <AppDropdown name={"Choose a Range"} selectedName={selectedRange}
                                 selectedNameStyle={navbarStyles["nav__loc-dropdown-text"]}
                                 nameStyle={navbarStyles["nav__loc-dropdown-text"]}
                                 icon={"material-symbols:arrow-drop-down"}
                                 iconStyle={navbarStyles["nav__dropdown-icon"]}
                                 dropdownComponent={<PriceRangeDropdown/>} dropdownComponentStyle={{
                        position: "absolute",
                        width: "auto",
                        height: "auto",
                        left: "0.5rem",
                        top: "3rem"
                    }} selectedDropdownComponent={<PriceRangeDropdown/>}
                                 toShowSelectRange={true}/>
                </div>
            </div>

            <div className={MobileSearchBarStyle["mobile-search-bar__button-wrapper"]}>
                <AppRoundButton buttonStyle={MobileSearchBarStyle["mobile-search-bar__button"]}
                                buttonText={"Search"}
                                type={"primary"} onClick={onPressSearch}/>
            </div>

            <div onClick={onPressDownArrow} className={MobileSearchBarStyle['mobile-search-bar__down-icon-wrapper']}>
                <AppIcon name={showSearchInputs ? 'ic:baseline-arrow-drop-up' : 'ic:baseline-arrow-drop-down'}
                         color={AppColors.parrotPink} size={30} style={{cursor: 'pointer'}}/>
            </div>
        </div>
    )
}


export default MobileSearchBar
