import {ERROR, LOADING, SET_PROPERTIES, SET_PROPERTIES_METADATA, SET_SEARCH_FILTERS} from "./type";
import {PropertyApiService} from "../../services/PropertyApiService";
import {DeveloperApiService} from "../../services/DeveloperApiService";

const loading = (loading) => ({
    type: LOADING,
    payload: loading
})
const error = (error) => ({
    type: ERROR,
    payload: error
})
const filteredProperties = (properties) => {
    return {
        type: SET_PROPERTIES,
        payload: properties
    }
}
const filteredPropertiesMetadata = (metadata) => {
    return {
        type: SET_PROPERTIES_METADATA,
        payload: metadata
    }
}

export const setSearchFilters = (filters) => {
    return {
        type: SET_SEARCH_FILTERS,
        payload: filters
    }
}

export const searchedProperties = (filters, selectedFilter, onSuccess) => async (dispatch) => {
    await dispatch(loading(true))
    const searchFilters = {...filters, ...selectedFilter}
    console.log('new query set search filter 36 ', searchFilters)
    // search filter code commented
    dispatch(setSearchFilters(searchFilters))
    PropertyApiService.filteredProperties(searchFilters).then(async (res) => {
        const properties = res.data[0]
        const metadata = res.metaData
        dispatch(filteredProperties(properties))
        dispatch(filteredPropertiesMetadata(metadata))
        onSuccess({isSuccess: true, metadata});
    }).catch((err) => {
        const errorMsg = err.message
        dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(loading(false))
    })
}
export const searchedTopDeveloperProperties = async (dispatch) => {
    await dispatch(loading(true))
    await DeveloperApiService.topDevelopers().then(async (res) => {
        const developers = res.data[0]
        const metadata = res.metaData
        const properties = [];
        developers.map((developer) => {
            developer.properties.map((property) => {
                properties.push(property)
            })
        })
        dispatch(filteredProperties(properties))
        console.log('search metadata njhj', metadata)
        dispatch(filteredPropertiesMetadata(metadata))
    }).catch((err) => {
        const errorMsg = err.message
        //console.log('error',errorMsg)
        dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(loading(false))
    })
}

export const searchedDeveloperProperties = (developerId) => async (dispatch) => {
    await dispatch(loading(true))
    await PropertyApiService.developerProperties(developerId).then(async (res) => {
        const properties = res.data[0]
        const metadata = res.metaData
        dispatch(filteredProperties(properties))
        console.log('search metadata njhj', metadata)
        dispatch(filteredPropertiesMetadata(metadata))
    }).catch((err) => {
        const errorMsg = err.message
        dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(loading(false))
    })
}
