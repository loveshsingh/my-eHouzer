import {fetchDataFromAPI} from "../network/NetworkConnection";
import {NetworkConfiguration} from "../network/NetworkConfiguration";
import {
    bookingApiResponseHandler, getBookingIdApiResponseHandler,
    offlineBookingPaymentApiResponseHandler,
    viewPropertyApiResponseHandler
} from "../network/NetworkErrorHandler";
import {TOAST_MESSAGES} from "../components/adminComponents/constants/Constant";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
//const API_URL = "http://localhost:8081/api/";

const booking = (visitInfo) => {
    return new Promise((resolve, reject) => {
        console.log("Booking payload: ", visitInfo);
        fetchDataFromAPI(API_URL + NetworkConfiguration.VISIT_BOOKING_API, "POST", {}, JSON.stringify(visitInfo))
            .then(async (res) => {
                console.log("Booking response: ", res);
                if (res.code === 200) {
                    resolve(res);
                } else {
                    reject(res);
                }
                bookingApiResponseHandler(TOAST_MESSAGES.SUCCESS,res)
            })
            .catch((err) => {
                console.log("Booking error: ", err);
                reject(err);
                bookingApiResponseHandler(TOAST_MESSAGES.ERROR,err)
            });
    });
};

const viewProperty = (userDetails) => {
    return new Promise((resolve, reject) => {
        console.log("View property payload: ", userDetails);
        fetchDataFromAPI(API_URL + NetworkConfiguration.VIEW_PROPERTY_API, "POST", {}, JSON.stringify(userDetails))
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res);
                } else {
                    reject(res);
                }
               // viewPropertyApiResponseHandler(TOAST_MESSAGES.SUCCESS,res)
            })
            .catch((err) => {
                reject(err);
                //viewPropertyApiResponseHandler(TOAST_MESSAGES.ERROR,err)
            });
    });
};
const getVariantById = (variantId) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.PROPERTY_VARIANT_BY_ID+'?variantId='+variantId, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res);
                } else {
                    reject(res);
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
};
const getBookingId = (data) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.BOOKING, "POST", {}, JSON.stringify(data))
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res);
                } else {
                    reject(res);
                }
                // getBookingIdApiResponseHandler(TOAST_MESSAGES.SUCCESS,res)
            })
            .catch((err) => {
                reject(err);
                getBookingIdApiResponseHandler(TOAST_MESSAGES.ERROR,err)
            });
    });
};
const offlineBookingPayment = (formData) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.BOOKING_PAYMENT_OFFLINE, "POST", {},formData)
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res);
                } else {
                    reject(res);
                }
                offlineBookingPaymentApiResponseHandler(TOAST_MESSAGES.SUCCESS,res)
            })
            .catch((err) => {
                reject(err);
                offlineBookingPaymentApiResponseHandler(TOAST_MESSAGES.ERROR,err)
            });
    });
};

export const BookingApiService = {
    booking,
    viewProperty,
    getBookingId,
    getVariantById,
    offlineBookingPayment
};
