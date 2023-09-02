/**
 * @author Lovesh Singh.
 * @since 12-01-2023.
 * @description to set can proceed further .
 * @returns {{payload, type}}
 */
import {
    CAN_PROCEED_FURTHER,
    ERROR,
    LOADING,
    LOGGED_IN,
    MEETINGS_LOADING,
    SET_AUTH_STATE,
    SET_SHORTLISTED_PROPERTIES,
    SET_USER_BOOKED_PROPERTIES,
    SET_USER_BOOKED_PROPERTIES_LOADING,
    SET_USER_MY_PROPERTIES,
    SET_USER_PROFILE,
    SET_VIEWED_PROPERTIES, SET_VIEWED_PROPERTIES_COUNT,
    SET_VISITED_PROPERTIES,
    SET_VISITS,
    UPDATE_MEETING,
    UPDATE_USER_PROFILE
} from "./types";
import {UserApiService} from "../../services/UserApiService";
import {
    clearAuthAsyncStorage,
    clearShortlistedPropertiesStorage,
    getShortlistedPropertiesStorage,
    setAuthAsyncStorage
} from "../../storage/AuthAsyncStorage";
import {WishListApiService} from "../../services/WishListApiService";
import {PropertyApiService} from "../../services/PropertyApiService";
import {messageHandlerToast} from "../../helper/Utility";
import {TOAST_MESSAGES} from "../../components/adminComponents/constants/Constant";
import {BOOKED_PENDING_PROP_LOADING, BOOKED_PENDING_PROPERTIES} from "../booking/type";

export const canProceedFurther = (data) => ({
    type: CAN_PROCEED_FURTHER,
    payload: data
});

const loggedIn = (user) => ({
    type: LOGGED_IN,
    payload: user
});

const error = (error) => ({
    type: ERROR,
    payload: error
})

const loading = (loading) => ({
    type: LOADING,
    payload: loading
})
const meetingsLoading = (loading) => ({
    type: MEETINGS_LOADING,
    payload: loading
})

export const setAuthState = (userDetails) => ({
    type: SET_AUTH_STATE,
    payload: userDetails
})

const setProfileDetails = (profile) => ({
    type: SET_USER_PROFILE,
    payload: profile
})
const setViewedProperties = (properties) => ({
    type: SET_VIEWED_PROPERTIES,
    payload: properties
})
const setVisitedProperties = (properties) => ({
    type: SET_VISITED_PROPERTIES,
    payload: properties
})
const updateProfileDetails = (updatedProfile) => ({
    type: UPDATE_USER_PROFILE,
    payload: updatedProfile
})
const updateVisits = (msg) => ({
    type: UPDATE_MEETING,
    payload: msg
})
const setVisits = (visits) => ({
    type: SET_VISITS,
    payload: visits
})

const setBookedProperties = (CustomerProperties) => ({
    type: SET_USER_BOOKED_PROPERTIES,
    payload: CustomerProperties
})
const setBookedPropertiesLoading = (value) => ({
    type: SET_USER_BOOKED_PROPERTIES_LOADING,
    payload: value
})
const setBookedPendingProperties = (value) => ({
    type: BOOKED_PENDING_PROPERTIES,
    payload: value
})
const setBookedPendingLoading = (value) => ({
    type: BOOKED_PENDING_PROP_LOADING,
    payload: value
})

const setMyProperties = (CustomerProperties) => ({
    type: SET_USER_MY_PROPERTIES,
    payload: CustomerProperties
})
export const setShortlistedProperties = (shortlistedProperties) => ({
    type: SET_SHORTLISTED_PROPERTIES,
    payload: shortlistedProperties
})
export const setViewedPropertiesCount = (count) => ({
    type: SET_VIEWED_PROPERTIES_COUNT,
    payload: count
})


export const fetchWishListProperties = () => async (dispatch) => {
    await dispatch(loading(true))
    await WishListApiService.wishlistService("", "GET").then(async (res) => {
        const properties = res.data[0]
        dispatch(setShortlistedProperties(properties))
    }).catch((err) => {
        const errorMsg = err.message
        // messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(loading(false))
    })
}

export const updateWishListProperties = (propertyId, method, shortlistedProperties) => async (dispatch) => {
    await dispatch(loading(true))
    await WishListApiService.wishlistService("propertyId=" + propertyId, method).then(async (res) => {
        dispatch(setShortlistedProperties(shortlistedProperties))
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        //console.log('error',errorMsg)
        dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(loading(false))
    })
}

