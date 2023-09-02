import React, {useEffect, useState} from "react";
import PropertyFilterDropdownStyle
    from "../../../../styles/componentStyles/dropdownStyles/PropertyFilterDropdown.module.css"
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {AmentiesList, AreaList, BathroomsList, ConfigurationList, StatusList} from "../../../../helper/Utility";
import {AppColors} from "../../../../public/AppColors";
import AppIcon from "../../../lib/AppIcon/AppIcon";
import {setSearchFilters} from "../../../../actions/search";

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @constructor
 * @description Property type Dropdown Component.
 * @since 10-12-2022
 */
const PropertyFilterDropdown = ({handleClick}) => {

    const [showConstructionStatus, setShowConstructionStatus] = useState(true)
    const [showArea, setShowArea] = useState(false)
    const [showConfiguration, setShowConfiguration] = useState(false)
    const [showBathrooms, setShowBathrooms] = useState(false)
    const [showAmenities, setShowAmenities] = useState(false)
    const [status, setStatus] = useState([])
    const [minReraCarpetArea, setMinReraCarpetArea] = useState('')
    const [maxReraCarpetArea, setMaxReraCarpetArea] = useState('')
    const [configuration, setConfiguration] = useState([])
    const [amenities, setAmenities] = useState([])
    const [bathrooms, setBathrooms] = useState('')
    const searchFilters = useSelector(((state) => state.searchReducer?.searchFilters))

    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        if (searchFilters?.status)
            setStatus(searchFilters?.status)
        if (searchFilters.minReraCarpetArea)
            setMinReraCarpetArea(searchFilters.minReraCarpetArea)
        if (searchFilters.maxReraCarpetArea)
            setMaxReraCarpetArea(searchFilters.maxReraCarpetArea)
        if (searchFilters?.configuration)
            setConfiguration(searchFilters?.configuration)
        if (searchFilters.bathrooms)
            setBathrooms(searchFilters.bathrooms)
        if (searchFilters?.amenities)
            setAmenities(searchFilters?.amenities)
    }, [searchFilters]);


    useEffect(() => {
        const query = router.query;
        if (query.status) {

        }
    }, [router]);

    useEffect(() => {
    }, [status])

    useEffect(() => {
    }, [minReraCarpetArea, maxReraCarpetArea])

    useEffect(() => {
    }, [bathrooms])

    const onPressConstruction = () => {
        setShowAmenities(false);
        setShowArea(false);
        setShowConfiguration(false);
        setShowBathrooms(false);
        setShowConstructionStatus(true)
    }

    const onPressArea = () => {
        setShowArea(true)
        setShowAmenities(false);
        setShowConfiguration(false);
        setShowBathrooms(false);
        setShowConstructionStatus(false)
    }

    const onPressConfiguration = () => {
        setShowConfiguration(true)
        setShowArea(false)
        setShowAmenities(false);
        setShowBathrooms(false);
        setShowConstructionStatus(false)
    }

    const onPressBathrooms = () => {
        setShowBathrooms(true)
        setShowConfiguration(false)
        setShowArea(false)
        setShowConstructionStatus(false)
        setShowAmenities(false);
    }

    const onPressAmenities = () => {
        setShowAmenities(true)
        setShowBathrooms(false)
        setShowConfiguration(false)
        setShowArea(false)
        setShowConstructionStatus(false)
    }

    const onPressSubmit = () => {
        dispatch(setSearchFilters({status, minReraCarpetArea, maxReraCarpetArea, configuration, bathrooms, amenities}))
        redirect()
    }

    const onPressClear = () => {
        setStatus([])
        setMinReraCarpetArea('')
        setMaxReraCarpetArea('')
        setConfiguration([])
        setBathrooms('')
        setAmenities([])
    }

    const redirect = () => {
        if (status.length > 0) {
            router.query["status"] = status.join(',')
        } else {
            delete router.query["status"];
        }
        if (Number(minReraCarpetArea) >= 0 && Number(maxReraCarpetArea) > 0) {
            router.query["minReraCarpetArea"] = minReraCarpetArea.toString()
            router.query["maxReraCarpetArea"] = maxReraCarpetArea.toString()
        } else {
            delete router.query["minReraCarpetArea"];
            delete router.query["maxReraCarpetArea"];
        }
        if (configuration.length > 0) {
            router.query["configuration"] = configuration.join(',')
        } else {
            delete router.query["configuration"];
        }
        if (Number(bathrooms) > 0) {
            router.query["bathrooms"] = bathrooms.toString()
        } else {
            delete router.query["bathrooms"];
        }
        if (amenities.length > 0) {
            router.query["amenities"] = amenities.join(',')
        } else {
            delete router.query["amenities"];
        }
        router.push(router)
        handleClick()
    }

    return (
        <div className={PropertyFilterDropdownStyle["property-filter"]}>
            <div className={PropertyFilterDropdownStyle["property-filters__container"]}>
                <div style={{
                    width: "100%",
                    height: "5%",
                    padding: "0.5rem",
                    display: "flex",
                    justifyContent: "flex-end"
                }}>
                    <AppIcon name={'material-symbols:close-rounded'}
                             color={AppColors.jasper} size={22} onClick={handleClick}/>
                </div>
                <div className={PropertyFilterDropdownStyle["property-filters__view"]}>
                    <ConstructionStatusFilter show={showConstructionStatus} status={status} setStatus={setStatus}/>
                    <AreaFilter show={showArea} minReraCarpetArea={minReraCarpetArea}
                                setMinReraCarpetArea={setMinReraCarpetArea} maxReraCarpetArea={maxReraCarpetArea}
                                setMaxReraCarpetArea={setMaxReraCarpetArea}/>
                    <ConfigurationFilter show={showConfiguration} configuration={configuration}
                                         setConfiguration={setConfiguration}/>
                    <BathroomFilter show={showBathrooms} bathrooms={bathrooms} setBathrooms={setBathrooms}/>
                    <AmenitiesFilter show={showAmenities} amenities={amenities} setAmenities={setAmenities}/>
                </div>
                <div className={PropertyFilterDropdownStyle["button__container"]}>
                    <button className={PropertyFilterDropdownStyle["button--secondary"]} onClick={onPressClear}>Clear
                        All
                    </button>
                    <button className={PropertyFilterDropdownStyle["button--primary"]} onClick={onPressSubmit}>Apply
                    </button>
                </div>
            </div>


            <div className={PropertyFilterDropdownStyle["property-filters__options-container"]}>
                <div
                    className={PropertyFilterDropdownStyle[showConstructionStatus ? "property-filter-dropdown--active" : "property-filter-dropdown-notActive"]}
                    onClick={() => onPressConstruction()}>
                    <h1 className={PropertyFilterDropdownStyle["property-filter-dropdown__text"]}>Construction
                        Status</h1>
                    <AppIcon
                        name={showConstructionStatus ? 'material-symbols:keyboard-arrow-down-rounded' : 'material-symbols:add'}
                        size={22}/>
                </div>
                <div
                    className={PropertyFilterDropdownStyle[showArea ? "property-filter-dropdown--active" : "property-filter-dropdown-notActive"]}
                    onClick={() => onPressArea()}>
                    <h1 className={PropertyFilterDropdownStyle["property-filter-dropdown__text"]}>Area(sq ft.)</h1>
                    <AppIcon name={showArea ? 'material-symbols:keyboard-arrow-down-rounded' : 'material-symbols:add'}
                             size={22}/>
                </div>
                <div
                    className={PropertyFilterDropdownStyle[showConfiguration ? "property-filter-dropdown--active" : "property-filter-dropdown-notActive"]}
                    onClick={() => onPressConfiguration()}>
                    <h1 className={PropertyFilterDropdownStyle["property-filter-dropdown__text"]}>Configuration</h1>
                    <AppIcon
                        name={showConfiguration ? 'material-symbols:keyboard-arrow-down-rounded' : 'material-symbols:add'}
                        size={22}/>
                </div>
                <div
                    className={PropertyFilterDropdownStyle[showBathrooms ? "property-filter-dropdown--active" : "property-filter-dropdown-notActive"]}
                    onClick={() => onPressBathrooms()}>
                    <h1 className={PropertyFilterDropdownStyle["property-filter-dropdown__text"]}>Bathrooms</h1>
                    {/*<span*/}
                    {/*    className={` property-filter-dropdown__filter-wrapper--active ${PropertyFilterDropdownStyle["property-filter-dropdown__commercial-icon"]}`}>{showBathrooms ? '+1' : '+0'}</span>*/}
                    <AppIcon
                        name={showBathrooms ? 'material-symbols:keyboard-arrow-down-rounded' : 'material-symbols:add'}
                        size={22}/>
                </div>
                <div
                    className={PropertyFilterDropdownStyle[showAmenities ? "property-filter-dropdown--active" : "property-filter-dropdown-notActive"]}
                    onClick={() => onPressAmenities()}>
                    <h1 className={PropertyFilterDropdownStyle["property-filter-dropdown__text"]}>Amenities</h1>
                    <AppIcon
                        name={showAmenities ? 'material-symbols:keyboard-arrow-down-rounded' : 'material-symbols:add'}
                        size={22}/>
                </div>
            </div>
        </div>
    )
}

