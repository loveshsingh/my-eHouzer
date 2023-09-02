import {
    BOOKED_PENDING_PROP_LOADING,
    BOOKED_PENDING_PROPERTIES,
    BOOKING_ID,
    ERROR,
    LOADING,
    PROPERTY_AMENITIES,
    PROPERTY_DEVELOPER,
    PROPERTY_TYPE_VARIANTS, PROPERTY_VARIANT, PROPERTY_VARIANTS_BOOKING,
    PROPERTY_VIEW
} from "../../actions/booking/type";

/**
 * @author Lovesh Singh.
 * @since 12-01-2023.
 * @description login initial default state.
 */
export const defaultLoginState = {
    loading: false,
    property: [],
    variants: [],
    amenities: {},
    developer: [],
    error: '',
    propertyVariants:[],
    propertyVariant: {},
    bookingId: '',

    bookedPendingProperties:[],
    bookedPendingPropLoading:false,
}

/**
 * @author Lovesh Singh.
 * @since 12-01-2023.
 * @description Signin state handler.
 * @see INITIAL_STATE
 */
const bookingReducer = (state = defaultLoginState, action) => {
    const {type, payload} = action;
    switch (type) {
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
        case PROPERTY_VIEW:
            return {
                ...state,
                property: payload,
            }
        case PROPERTY_TYPE_VARIANTS :
            return {
                ...state,
                variants: payload
            }
        case PROPERTY_AMENITIES :
            return handlePropertyAmenities(state, payload)

        case PROPERTY_DEVELOPER:
            return {
                ...state,
                developer: payload
            }
        case PROPERTY_VARIANTS_BOOKING:
            return {
                ...state,
                propertyVariants: payload
            }
        case PROPERTY_VARIANT:
            return {
                ...state,
                propertyVariant: payload
            }
        case BOOKING_ID:
            return {
                ...state,
                bookingId: payload
            }
        case BOOKED_PENDING_PROPERTIES:
            return {
                ...state,
                bookedPendingProperties: action.payload,
            }
        case BOOKED_PENDING_PROP_LOADING:
            return {
                ...state,
                bookedPendingPropLoading: action.payload,
            }

        default:
            return state;
    }
}

export default bookingReducer

function handlePropertyAmenities(state, payload) {
    const oldAmenities = state.amenities
    oldAmenities[payload.type] = payload.data
    return {
        ...state,
        amenities: oldAmenities
    }
}
