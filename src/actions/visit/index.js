import {CLEAR_VISIT_INFO, ERROR, LOADING, SET_BOOKING_COMPLETE, SET_VISIT_INFO} from "./types";
import {BookingApiService} from "../../services/BookingApiService";

const loading = (loading) => ({
    type: LOADING,
    payload: loading
})
const error = (error) => ({
    type: ERROR,
    payload: error
})
export const setVisitInfo = (visitInfo) => {
    return {
        type: SET_VISIT_INFO,
        payload: visitInfo
    }
}

export const clearVisitInfo = () => {
    return {
        type: CLEAR_VISIT_INFO,
    }
}

export const setBookingComplete = (bookingComplete) => {
    return {
        type: SET_BOOKING_COMPLETE,
        payload: bookingComplete
    }
}

export const bookProperty = (visitInfo, onSuccess) => async (dispatch) => {
    await dispatch(loading(true))
    await BookingApiService.booking(visitInfo).then(async (res) => {
        if (res?.code === 200) {
            onSuccess(true)
            dispatch(clearVisitInfo())
        }
    }).catch((err) => {
        const errorMsg = err.message
        dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(loading(false))
    })
}
