import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setSearchFilters} from "../../../../actions/search";
import navbarStyles from "../navbar/Navbar.module.css";
import AppIcon from "../../../lib/AppIcon/AppIcon";
import {AppColors} from "../../../../public/AppColors";
import CheckOutsideClick from "../../../../base/CheckOutsideClick";
import SelectedPropertyTypesStyle
    from "../../../../styles/componentStyles/dropdownStyles/SelectedPropertyTypes.module.css";
import KeywordSearchDropdownStyle
    from "../../../../styles/componentStyles/dropdownStyles/KeywordSearchDropdown.module.css";
import {keywordSearch} from "../../../../actions/home";
import {useApp} from "../../../../base/contexts/AppProvider";

const KeywordSearchDropdown = ({listDropdownStyle, showLocDropdown, setShowLocDropdown}) => {
    const [showLocInput, setShowLocInput] = useState(false)
    const [showSelectedQueries, setShowSelectedQueries] = useState(false)
    const locInputRef = useRef(null)
    const searchFilters = useSelector(((state) => state.searchReducer.searchFilters))
    const searchFilterQuery = useSelector(((state) => state.searchReducer.searchFilters?.query))

    const dispatch = useDispatch()

    const onPressLocText = () => {
        setShowLocInput(!showLocInput)
    }

    const onFocusLocInput = () => {
        setShowLocDropdown(true)
    }

    const onPressProperty = (data) => {
        if (data) {

            const oldQuery = searchFilterQuery //[1,2,3,4,5] // [[], [] []]
            let updatedQuery = [...oldQuery] //[1,2,3,4,5]
            if (data && updatedQuery.length < 2) {
                if (!updatedQuery.includes(data)) {
                    updatedQuery.push(data);
                } else {
                    updatedQuery = updatedQuery.filter((queryValue) => queryValue !== data);
                }
            } else if (updatedQuery.includes(data)) {
                updatedQuery = updatedQuery.filter((queryValue) => queryValue !== data);
            }

            dispatch(setSearchFilters({...searchFilters, query: updatedQuery}));
        }
        setShowLocDropdown(false)
    }

    const handleChange = (event) => {
        const value = event.target.value;

        const keywordSearchData = {
            cityId: "1",
            keyword: value
        }
        if (value.length > 2) {
            dispatch(keywordSearch(keywordSearchData));
        }
    }

    useEffect(() => {
    }, [showSelectedQueries])


    return (
        <>
            <div style={{
                position: "relative",
                display: 'flex',
                height: "fit-content",
                alignItems: "center",
                cursor: "pointer"
            }}>
                {searchFilterQuery && searchFilterQuery[0] && (
                    <p
                        className={navbarStyles["nav__loc-dropdown-selected-text"]}
                        onClick={() => {
                            setShowSelectedQueries(!showSelectedQueries);
                            setShowLocDropdown(false);
                        }}
                    >

                        {searchFilterQuery[0].displayName.substring(0, 5) + '...'}
                    </p>
                )}

                <input ref={locInputRef} onChange={handleChange} onFocus={onFocusLocInput}
                       style={{display: 'flex'}} type={"text"}
                       className={navbarStyles["nav__loc-input"]} placeholder={"Enter property"}/>
                <AppIcon name={'material-symbols:my-location-rounded'} onClick={onFocusLocInput}
                         color={AppColors.sonicSilver} size={13} style={{marginLeft: '0.3rem'}}/>

            </div>
            <div>
                {showLocDropdown ? <div className={listDropdownStyle}>
                    <PropertiesListDropdown onPress={onPressProperty} showLocDropdown={showLocDropdown}
                                            setShowLocDropdown={setShowLocDropdown}/>
                </div> : null}
            </div>
            <CheckOutsideClick onClickOutside={() => {
                setShowSelectedQueries(showSelectedQueries)
            }}>
                {showSelectedQueries ? <div
                    className={navbarStyles["SelectedQueriesModal-wrapper"]}
                >
                    <SelectedQueriesModal/>
                </div> : null}
            </CheckOutsideClick>
        </>
    )
}

const SelectedQueriesModal = () => {
    const selectedSearchQuery = useSelector(((state) => state.searchReducer.searchFilters?.query))

    return (
        <div
            className={selectedSearchQuery.length > 0 ? SelectedPropertyTypesStyle["selected-property-types"] : SelectedPropertyTypesStyle["selected-property-hide"]}>
            {selectedSearchQuery.length > 0 && selectedSearchQuery.map((query, index) => {
                return <SelectedProperty key={index} query={query} active={true}/>
            })}

        </div>
    )
}

const SelectedProperty = ({query, active}) => {


    const searchFilters = useSelector(((state) => state.searchReducer.searchFilters))
    const searchFilterQuery = useSelector(((state) => state.searchReducer.searchFilters?.query))
    const dispatch = useDispatch();

    /* To make chips*/
    const onPressSelectedProperty = () => {

        const oldQuery = searchFilterQuery //[1,2,3,4,5] // [[], [] []]
        let updatedQuery = [...oldQuery] //[1,2,3,4,5]
        if (query && updatedQuery.length < 2) {
            if (!updatedQuery.includes(query)) {
                updatedQuery.push(query);
            } else {
                updatedQuery = updatedQuery.filter((queryValue) => queryValue !== query);
            }
        } else if (updatedQuery.includes(query)) {
            updatedQuery = updatedQuery.filter((queryValue) => queryValue !== query);
        }


        dispatch(setSearchFilters({...searchFilters, query: updatedQuery}));
        // dispatch(setSearchFilters({query}))
    }
    return (
        <div
            className={SelectedPropertyTypesStyle[active ? "property-type-dropdown__type-wrapper--active" : "property-type-dropdown__type-wrapper"]}
            onClick={() => onPressSelectedProperty()}>
            <p className={SelectedPropertyTypesStyle["selected-property-types__text"]}>{query.displayName}</p>
            <AppIcon name={'material-symbols:close-rounded'}
                     color={AppColors.jasper} style={{marginLeft: '0.5rem'}}/>
        </div>
    )
}

const PropertiesListDropdown = ({onPress}) => {

    const searchedData = useSelector((state) => state.homeReducer.searchedData);
    const selectedSearchProperties = useSelector(((state) => state.searchReducer.searchFilters?.query))
    const onPressProperty = (data) => {
        onPress(data)
    }

    return (
        <div className={KeywordSearchDropdownStyle["keyword-search-dropdown"]}>
            <ul className={KeywordSearchDropdownStyle["keyword-search-dropdown__list-wrapper"]}>
                {
                    searchedData.length > 0 ? searchedData.map((data, index) => {
                            return (
                                <li key={index}
                                    className={selectedSearchProperties?.find((obj) => data.name === obj.name) ? KeywordSearchDropdownStyle["keyword-search-dropdown__list--active"] : KeywordSearchDropdownStyle["keyword-search-dropdown__list"]}
                                    onClick={() => onPressProperty(data)}>{data.displayName} (<span
                                    style={{color: "red"}}>{data.type}</span>)</li>
                            )
                        }) :
                        <h1 className={KeywordSearchDropdownStyle["keyword-search__dropdown__empty_msg"]}>
                            No data found
                        </h1>
                }
            </ul>
        </div>
    )
}

export default KeywordSearchDropdown
