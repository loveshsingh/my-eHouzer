import {ERROR, LOADING} from "../../actions/home/type";
import {CLEAR_VISIT_INFO, SET_BOOKING_COMPLETE, SET_VISIT_INFO, SET_VISITED_PROPERTY,} from "../../actions/visit/types";

/**
 * @author Lovesh Singh.
 * @since 08-02-2023.
 * @description visit initial default state.
 */
export const InitialVisitState = {
    loading: false,
    error: '',
    visitInfo: {
        propertyId: '',
        bookingDate: '',
        type: '',
        bookingTimeSlot: ''
    },
    visitedProperty: {},
    bookingComplete: false
}

/**
 * @author Lovesh Singh.
 * @since 08-02-2023.
 * @description Visit state handler.
 * @see INITIAL_STATE
 */
const VisitReducer = (state = InitialVisitState, action) => {
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
                isLoggedIn: false,
                error: action.payload
            }
        case SET_VISIT_INFO:
            return {
                ...state,
                visitInfo: {...state.visitInfo, ...payload},
            }
        case CLEAR_VISIT_INFO:
            return {
                ...state,
                visitInfo: InitialVisitState.visitInfo,
            }
        case SET_VISITED_PROPERTY:
            return {
                ...state,
                visitedProperty: payload,
            }
        case SET_BOOKING_COMPLETE:
            return {
                ...state,
                bookingComplete: payload,
                visitInfo: payload ? InitialVisitState.visitInfo : state.visitInfo,
            }
        default:
            return state;
    }
}

export default VisitReducer