export const fetchProfileDetails = (userId) => async (dispatch) => {
    await dispatch(loading(true))
    await UserApiService.userProfile("userId=" + userId).then(async (res) => {
        const profile = res.data[0]
        dispatch(setProfileDetails(profile))
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(loading(false))
    })
}
export const fetchViewedPropertiesCount = () => async (dispatch) => {
    await UserApiService.viewedPropertiesCount().then(async (res) => {
        const count = res.data[0]
        dispatch(setViewedPropertiesCount(count))
    }).catch((err) => {
        const errorMsg = err.message
       /* messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        dispatch(error(errorMsg))*/
    }).finally(() => {
     //   dispatch(loading(false))
    })
}
export const fetchViewedProperties = () => async (dispatch) => {
    await dispatch(loading(true))
    await PropertyApiService.getViewedProperties().then(async (res) => {
        const properties = res.data[0]
        dispatch(setViewedProperties(properties))
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(loading(false))
    })
}

export const fetchVisitedProperties = () => async (dispatch) => {
    await dispatch(loading(true))
    await PropertyApiService.getVisitedProperties().then(async (res) => {
        const properties = res.data[0]
        dispatch(setVisitedProperties(properties))
    }).catch((err) => {
        const errorMsg = err.message
        dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(loading(false))
    })
}

export const fetchBookedProperties = (status) => async (dispatch) => {
    await dispatch(loading(true))
    await dispatch(setBookedPropertiesLoading(true))
    await PropertyApiService.getBookedProperties(status).then(async (res) => {
        const customerProperties = res.data[0]
        dispatch(setBookedProperties(customerProperties))
    }).catch((err) => {
        const errorMsg = err.message
        dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(setBookedPropertiesLoading(false))
        dispatch(loading(false))
    })
}

export const fetchBookedPendingProperties = (status) => async (dispatch) => {
    await dispatch(setBookedPendingLoading(true))
    await PropertyApiService.getBookedProperties(status).then(async (res) => {
        const customerProperties = res.data[0]
        dispatch(setBookedPendingProperties(customerProperties))
    }).catch((err) => {
        const errorMsg = err.message
        dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(setBookedPendingLoading(false))
    })
}

export const fetchMyProperties = (status) => async (dispatch) => {
    await dispatch(loading(true))
    await PropertyApiService.getBookedProperties(status).then(async (res) => {
        const customerProperties = res.data[0]
        dispatch(setMyProperties(customerProperties))
    }).catch((err) => {
        const errorMsg = err.message
        dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(loading(false))
    })
}

export const updateProfileData = (updateData, onSuccess, onError) => async (dispatch) => {
    await dispatch(loading(true))
    await UserApiService.updateUserProfile(updateData).then(async (res) => {
        /*const updatedProfile = res.data[0]
        console.log('What inside this', updatedProfile)
        dispatch(updateProfileDetails(updatedProfile))*/
        onSuccess?.call(this, {isUpdated: true})
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        dispatch(error(errorMsg))
        onError?.call(this, err)
    }).finally(() => {
        dispatch(loading(false))
    })
}

export const updateMeetings = (updateVisitData, onSuccess, onError) => async (dispatch) => {
    await dispatch(loading(true))
    await PropertyApiService.updateMeeting(updateVisitData).then(async (res) => {
        if (res.code === 200) {
            const updatedVisits = res.data[0]
            dispatch(updateVisits(updatedVisits))
            onSuccess?.call(this, {isUpdated: true})
        }
        messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        dispatch(error(errorMsg))
        onError?.call(this, err)
    }).finally(() => {
        dispatch(loading(false))
    })
}

export const getMeetings = (meetingData, meetingType) => async (dispatch) => {
    await dispatch(meetingsLoading(true))
    await PropertyApiService.getMeetings(meetingData).then(async (res) => {
        const meetings = res.data[0]
        const visits = {
            type: meetingType,
            data: meetings
        }
        dispatch(setVisits(visits))
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(meetingsLoading(false))
    })
}

export const login = (user, onSuccess, onError) => async (dispatch) => {
    await dispatch(loading(true))
    await UserApiService.login(user).then(async (res) => {
        const userDetails = res.data[0]
        await handleLoginAPIResponse(userDetails, dispatch)
        onSuccess(true, userDetails, res);
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(loading(false))
    })
}

export const logout = (onLogout) => async (dispatch) => {
    await dispatch(loading(true))
    await UserApiService.logout().then().catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        dispatch(error(errorMsg))
    }).finally(async () => {
        await handleLogoutAPIResponse()
        await dispatch(setAuthState(undefined))
        await dispatch(loading(undefined))
        onLogout(true);
    })
}

