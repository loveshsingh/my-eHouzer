import {
    ERROR,
    LOADING,
    SET_ALL_CITIES,
    SET_ALL_PROPERTIES,
    SET_ASSURED_PROPERTIES,
    SET_DEVELOPERS,
    SET_EXCLUSIVE_PROPERTIES,
    SET_FAST_SELLING_PROPERTIES,
    SET_SEARCH_DATA,
    SET_TOP_DEVELOPER_PROPERTIES,
    SET_TOP_DEVELOPERS,
    SET_TOP_PROPERTIES
} from "./type";
import {PropertyApiService} from "../../services/PropertyApiService";
import {DeveloperApiService} from "../../services/DeveloperApiService";
import {setYatin} from "../loading";

const loading = (loading) => ({
    type: LOADING,
    payload: loading
})

const setTopProperties = (properties) => ({
    type: SET_TOP_PROPERTIES,
    payload: properties
})
const setTopDeveloperProperties = (properties) => ({
    type: SET_TOP_DEVELOPER_PROPERTIES,
    payload: properties
})
const setFastSellingProperties = (properties) => ({
    type: SET_FAST_SELLING_PROPERTIES,
    payload: properties
})
const setExclusiveProperties = (properties) => ({
    type: SET_EXCLUSIVE_PROPERTIES,
    payload: properties
})
const setAssuredProperties = (properties) => ({
    type: SET_ASSURED_PROPERTIES,
    payload: properties
})
const setTopDevelopers = (developers) => ({
    type: SET_TOP_DEVELOPERS,
    payload: developers
})

const error = (error) => ({
    type: ERROR,
    payload: error
})

const setDevelopers = (developers) => ({
    type: SET_DEVELOPERS,
    payload: developers
})

const setAllProperties = (properties) => ({
    type: SET_ALL_PROPERTIES,
    payload: properties
})
const setAllCities = (cities) => ({
    type: SET_ALL_CITIES,
    payload: cities
})

const setSearchedData = (data) => ({
    type: SET_SEARCH_DATA,
    payload: data
})

export const fetchAllCities = async (dispatch) => {
    //  await dispatch(loading(true))
    await PropertyApiService.allCities().then(async (res) => {
        const cities = res.data[0]
        dispatch(setAllCities(cities))
    }).catch((err) => {
        const errorMsg = err.message
        //console.log('error',errorMsg)
        dispatch(error(errorMsg))
    }).finally(() => {
        //    dispatch(loading(false))
    })
}

export const fetchTopProperties = async (dispatch) => {
    await PropertyApiService.topProperties("top=true").then(async (res) => {
        const properties = res.data[0]
        dispatch(setTopProperties(properties))
    }).catch((err) => {
        const errorMsg = err.message
        dispatch(error(errorMsg))
    }).finally(() => {
        //  dispatch(loading(false))
    })
}
export const fetchFastSellingProperties = async (dispatch) => {
    await dispatch(loading(true))
    await PropertyApiService.topProperties("fastSelling=true").then(async (res) => {
        const properties = res.data[0]
        dispatch(setFastSellingProperties(properties))
    }).catch((err) => {
        const errorMsg = err.message
        dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(loading(false))
    })
}
export const fetchTopDevelopers = async (dispatch) => {
    await dispatch(loading(true))
    await DeveloperApiService.topDevelopers().then(async (res) => {
        const developers = res.data[0]
        dispatch(setTopDevelopers(developers))
    }).catch((err) => {
        const errorMsg = err.message
        //console.log('error',errorMsg)
        dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(loading(false))
    })
}
export const fetchAssuredProperties = async (dispatch) => {
    // await dispatch(loading(true))
    await PropertyApiService.topProperties("assured=true").then(async (res) => {
        const properties = res.data[0]
        // console.log('user',users)
        dispatch(setAssuredProperties(properties))
    }).catch((err) => {
        const errorMsg = err.message
        //console.log('error',errorMsg)
        dispatch(error(errorMsg))
    }).finally(() => {
        //  dispatch(loading(false))
    })
}
export const fetchExclusiveProperties = async (dispatch) => {
    //await dispatch(loading(true))
    await PropertyApiService.topProperties("exclusive=true").then(async (res) => {
        const properties = res.data[0]
        dispatch(setExclusiveProperties(properties))
    }).catch((err) => {
        const errorMsg = err.message
        //console.log('error',errorMsg)
        dispatch(error(errorMsg))
    }).finally(() => {
        //  dispatch(loading(false))
    })
}

export const fetchTopDeveloperProperties = (developerId) => async (dispatch) => {
    await dispatch(setYatin(true))
    await PropertyApiService.developerProperties(developerId).then(async (res) => {
        const properties = res.data[0]

        dispatch(setTopDeveloperProperties(properties))
    }).catch((err) => {
        const errorMsg = err.message
        //console.log('error',errorMsg)
        dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(setYatin(false))

    })
}

export const loadHomeScreenData = () => async (dispatch) => {
    await dispatch(loading(true))
    await FetchInitialDataFromAPI(dispatch).then().catch((err) => {

    }).finally(() => {
            dispatch(loading(false))
        }
    )
}

export const fetchDevelopers = async (dispatch) => {
    //await dispatch(loading(true))
    await DeveloperApiService.developers().then(async (res) => {
        const developers = res.data[0]
        dispatch(setDevelopers(developers))
    }).catch((err) => {
        const errorMsg = err.message
        //console.log('error',errorMsg)
        dispatch(error(errorMsg))
    }).finally(() => {
        // dispatch(loading(false))
    })
}


export const keywordSearch = (keywordData) => async (dispatch) => {
    //await dispatch(loading(true))
    await PropertyApiService.keywordSearch(keywordData).then(async (res) => {
        const data = res.data[0]
        dispatch(setSearchedData(data))
    }).catch((err) => {
        const errorMsg = err.message
        //console.log('error',errorMsg)
        dispatch(error(errorMsg))
    }).finally(() => {
        //  dispatch(setYatin(false))
    })
}


export const fetchAllProperties = async (dispatch) => {
    //  await dispatch(loading(true))
    await PropertyApiService.allProperties().then(async (res) => {
        const properties = res.data[0]
        console.log("Fetch all properties: ", properties)
        dispatch(setAllProperties(properties))
    }).catch((err) => {
        const errorMsg = err.message
        //console.log('error',errorMsg)
        dispatch(error(errorMsg))
    }).finally(() => {
        //    dispatch(loading(false))
    })
}

const FetchInitialDataFromAPI = async (dispatch) => {
    const promises = []
    promises.push(fetchTopProperties(dispatch));
    promises.push(fetchAssuredProperties(dispatch));
    promises.push(fetchExclusiveProperties(dispatch));
    promises.push(fetchFastSellingProperties(dispatch));
    promises.push(fetchTopDevelopers(dispatch));
    promises.push(fetchDevelopers(dispatch));
    promises.push(fetchAllProperties(dispatch));
    return Promise.all(promises)
}
