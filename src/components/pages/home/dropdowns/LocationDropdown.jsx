import React, {useEffect, useRef, useState} from "react";
import LocationDropdownStyle from "../../../../styles/componentStyles/dropdownStyles/LocationDropdown.module.css"
import {useDispatch, useSelector} from "react-redux";
import navbarStyles from "../navbar/Navbar.module.css";
import SelectedPropertyTypesStyle
    from "../../../../styles/componentStyles/dropdownStyles/SelectedPropertyTypes.module.css";
import CheckOutsideClick from "../../../../base/CheckOutsideClick";
import {setSearchFilters} from "../../../../actions/search";
import {AppColors} from "../../../../public/AppColors";
import AppIcon from "../../../lib/AppIcon/AppIcon";

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @constructor
 * @description Location Dropdown Component.
 * @since 10-12-2022
 */
const LocationDropdown = ({listDropdownStyle, showLocDropdown, setShowLocDropdown}) => {

    const [showLocInput, setShowLocInput] = useState(false)
    // const [showLocDropdown, setShowLocDropdown] = useState(false)
    const [showSelectedQueries, setShowSelectedQueries] = useState(false)
    const locInputRef = useRef(null)
    const [selectedQuery, setSelectedQuery] = useState('')
    const [query, setQuery] = useState([])
    const searchFilters = useSelector(((state) => state.searchReducer.searchFilters))

    const dispatch = useDispatch()

    useEffect(() => {
        setSelectedQuery(searchFilters?.query[0])
    }, [searchFilters]);

    useEffect(() => {
    }, [selectedQuery]);


    const onPressLocText = () => {
        setShowLocInput(!showLocInput)
    }

    const onFocusLocInput = () => {
        setShowLocDropdown(true)
    }

    const onPressProperty = (value) => {
        if (!query.includes(value)) {
            setQuery([...query, value])
        } else {
            setQuery(query.filter((propertyValue) => propertyValue !== value))
        }
        setShowLocDropdown(false)
    }

    useEffect(() => {
        dispatch(setSearchFilters({query}))
    }, [query]);


    return (
        <>
            <div style={{
                position: "relative",
                display: 'flex',
                height: "fit-content",
                alignItems: "center",
                cursor: "pointer"
            }}>
                {selectedQuery ? <p className={navbarStyles["nav__loc-dropdown-selected-text"]} onClick={() => {
                        setShowSelectedQueries(!showSelectedQueries)
                        setShowLocDropdown(false)
                        // setShow(false)
                    }}>{searchFilters?.query.length > 1 ? selectedQuery.displayName + '...' : selectedQuery.displayName}</p> :
                    <p style={{display: !showLocInput ? 'flex' : 'none',}}
                       className={navbarStyles["nav__loc-dropdown-text"]} onClick={() => onPressLocText()}>Select
                        Location</p>}
                <input ref={locInputRef} onFocus={onFocusLocInput}
                       style={{display: showLocInput ? 'flex' : 'none'}} type={"text"}
                       className={navbarStyles["nav__loc-input"]} placeholder={"Enter property"}/>
                <AppIcon name={'material-symbols:my-location-rounded'} onClick={onFocusLocInput}
                         color={AppColors.sonicSilver} size={13} style={{marginLeft: '0.3rem'}}/>

            </div>
            {/*<CheckOutsideClick onClickOutside={() => {*/}
            {/*    setShowLocDropdown(showLocDropdown)*/}
            {/*}}>*/}
            <div>

                {showLocDropdown ? <div style={listDropdownStyle}>
                    <PropertiesListDropdown onPress={onPressProperty} showLocDropdown={showLocDropdown}
                                            setShowLocDropdown={setShowLocDropdown}/>
                </div> : null}
            </div>
            {/*</CheckOutsideClick>*/}
            <CheckOutsideClick onClickOutside={() => {
                setShowSelectedQueries(showSelectedQueries)
            }}>

                {showSelectedQueries ? <div style={listDropdownStyle}>
                    <SelectedQueriesModal queryData={query} setQuery={setQuery}/>
                </div> : null}
            </CheckOutsideClick>
        </>
    )
}

const SelectedQueriesModal = ({queryData, setQuery}) => {

    const selectedSearchQuery = useSelector(((state) => state.searchReducer.searchFilters?.query))

    const onPressQuery = (value) => {
        setQueryValue(value)
    }

    const setQueryValue = (value) => {
        if (!queryData.includes(value)) {
            setQuery([...queryData, value])
        } else {
            setQuery(queryData.filter((queryValue) => queryValue !== value))
        }
    }


    return (
        <div className={selectedSearchQuery.length > 0 ? SelectedPropertyTypesStyle["selected-property-types"] : SelectedPropertyTypesStyle["selected-property-hide"]}>
            {selectedSearchQuery.length > 0 && selectedSearchQuery.map((query) => {
                return <SelectedProperty key={query} query={query} queryValue={query} active={true}
                                         onPress={onPressQuery}/>
            })}

        </div>
    )
}

const SelectedProperty = ({query, queryValue, active, onPress}) => {

    const onPressSelectedProperty = () => {
        onPress(queryValue)
    }

    return (
        <div
            className={SelectedPropertyTypesStyle[active ? "property-type-dropdown__type-wrapper--active" : "property-type-dropdown__type-wrapper"]}
            onClick={() => onPressSelectedProperty()}>
            <p className={SelectedPropertyTypesStyle["selected-property-types__text"]}>{query}</p>
            <AppIcon name={'material-symbols:close-rounded'}
                     color={AppColors.jasper} style={{marginLeft: '0.5rem'}}/>
        </div>
    )
}

const PropertiesListDropdown = ({onPress}) => {

    const allProperties = useSelector((state) => state.homeReducer.allProperties);
    const selectedSearchQuery = useSelector(((state) => state.searchReducer.searchFilters?.query))

    const onPressProperty = (value) => {
        onPress(value)
    }

    return (
        <div className={LocationDropdownStyle["location-dropdown"]}>
            <div style={{
                width: "100%",
                height: '10%',
                display: "flex",
                alignItems: "center",
                padding: "1rem",
                paddingBottom: '0.5rem',
                backgroundColor: "#fffff",
            }}>
                <h1 style={{fontSize: '1.3rem', color: '#747474', fontWeight: 500}}>Properties List</h1>
            </div>
            <ul className={LocationDropdownStyle["location-dropdown__list-wrapper"]}>
                {
                    allProperties.length > 0 ? allProperties.map((property) => {
                            return (
                                <li key={property.id}
                                    className={selectedSearchQuery.includes(property?.name) ? LocationDropdownStyle["location-dropdown__list--active"] : LocationDropdownStyle["location-dropdown__list"]}
                                    onClick={() => onPressProperty(property?.name)}>{property?.name}</li>
                            )
                        }) :
                        <h1 style={{color: '#747474', fontWeight: 500, fontSize: '1.5rem', textAlign: "center"}}>No data
                            found</h1>
                }
            </ul>
        </div>
    )
}


export default LocationDropdown