const syncShortlistedProperties = async (userDetails, dispatch) => {
    const shortlistedPropertiesStorage = await getShortlistedPropertiesStorage();
    const shortlistedProperties = await JSON.parse(shortlistedPropertiesStorage?.shortlistedProperties)
    if (shortlistedProperties) {
        shortlistedProperties.map((property) => {
            dispatch(updateWishListProperties(property?.id, "POST", shortlistedProperties))
        })
    }
    await clearShortlistedPropertiesStorage()
    fetchWishListProperties()
}

/**
 * @author Lovesh Singh.
 * @since 31-01-2023.
 * @description to handle login api response.
 */
const handleLoginAPIResponse = async (userDetails, dispatch) => {
    await dispatch(setAuthState(userDetails))
    await setAuthAsyncStorage(userDetails)
    if (userDetails.userRoleList[0].name === 'CUSTOMER') {
        await syncShortlistedProperties(userDetails, dispatch)
    }

}

const handleLogoutAPIResponse = async () => {
    await clearAuthAsyncStorage()
}


/*Start Email Login/Register*/

export const emailSignupLogin = (emailId, onSuccess, onError) => async (dispatch) => {
    await dispatch(loading(true))
    await UserApiService.emailSignupLogin(emailId).then(async (res) => {
        if (res.code < 300) {
            messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        }
        onSuccess(true, res);
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(loading(false))
    })
}
export const emailSignup = (user, onSuccess, onError) => async (dispatch) => {
    await dispatch(loading(true))
    await UserApiService.emailSignup(JSON.stringify(user)).then(async (res) => {
        if (res.code < 300) {
            messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        }
        onSuccess(true, res);
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(loading(false))
    })
}
export const verifyEmailSignup = (user, onSuccess, onError) => async (dispatch) => {
    await dispatch(loading(true))
    await UserApiService.verifyEmailSignup(JSON.stringify(user)).then(async (res) => {
        if (res.code === 200) {
            messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        }
        const userDetails = res.data[0]
        await handleLoginAPIResponse(userDetails, dispatch)
        onSuccess(true, userDetails, res);
        // onSuccess(true, res);
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(loading(false))
    })
}
export const verifyEmailLogin = (user, onSuccess, onError) => async (dispatch) => {
    await dispatch(loading(true))
    await UserApiService.verifyEmailLogin(JSON.stringify(user)).then(async (res) => {
        if (res.code === 200) {
            messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        }
        const userDetails = res.data[0]
        await handleLoginAPIResponse(userDetails, dispatch)
        onSuccess(true, userDetails, res);
        // onSuccess(true, res);
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(loading(false))
    })
}
/*End Email Login/Register*/


/*Start Mobile Login/Register*/
export const mobileSignupLogin = (emailId, onSuccess, onError) => async (dispatch) => {
    await dispatch(loading(true))
    await UserApiService.mobileSignupLogin(emailId).then(async (res) => {
        if (res.code < 300) {
            messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        }
        onSuccess(true, res);
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(loading(false))
    })
}
export const mobileSignup = (user, onSuccess, onError) => async (dispatch) => {
    await dispatch(loading(true))
    await UserApiService.mobileSignup(JSON.stringify(user)).then(async (res) => {
        if (res.code < 300) {
            messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        }
        onSuccess(true, res);
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(loading(false))
    })
}
export const verifyMobileSignup = (user, onSuccess, onError) => async (dispatch) => {
    await dispatch(loading(true))
    await UserApiService.verifyMobileSignup(JSON.stringify(user)).then(async (res) => {
        if (res.code === 200) {
            messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        }
        const userDetails = res.data[0]
        await handleLoginAPIResponse(userDetails, dispatch)
        onSuccess(true, userDetails, res);
        // onSuccess(true, res);
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(loading(false))
    })
}
export const verifyMobileLogin = (user, onSuccess, onError) => async (dispatch) => {
    await dispatch(loading(true))
    await UserApiService.verifyMobileLogin(JSON.stringify(user)).then(async (res) => {
        if (res.code === 200) {
            messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        }
        const userDetails = res.data[0]
        await handleLoginAPIResponse(userDetails, dispatch)
        onSuccess(true, userDetails, res);
        // onSuccess(true, res);
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(loading(false))
    })
}
/*End Mobile Login/Register*/




