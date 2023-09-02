import {fetchDataFromAPI} from "../network/NetworkConnection";
import {NetworkConfiguration} from "../network/NetworkConfiguration";
import {updateMeetingApiResponseHandler} from "../network/NetworkErrorHandler";
import {TOAST_MESSAGES} from "../components/adminComponents/constants/Constant";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
//const API_URL = "http://localhost:8081/api/";
const topProperties = (condition) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.PROPERTIES_API + "?" + condition, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
                //topPropertiesApiResponseHandler(TOAST_MESSAGES.SUCCESS,res)
            })
            .catch((err) => {
                // logoutAPIErrorHandler(err)
                reject(err)
                //topPropertiesApiResponseHandler(TOAST_MESSAGES.ERROR,err)
            })
    })
}

const developerProperties = (developerId) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.DEVELOPER_PROPERTIES_API + "?developerId=" + developerId, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
                //developerPropertiesApiResponseHandler(TOAST_MESSAGES.SUCCESS,res)
            })
            .catch((err) => {
                // logoutAPIErrorHandler(err)
                reject(err)
                //developerPropertiesApiResponseHandler(TOAST_MESSAGES.ERROR,err)
            })
    })
}

const property = (propertyId) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.PROPERTY_API + "?id=" + propertyId, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
                //propertyApiResponseHandler(TOAST_MESSAGES.SUCCESS,res)
            })
            .catch((err) => {
                // logoutAPIErrorHandler(err)
                reject(err)
                //propertyApiResponseHandler(TOAST_MESSAGES.ERROR,err)
            })
    })
}

const filteredProperties = (filters) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.FILTER_PROPERTIES_API, "POST", {}, JSON.stringify(filters))
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
                //filteredPropertiesApiResponseHandler(TOAST_MESSAGES.SUCCESS,res)
            })
            .catch((err) => {
                // logoutAPIErrorHandler(err)
                reject(err)
                //filteredPropertiesApiResponseHandler(TOAST_MESSAGES.ERROR,err)
            })
    })
}
const developer = (developerId) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.DEVELOPER_API + "?developerId=" + developerId, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
                //developerApiResponseHandler(TOAST_MESSAGES.SUCCESS,res)
            })
            .catch((err) => {
                // logoutAPIErrorHandler(err)
                reject(err)
                //developerApiResponseHandler(TOAST_MESSAGES.ERROR,err)
            })
    })
}
const getVariants = (propertyId, variantType) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.PROPERTY_VARIANTS_API + "?propertyId=" + propertyId + "&variantType=" + variantType, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
                //getVariantsApiResponseHandler(TOAST_MESSAGES.SUCCESS,res)
            })
            .catch((err) => {
                // logoutAPIErrorHandler(err)
                reject(err)
                //getVariantsApiResponseHandler(TOAST_MESSAGES.ERROR,err)
            })
    })
}

const getAmenities = (propertyId, amenityType) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.PROPERTY_AMENITY_API + "?propertyId=" + propertyId + "&amenityType=" + amenityType, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
                //getAmenitiesApiResponseHandler(TOAST_MESSAGES.SUCCESS,res)
            })
            .catch((err) => {
                // logoutAPIErrorHandler(err)
                reject(err)
                //getAmenitiesApiResponseHandler(TOAST_MESSAGES.ERROR,err)
            })
    })
}

const getPropertyAmenities = (propertyId) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.PROPERTY_AMENITIES_API + "?propertyId=" + propertyId, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
                //getPropertyApiResponseHandler(TOAST_MESSAGES.SUCCESS,res)
            })
            .catch((err) => {
                // logoutAPIErrorHandler(err)
                reject(err)
                //getPropertyApiResponseHandler(TOAST_MESSAGES.ERROR,err)
            })
    })
}

const getMeetings = (meetingType) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.VISIT_PROPERTY_API + "?meetingType=" + meetingType, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
                //getMeetingsApiResponseHandler(TOAST_MESSAGES.SUCCESS,res)
            })
            .catch((err) => {
                // logoutAPIErrorHandler(err)
                reject(err)
                //getMeetingsApiResponseHandler(TOAST_MESSAGES.ERROR,err)
            })
    })
}

const getViewedProperties = () => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.VIEWED_PROPERTY_API, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
                //getViewedPropertiesApiResponseHandler(TOAST_MESSAGES.SUCCESS,res)
            })
            .catch((err) => {
                reject(err)
                //getViewedPropertiesApiResponseHandler(TOAST_MESSAGES.ERROR,err)
            })
    })
}

const getBookedProperties = (status) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.USER_BOOKED_PROPERTY_API + "?status=" + status, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const getVisitedProperties = () => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.VISITED_PROPERTY_API, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
                //getVisitedPropertiesApiResponseHandler(TOAST_MESSAGES.SUCCESS,res)
            })
            .catch((err) => {
                reject(err)
                //getVisitedPropertiesApiResponseHandler(TOAST_MESSAGES.ERROR,err)
            })
    })
}

const updateMeeting = (meetingData) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.VISIT_PROPERTY_API, "PUT", {}, meetingData)
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                // logoutAPIErrorHandler(err)
                reject(err)
                updateMeetingApiResponseHandler(TOAST_MESSAGES.ERROR, err)
            })
    })
}

const allProperties = () => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.ALL_PROPERTIES_API, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
                //allPropertiesApiResponseHandler(TOAST_MESSAGES.SUCCESS,res)
            })
            .catch((err) => {
                // logoutAPIErrorHandler(err)
                reject(err)
                //allPropertiesApiResponseHandler(TOAST_MESSAGES.ERROR,err)
            })
    })
}

const allCities = () => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.ALL_CITIES_API, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
                //allPropertiesApiResponseHandler(TOAST_MESSAGES.SUCCESS,res)
            })
            .catch((err) => {
                // logoutAPIErrorHandler(err)
                reject(err)
                //allPropertiesApiResponseHandler(TOAST_MESSAGES.ERROR,err)
            })
    })
}
const keywordSearch = (keywordData) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.KEYWORD_SEARCH_API, "POST", {},JSON.stringify(keywordData))
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
                //allPropertiesApiResponseHandler(TOAST_MESSAGES.SUCCESS,res)
            })
            .catch((err) => {
                // logoutAPIErrorHandler(err)
                reject(err)
                //allPropertiesApiResponseHandler(TOAST_MESSAGES.ERROR,err)
            })
    })
}

export const PropertyApiService = {
    topProperties, developerProperties, property, getVariants, getAmenities, developer, filteredProperties, getMeetings,
    updateMeeting, getViewedProperties, getVisitedProperties, allProperties, getPropertyAmenities, getBookedProperties,allCities,
    keywordSearch
}
