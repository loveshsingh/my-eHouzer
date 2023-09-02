import {ERROR, LOADING, SET_PROPERTIES, SET_PROPERTIES_METADATA, SET_SEARCH_FILTERS,} from "../../actions/search/type";

const initialState = {
    loading: false,
    properties: [],
    error: '',
    searchFilters: {
        query: [],
        areas: [],
        developers: [],
        properties: [],
        exclusive: false,
        assured: false,
        fastSelling: false,
        top: false,
        status: [],
        minReraCarpetArea: '',
        maxReraCarpetArea: '',
        configuration: [],
        bathrooms: '',
        amenities: [],
        type: [],
        minBudget: '',
        maxBudget: '',
        filteredMetadata: {},
    },
}

const SearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING :
            return {
                ...state,
                loading: action.payload
            }
        case ERROR :
            return {
                ...state,
                error: action.payload
            }
        case SET_PROPERTIES :
            return {
                ...state,
                properties: action.payload
            }
        case SET_PROPERTIES_METADATA :
            return {
                ...state,
                filteredMetadata: action.payload
            }
        case SET_SEARCH_FILTERS :
            return setSearchFilters(state, action);
        /* return {
             ...state,
             searchFilters: {...state.searchFilters, ...action.payload}
             // return setSearchFilters(state, action);
         }*/
        default:
            return state
    }
}

const setSearchFilters = (state, action) => {
    const {
        query,
        areas,
        developers,
        properties,
        exclusive,
        assured,
        fastSelling,
        top,
        status,
        minReraCarpetArea,
        maxReraCarpetArea,
        configuration,
        bathrooms,
        amenities,
        type,
        minBudget,
        maxBudget,
        filteredMetadata
    } = action.payload;

    const oldDevelopers = state.searchFilters?.developers;
    let updatedDevelopers = oldDevelopers ? [...oldDevelopers] : [];
    if (developers) {
        updatedDevelopers = developers;
    }

    const oldProperties = state.searchFilters?.properties
    let updatedProperties = oldProperties ? [...oldProperties] : [];
    if (properties) {
        updatedProperties = properties;
    }

    const oldAreas = state.searchFilters?.areas
    let updatedAreas = oldAreas ? [...oldAreas] : [];
    if (areas?.length > 0) {
        updatedAreas = areas;
    }

    let updatedExclusive = state.searchFilters?.exclusive
    if (exclusive) {
        updatedExclusive = true;
    }

    let updatedAssured = state.searchFilters?.assured
    if (assured) {
        updatedAssured = true;
    }

    let updatedFastSelling = state.searchFilters?.fastSelling
    if (fastSelling) {
        updatedFastSelling = true;
    }

    let updatedTop = state.searchFilters?.top
    if (top) {
        updatedTop = true;
    }


    const oldStatus = state.searchFilters?.status
    const updatedStatus = [...oldStatus]
    if (status?.length > 0) {
        updatedStatus.push(...status);
    }

    let updatedMinReraCarpetArea = state.searchFilters?.minReraCarpetArea
    if (minReraCarpetArea) {
        updatedMinReraCarpetArea = minReraCarpetArea;
    }

    let updatedMaxReraCarpetArea = state.searchFilters?.maxReraCarpetArea
    if (maxReraCarpetArea) {
        updatedMaxReraCarpetArea = maxReraCarpetArea;
    }

    const oldConfiguration = state.searchFilters?.configuration
    const updatedConfiguration = [...oldConfiguration]
    if (configuration?.length > 0) {
        updatedConfiguration.push(...configuration);
    }

    let updatedBathrooms = state.searchFilters?.bathrooms
    if (bathrooms) {
        updatedBathrooms = bathrooms;
    }

    const oldAmenities = state.searchFilters?.amenities
    const updatedAmenities = [...oldAmenities]
    if (amenities?.length > 0) {
        updatedAmenities.push(...amenities);
    }

    let updatedMinBudget = state.searchFilters?.minBudget
    if (minBudget) {
        updatedMinBudget = minBudget;
    }
    let updatedMaxBudget = state.searchFilters?.maxBudget
    if (maxBudget) {
        updatedMaxBudget = maxBudget;
    }

    const searchFilter = {
        ...state.searchFilters,
        query: query ?? [],
        areas: updatedAreas,
        developers: updatedDevelopers,
        properties: updatedProperties,
        exclusive: updatedExclusive,
        assured: updatedAssured,
        fastSelling: updatedFastSelling,
        top: updatedTop,
        status: updatedStatus,
        minReraCarpetArea: updatedMinReraCarpetArea,
        maxReraCarpetArea: updatedMaxReraCarpetArea,
        configuration: updatedConfiguration,
        bathrooms: updatedBathrooms,
        amenities: updatedAmenities,
        type: type ?? [],
        minBudget: updatedMinBudget,
        maxBudget: updatedMaxBudget,
        filteredMetadata
    };
    return {
        ...state,
        searchFilters: searchFilter
    }
}

export default SearchReducer
