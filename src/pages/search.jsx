import React, {useEffect, useState} from "react";
import Head from "next/head";
import Footer from "../components/pages/home/footer/Footer";
import property_1 from "../public/images/property_1.png";
import SearchStyle from "../styles/componentStyles/Search.module.css";
import MapViewCard from "../components/pages/home/MapViewCard.jsx";
import PropertyTypeFilterButton from "../components/lib/PropertyTypeFilterButton";
import MoreFiltersDropdown from "../components/lib/MoreFiltersDropdown";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {searchedDeveloperProperties, searchedProperties} from "../actions/search";
import {AppColors} from "../public/AppColors";
import AppIcon from "../components/lib/AppIcon/AppIcon";
import AppPagination from "../components/lib/AppPagination/AppPagination";
import {useApp} from "../base/contexts/AppProvider";
import {decryptListOfObject} from "../helper/Utility";
import MobileSearchBar from "../components/pages/home/mobileSearchBar/MobileSearchBar";

const Search = () => {
    const TAG = 'Search';
    const app = useApp();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [exclusive, setExclusive] = useState(false);
    const [assured, setAssured] = useState(false);
    const [fastSelling, setFastSelling] = useState(false);
    const [top, setTop] = useState(false);
    const [verified, setVerified] = useState(false);
    const [featured, setFeatured] = useState(false);
    const {searchFilters, loading, filteredMetadata} = useSelector((state) => state.searchReducer);
    const [listView, setListView] = useState(false);
    const [searchHeading, setSearchHeading] = useState("");
    const [shouldShowGrid, setShouldShowGrid] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        setShouldShowGrid(app.isMobile);
    }, []);

    useEffect(() => {
    }, [filteredMetadata]);


    useEffect(() => {
        const routerQuery = router.query;
        let selectedFilter;

        if (Number(routerQuery.page) > 0) {
            selectedFilter = {page: routerQuery.page}
        } else {
            router.query.page = "1"
            router.push(router)
            selectedFilter = {page: '1'}
        }
        if (Number(routerQuery.perPage) > 0) {
            selectedFilter = {...selectedFilter, ...{perPage: routerQuery.perPage}}
        } else {
            router.query.perPage = "10"
            router.push(router)
            selectedFilter = {...selectedFilter, ...{perPage: '10'}}
        }


        if (routerQuery.exclusive) {
            setExclusive(Boolean(routerQuery.exclusive))
            setSearchHeading("home exclusive")
            selectedFilter = {...{exclusive: true}}
        }

        if (routerQuery.assured) {
            setAssured(Boolean(routerQuery.assured))
            setSearchHeading("home assured")
            selectedFilter = {...selectedFilter, ...{assured: true}}
        }

        if (routerQuery.fastSelling) {
            setFastSelling(Boolean(routerQuery.fastSelling))
            setSearchHeading("fast selling")
            selectedFilter = {...selectedFilter, ...{fastSelling: true}}
        }

        if (routerQuery.top) {
            setTop(Boolean(routerQuery.top))
            setSearchHeading("top")
            selectedFilter = {...selectedFilter, ...{top: true}}
        }

        if (routerQuery.verified) {
            setVerified(Boolean(routerQuery.verified))
            setSearchHeading("verified")
            selectedFilter = {...selectedFilter, ...{verified: true}}
        }

        if (routerQuery.featured) {
            setFeatured(Boolean(routerQuery.featured))
            setSearchHeading("featured")
            selectedFilter = {...selectedFilter, ...{featured: true}}
        }

        if (routerQuery.query) {
            selectedFilter = {...selectedFilter, ...{query: decryptListOfObject(routerQuery.query.split(','))}}
        }

        if (routerQuery.type) {
            selectedFilter = {...selectedFilter, ...{type: routerQuery.type.split(',')}}
        }

        if (routerQuery.minBudget && routerQuery.maxBudget) {
            selectedFilter = {
                ...selectedFilter, ...{
                    minBudget: routerQuery.minBudget,
                    maxBudget: routerQuery.maxBudget
                }
            }
        }

        if (routerQuery.status) {
            selectedFilter = {...selectedFilter, ...{status: routerQuery.status.split(',')}}
        }
        if (routerQuery.minReraCarpetArea && routerQuery.maxReraCarpetArea) {
            selectedFilter = {
                ...selectedFilter, ...{
                    minReraCarpetArea: routerQuery.minReraCarpetArea,
                    maxReraCarpetArea: routerQuery.maxReraCarpetArea
                }
            }
        }

        if (routerQuery.configuration) {
            selectedFilter = {...selectedFilter, ...{configuration: routerQuery.configuration.split(',')}}
        }

        if (routerQuery.bathrooms) {
            selectedFilter = {...selectedFilter, ...{bathrooms: routerQuery.bathrooms}}
        }

        if (routerQuery.amenities) {
            // @ts-ignore
            selectedFilter = {...selectedFilter, ...{amenities: routerQuery.amenities.split(',')}}
        }

        if (router.asPath === '/search') {
            selectedFilter = {}
        }

        if (selectedFilter?.query?.length > 0) {
            let updatedAreas = [];
            let updatedDevelopers = [];
            let updatedProperties = [];
            selectedFilter.query.forEach((queryItem) => {
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
            selectedFilter = {
                ...selectedFilter, ...{
                    areas: updatedAreas,
                    developers: updatedDevelopers,
                    properties: updatedProperties
                }
            }
        }

        if (routerQuery.developerId) {
            setSearchHeading("Developer")
            dispatch(searchedDeveloperProperties(routerQuery.developerId, {}))
        } else {
            if (selectedFilter) {
                if (Object.keys(selectedFilter).length === 0) {
                    dispatch(searchedProperties(searchFilters, {}, onSuccess))
                    setSearchHeading("")
                } else {
                    dispatch(searchedProperties(searchFilters, selectedFilter, onSuccess))
                    if (selectedFilter?.exclusive && (selectedFilter?.assured || selectedFilter?.fastSelling || selectedFilter?.top)) {
                        setSearchHeading("")
                    }
                    if (selectedFilter?.assured && (selectedFilter?.exclusive || selectedFilter?.fastSelling || selectedFilter?.top)) {
                        setSearchHeading("")
                    }
                    if (selectedFilter?.fastSelling && (selectedFilter?.assured || selectedFilter?.exclusive || selectedFilter?.top)) {
                        setSearchHeading("")
                    }
                    if (selectedFilter?.top && (selectedFilter?.assured || selectedFilter?.fastSelling || selectedFilter?.exclusive)) {
                        setSearchHeading("")
                    }
                }
            }
        }
    }, [router]);

    const onSuccess = (isSuccess) => {
        // write code here....
    }

    const onPressHomeExclusiveFilter = () => {
        const query = router.query;
        if (query?.exclusive) {
            delete router.query.exclusive;
            dispatch(searchedProperties(searchFilters, {exclusive: false}, onSuccess))
            setExclusive(false)
            router.push(router)
        } else {
            router.query.exclusive = "true"
            router.push(router)
        }
    }

    const onPressHomeAssuredFilter = () => {
        const query = router.query;

        if (query?.assured) {
            delete router.query.assured;
            dispatch(searchedProperties(searchFilters, {assured: false}, onSuccess))
            setAssured(false)
            router.push(router)
        } else {
            router.query.assured = "true"
            router.push(router)
            dispatch(searchedProperties(searchFilters, {assured: true}, onSuccess))
        }
    }

    const onPressFastSellingFilter = () => {
        const query = router.query;
        if (query?.fastSelling) {
            delete router.query.fastSelling;
            dispatch(searchedProperties(searchFilters, {fastSelling: false}, onSuccess))
            setFastSelling(false)
            router.push(router)
        } else {
            router.query.fastSelling = "true"
            router.push(router)
            dispatch(searchedProperties(searchFilters, {fastSelling: true}, onSuccess))
        }
    }

    const onPressTopPropertiesFilter = () => {
        const query = router.query;
        if (query?.top) {
            delete router.query.top;
            dispatch(searchedProperties(searchFilters, {top: false}, onSuccess))
            setTop(false)
            router.push(router)
        } else {
            router.query.top = "true"
            router.push(router)
            dispatch(searchedProperties(searchFilters, {top: true}, onSuccess))
        }
    }
    const onPressVerifiedPropertiesFilter = () => {
        const query = router.query;
        if (query?.verified) {
            delete router.query.verified;
            dispatch(searchedProperties(searchFilters, {verified: false}, onSuccess))
            setVerified(false)
            router.push(router)
        } else {
            router.query.verified = "true"
            router.push(router)
            dispatch(searchedProperties(searchFilters, {verified: true}, onSuccess))
        }
    }
    const onPressFeaturedPropertiesFilter = () => {
        const query = router.query;
        if (query?.featured) {
            delete router.query.featured;
            dispatch(searchedProperties(searchFilters, {featured: false}, onSuccess))
            setFeatured(false)
            router.push(router)
        } else {
            router.query.featured = "true"
            router.push(router)
            dispatch(searchedProperties(searchFilters, {featured: true}, onSuccess))
        }
    }

    const onPressGridIcon = () => {
        setListView(!listView)
    }

    const onSelect = (data) => {
        const {page, perPage} = data
        router.query.page = page
        router.query.perPage = perPage
        router.push(router)
        dispatch(searchedProperties(searchFilters, {page: String(page), perPage: String(perPage)}, onSuccess))
    }


    return (
        <div>
            <Head>
                <title>Search</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0"/>
            </Head>
            {/*<SearchDownFilters/>*/}
            <MobileSearchBar/>

            <div className={SearchStyle["main__body__div"]}>
                <div className={SearchStyle["search__filters__div"]}>
                    {/*<PropertyTypeFilterButton type={"Home Verified"} onClick={onPressHomeVerifiedFilter}/>*/}
                    <PropertyTypeFilterButton type={"eHouzer Exclusive"} onClick={onPressHomeExclusiveFilter}
                                              active={exclusive}/>
                    <PropertyTypeFilterButton type={"eHouzer Assured"} onClick={onPressHomeAssuredFilter}
                                              active={assured}/>
                    <PropertyTypeFilterButton type={"Fast Selling"} onClick={onPressFastSellingFilter}
                                              active={fastSelling}/>
                    <PropertyTypeFilterButton type={"Top Properties"} onClick={onPressTopPropertiesFilter}
                                              active={top}/>
                    <PropertyTypeFilterButton type={"eHouzer Verified"} onClick={onPressVerifiedPropertiesFilter}
                                              active={verified}/>
                    <PropertyTypeFilterButton type={"Featured Properties"} onClick={onPressFeaturedPropertiesFilter}
                                              active={featured}/>
                    {listView ?
                        <AppIcon name={'material-symbols:view-list-rounded'}
                                 color={AppColors.jasper} size={25} style={{
                            marginLeft: 'auto',
                            cursor: 'pointer',
                            display: shouldShowGrid ? "none" : "flex"
                        }}
                                 onClick={onPressGridIcon}/>
                        :
                        <AppIcon name={'material-symbols:grid-view-rounded'}
                                 color={AppColors.jasper} size={25} style={{
                            marginLeft: 'auto',
                            cursor: 'pointer',
                            display: shouldShowGrid ? "none" : "flex"
                        }}
                                 onClick={onPressGridIcon}/>}
                    <MoreFiltersDropdown name={"More Filters"}
                                         nameStyle={SearchStyle["more__filter__text"]}
                                         icon={'material-symbols:filter-alt'}
                                         iconStyle={''}
                                         display={app.isMobile ? false : true}/>
                </div>
                <div className={SearchStyle["more__filter--dropdown-mobile_view"]}>
                    <MoreFiltersDropdown name={"More Filters"}
                                         nameStyle={SearchStyle["more__filter__text"]}
                                         icon={'material-symbols:filter-alt'}
                                         iconStyle={''}/>
                </div>
                {searchHeading ?
                    <h1 className={SearchStyle["search__heading"]}>
                        List Of {searchHeading} properties in Faridabad
                    </h1>
                    : null
                }
                {!loading ?
                    <div className={SearchStyle["property__div"]}>
                        <MapViewCard mapImage={property_1} listView={listView} shouldShowGrid={shouldShowGrid}/>
                    </div>
                    :
                    <div className={SearchStyle['search__filters-loading']}>
                        <h3>loading...</h3>
                    </div>
                }

                <div className={SearchStyle["property__pagination-div"]}>
                    <AppPagination onSelect={onSelect} totalItems={filteredMetadata?.totalCount}/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Search
