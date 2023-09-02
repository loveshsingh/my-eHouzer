/**
 * @author Lovesh Singh.
 * @since 12-01-2023.
 * @description to set can proceed further .
 * @returns {{payload, type}}
 */
import {
    BOOKING_ID,
    ERROR,
    LOADING,
    PROPERTY_AMENITIES,
    PROPERTY_DEVELOPER,
    PROPERTY_TYPE_VARIANTS,
    PROPERTY_VARIANT,
    PROPERTY_VARIANTS_BOOKING,
    PROPERTY_VIEW
} from "./type";
import {PropertyApiService} from "../../services/PropertyApiService";
import {BookingApiService} from "../../services/BookingApiService";
import {RmApiService} from "../../services/RmApiService";
import {messageHandlerToast} from "../../helper/Utility";
import {TOAST_MESSAGES} from "../../components/adminComponents/constants/Constant";

const propertyView = (user) => ({
    type: PROPERTY_VIEW,
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

const propertyTypeVariants = (propertyVariants) => ({
    type: PROPERTY_TYPE_VARIANTS,
    payload: propertyVariants
})

const setPropertyVariants = (propertyVariants) => ({
    type: PROPERTY_VARIANTS_BOOKING,
    payload: propertyVariants
})
const propertyAmenities = (propertyAmenities) => ({
    type: PROPERTY_AMENITIES,
    payload: propertyAmenities,
})
const propertyDeveloper = (developer) => ({
    type: PROPERTY_DEVELOPER,
    payload: developer
})
const propertyVariant = (variant) => ({
    type: PROPERTY_VARIANT,
    payload: variant
})
const getBookingId = (bookingId) => ({
    type: BOOKING_ID,
    payload: bookingId
})

export const viewProperty = (propertyId, propertyViewed) => async (dispatch) => {
    await dispatch(loading(true))
    await PropertyApiService.property(propertyId).then(async (res) => {
        const property = res.data[0]
        dispatch(propertyView(property))
        dispatch(fetchPropertyVariants({propertyId: property.id}))
        propertyViewed(property)
    }).catch((err) => {
        const errorMsg = err.message
        dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(loading(false))
    })
}

export const getDeveloper = (developerId) => async (dispatch) => {
    await dispatch(loading(true))
    await PropertyApiService.developer(developerId).then(async (res) => {
        const developer = res.data[0]
        dispatch(propertyDeveloper(developer))
    }).catch((err) => {
        const errorMsg = err.message
        dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(loading(false))
    })
}

export const getVariants = (propertyId, variantType) => async (dispatch) => {
    await dispatch(loading(true))
    await PropertyApiService.getVariants(propertyId, variantType).then(async (res) => {
        const variants = res.data[0]
        dispatch(propertyTypeVariants(variants))
    }).catch((err) => {
        const errorMsg = err.message
        dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(loading(false))
    })
}

export const fetchPropertyVariants = (data = {propertyId: propertyId, page: 1, perPage: 10}) => async (dispatch) => {
    //  await dispatch(loading(true))
    await RmApiService.getPropertyVariants(data).then(async (res) => {
        const propertyVariants = res.data[0]
        dispatch(setPropertyVariants(propertyVariants))
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        //    dispatch(loading(false))
    })
}

const getAmenities = (propertyId, amenityType) => async (dispatch) => {
    await dispatch(loading(true))
    await PropertyApiService.getAmenities(propertyId, amenityType).then(async (res) => {
        const amenitiesData = res.data[0]
        const filteredAmenities = [];
        amenitiesData.map((amenity) => {
            filteredAmenities.push({id: amenity.id, name: amenity.name})
        })
        //console.log("filteredAmenities",filteredAmenities)
        const amenities = {
            type: amenityType,
            data: filteredAmenities
        }
        //console.log('amenities-stored',amenitiesData)
        dispatch(propertyAmenities(amenities))
    }).catch((err) => {
        const errorMsg = err.message
        dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(loading(false))
    })
}

export const loadAmenities = (propertyId, amenitiesType) => async (dispatch) => {
    //console.log('load')
    await dispatch(loading(true))
    //await dispatch(getAmenities(propertyId,amenitiesType[0]))
    await FetchInitialDataFromAPI(dispatch, propertyId, amenitiesType)
        .then()
        .catch((err) => {
        })
        .finally(() => {
                dispatch(loading(false))
            }
        )
}

const FetchInitialDataFromAPI = async (dispatch, propertyId, amenitiesType) => {
    const promises = []

    amenitiesType.map((amenityType) => {
        promises.push(dispatch(getAmenities(propertyId, amenityType)))
    })
    /*promises.push(getAmenities(propertyId,amenityType));
    promises.push(getAmenities(dispatch));
    promises.push(getAmenities(dispatch));
    promises.push(getAmenities(dispatch));
    promises.push(getAmenities(dispatch));*/
    //promises.push(dispatch(getAmenities(propertyId,amenitiesType[0])))
    //console.log('promise',promises)
    return Promise.all(promises)
}

export const addViewProperty = (userDetails) => async (dispatch) => {
    await dispatch(loading(true))
    await BookingApiService.viewProperty(userDetails).then(async (res) => {
        console.log("View property response: ", res)
    }).catch((err) => {
        const errorMsg = err.message
        dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(loading(false))
    })
}

export const fetchVariantBYId = (variantId) => async (dispatch) => {
    await dispatch(loading(true))
    await BookingApiService.getVariantById(variantId).then(async (res) => {
        const variant = res.data[0]
        dispatch(propertyVariant(variant))
        // setVariant(variant);
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
    }).finally(() => {
        dispatch(loading(false))
    })
}
export const fetchBookingId = (data, isSuccess) => async (dispatch) => {
    let bookingId = ''
    await dispatch(loading(true))
    await BookingApiService.getBookingId(data).then(async (res) => {
        if (res.code === 200) {
            bookingId = res.data[0];
            isSuccess(true);
        }
        dispatch(getBookingId(bookingId))
        // setVariant(variant);
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
    }).finally(() => {
        dispatch(loading(false))
    })
}