import {
    ERROR,
    LOADING,
    SET_ALL_CITIES,
    SET_ALL_PROPERTIES,
    SET_ASSURED_PROPERTIES,
    SET_DEVELOPERS,
    SET_EXCLUSIVE_PROPERTIES,
    SET_FAST_SELLING_PROPERTIES, SET_SEARCH_DATA,
    SET_TOP_DEVELOPER_PROPERTIES,
    SET_TOP_DEVELOPERS,
    SET_TOP_PROPERTIES
} from "../../actions/home/type";

const initialState = {
    loading: false,
    topProperties: [],
    assuredProperties: [],
    exclusiveProperties: [],
    fastSellingProperties: [],
    topDevelopers: [],
    developers: [],
    error: '',
    allProperties: [],
    topDeveloperProperties: [],
    cities: [],
    searchedData:[]
}

const homeReducer = (state = initialState, action) => {
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
        case SET_TOP_PROPERTIES:
            return {
                ...state,
                topProperties: action.payload,
            }
        case SET_EXCLUSIVE_PROPERTIES:
            return {
                ...state,
                exclusiveProperties: action.payload,
            }
        case SET_TOP_DEVELOPERS :
            return {
                ...state,
                topDevelopers: action.payload,
            }
        case SET_FAST_SELLING_PROPERTIES:
            return {
                ...state,
                fastSellingProperties: action.payload,
            }
        case SET_ASSURED_PROPERTIES:
            return {
                ...state,
                assuredProperties: action.payload,
            }
        case SET_DEVELOPERS:
            return {
                ...state,
                developers: action.payload,
            }
        case SET_ALL_PROPERTIES:
            return {
                ...state,
                allProperties: action.payload,
            }
        case SET_ALL_CITIES:
            return {
                ...state,
                cities: action.payload,
            }
        case SET_SEARCH_DATA:
            return {
                ...state,
                searchedData: action.payload,
            }
        case SET_TOP_DEVELOPER_PROPERTIES:
            return {
                ...state,
                topDeveloperProperties: action.payload,
            }
        default:
            return state
    }
}

export default homeReducer