const ConstructionStatusFilter = ({show, status, setStatus}) => {

    const onPressStatus = (value) => {
        if (!status.includes(value)) {
            setStatus([...status, value])
        } else {
            setStatus(status.filter((statusValue) => statusValue !== value))
        }
    }

    return (
        <div style={{
            padding: "0.5rem",
            height: "100%",
            display: show ? "" : "none",
        }}>
            <h4 className={PropertyFilterDropdownStyle["property__filter__heading"]}>Construction Status</h4>
            <div
                className={PropertyFilterDropdownStyle[show ? "property-filter-dropdown-wrapper--active" : "property-filter-dropdown-wrapper"]}>
                {
                    StatusList.map((statusObj) => {
                        return (
                            <FilterType key={statusObj?.name} type={statusObj?.name}
                                        activeFilter={status.includes(statusObj?.value)}
                                        onPressFilter={() => onPressStatus(statusObj?.value)}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

const AreaFilter = ({show, minReraCarpetArea, setMinReraCarpetArea, maxReraCarpetArea, setMaxReraCarpetArea}) => {

    const onPressArea = (areaName, minValue, maxValue) => {
        if (minReraCarpetArea === minValue && maxReraCarpetArea === maxValue) {
            setMinReraCarpetArea('')
            setMaxReraCarpetArea('')
        } else {
            setMinReraCarpetArea(minValue)
            setMaxReraCarpetArea(maxValue)
        }
    }

    return (
        <div style={{
            padding: "0.5rem",
            height: "100%",
            display: show ? "" : "none",
        }}>
            <h4 className={PropertyFilterDropdownStyle["property__filter__heading"]}>Area</h4>
            <div
                className={PropertyFilterDropdownStyle[show ? "property-filter-dropdown-wrapper--active" : "property-filter-dropdown-wrapper"]}>
                {
                    AreaList.map((area) => {
                        return (
                            <FilterType key={area?.name} type={area?.name}
                                        activeFilter={minReraCarpetArea === area?.value?.minValue && maxReraCarpetArea === area?.value?.maxValue}
                                        onPressFilter={() => onPressArea(area?.name, area?.value?.minValue, area?.value?.maxValue)}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

const ConfigurationFilter = ({show, configuration, setConfiguration}) => {

    const onPressConfiguration = (value) => {
        if (!configuration.includes(value)) {
            setConfiguration([...configuration, value])
        } else {
            setConfiguration(configuration.filter((configurationValue) => configurationValue !== value))
        }
    }

    return (
        <div style={{
            padding: "0.5rem",
            height: "100%",
            display: show ? "" : "none",
        }}><h4 className={PropertyFilterDropdownStyle["property__filter__heading"]}>Configuration</h4>
            <div
                className={PropertyFilterDropdownStyle[show ? "property-filter-dropdown-wrapper--active" : "property-filter-dropdown-wrapper"]}>
                {
                    ConfigurationList.map((configurationObj) => {
                        return (
                            <FilterType key={configurationObj?.name} type={configurationObj?.name}
                                        activeFilter={configuration.includes(configurationObj?.value)}
                                        onPressFilter={() => onPressConfiguration(configurationObj?.value)}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

const BathroomFilter = ({show, bathrooms, setBathrooms}) => {

    const onClickBathroom = (value) => {
        if (bathrooms === value) {
            setBathrooms("");
        } else {
            setBathrooms(value);
        }
    }

    return (
        <div style={{
            padding: "0.5rem",
            height: "100%",
            display: show ? "" : "none",
        }}>
            <h4 className={PropertyFilterDropdownStyle["property__filter__heading"]}>Bathrooms</h4>
            <div
                className={PropertyFilterDropdownStyle[show ? "property-filter-dropdown-wrapper--active" : "property-filter-dropdown-wrapper"]}>
                {
                    BathroomsList.map((bathroom) => {
                        return (
                            <FilterType key={bathroom?.name} type={bathroom?.name}
                                        activeFilter={bathrooms === bathroom?.value}
                                        onPressFilter={() => onClickBathroom(bathroom?.value)}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

const AmenitiesFilter = ({show, amenities, setAmenities}) => {

    const onPressAmenity = (value) => {
        if (!amenities.includes(value)) {
            setAmenities([...amenities, value])
        } else {
            setAmenities(amenities.filter((amenityValue) => amenityValue !== value))
        }
    }

    return (
        <div style={{
            padding: "0.5rem",
            height: "100%",
            display: show ? "" : "none",
        }}>
            <h4 className={PropertyFilterDropdownStyle["property__filter__heading"]}>Amenities</h4>
            <div
                className={PropertyFilterDropdownStyle[show ? "property-filter-dropdown-wrapper--active" : "property-filter-dropdown-wrapper"]}>
                {
                    AmentiesList.map((amenity) => {
                        return (
                            <FilterType key={amenity?.name} type={amenity?.name}
                                        activeFilter={amenities.includes(amenity?.value)}
                                        onPressFilter={() => onPressAmenity(amenity?.value)}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

const FilterType = ({type, activeFilter, onPressFilter}) => {

    return (
        <div
            className={PropertyFilterDropdownStyle[activeFilter ? "property-filter-dropdown__filter-wrapper--active" : "property-filter-dropdown__filter-wrapper"]}
            onClick={() => onPressFilter()}>
            <p className={PropertyFilterDropdownStyle["property-filter-dropdown__filter-text"]}>{type}</p>
            <AppIcon name={activeFilter ? 'material-symbols:close-rounded' : ''}
                     color={AppColors.jasper} size={18} style={{cursor: 'pointer', marginLeft: '0.5rem'}}/>
        </div>
    )
}

export default PropertyFilterDropdown
