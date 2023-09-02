import {
    ERROR,
    LOADING,
    LOGGED_IN, MEETINGS_LOADING,
    REMOVE_WISHLIST,
    SET_AUTH_STATE,
    SET_SHORTLISTED_PROPERTIES,
    SET_USER_BOOKED_PROPERTIES, SET_USER_BOOKED_PROPERTIES_LOADING,
    SET_USER_DETAILS,
    SET_USER_MY_PROPERTIES,
    SET_USER_PROFILE,
    SET_VIEWED_PROPERTIES, SET_VIEWED_PROPERTIES_COUNT,
    SET_VISITED_PROPERTIES,
    SET_VISITS,
    UPDATE_MEETING,
    UPDATE_USER_PROFILE
} from "../../actions/login/types";

/**
 * @author Lovesh Singh.
 * @since 12-01-2023.
 * @description login initial default state.
 */
export const authState = {
    canProceedFurther: [],
    userDetails: {},
    isLoggedIn: false,
    error: '',
    shortlistedProperties: [],
    viewedProperties: [],
    visitedProperties: [],

    bookedProperties: [],
    bookedPropertiesLoading: false,

    myProperties: [],
    wishListProperties: [],
    userProfile: [],
    adminMetadata: {},
    visits: {
        todayVisits: [],
        upcomingVisits: [],
        complementaryVisits: []
    },
    updateProfile: '',
    updateMeeting: '',
    viewedPropertiesCount: 0,
    meetingsLoading: false
}

/**
 * @author Lovesh Singh.
 * @since 12-01-2023.
 * @description Signin state handler.
 * @see INITIAL_STATE
 */
const AuthReducer = (state = authState, action) => {
    const {type, payload} = action;
    switch (type) {
        case LOADING :
            return {
                ...state,
                loading: action.payload
            }
        case MEETINGS_LOADING :
            return {
                ...state,
                meetingsLoading: action.payload
            }
        case ERROR :
            return {
                ...state,
                error: action.payload
            }
        case LOGGED_IN:
            return {
                ...state,
                isLoggedIn: true,
                userDetails: payload,
            }
        case SET_USER_DETAILS:
            return {
                ...state,
                userDetails: payload
            }
        case SET_AUTH_STATE:
            let isLoggedIn = false
            if (payload) {
                isLoggedIn = true
            }
            return {
                ...state,
                isLoggedIn: isLoggedIn,
                userDetails: payload
            }
        case SET_SHORTLISTED_PROPERTIES:
            return {
                ...state,
                shortlistedProperties: action.payload,
            }
        case SET_VIEWED_PROPERTIES_COUNT:
            return {
                ...state,
                viewedPropertiesCount: action.payload,
            }
        case REMOVE_WISHLIST:
            return {
                ...state,
                shortlistedProperties: state.shortlistedProperties.filter((property) => property?.id !== action.payload),
            }
        case SET_VIEWED_PROPERTIES:
            return {
                ...state,
                viewedProperties: action.payload,
            }
        case SET_USER_BOOKED_PROPERTIES:
            return {
                ...state,
                bookedProperties: action.payload,
            }
        case SET_USER_BOOKED_PROPERTIES_LOADING:
            return {
                ...state,
                bookedPropertiesLoading: action.payload,
            }
        case SET_USER_MY_PROPERTIES:
            return {
                ...state,
                myProperties: action.payload,
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.payload,
            }
        case UPDATE_USER_PROFILE:
            return {
                ...state,
                updateProfile: action.payload,
            }
        case UPDATE_MEETING:
            return {
                ...state,
                updateMeeting: action.payload,
            }
        case SET_VISITS:
            return handleVisits(state, action.payload)
        case SET_VISITED_PROPERTIES:
            return {
                ...state,
                visitedProperties: action.payload,
            }
        default:
            return state;
    }
}

export default AuthReducer

function handleVisits(state, payload) {
    const oldVisits = {...state.visits}
    oldVisits[payload.type] = payload.data
    const forCheck = JSON.parse(JSON.stringify(oldVisits))
    return {
        ...state,
        visits: forCheck
    }
}
