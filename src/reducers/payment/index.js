import {SET_ACTIVE_STEPS} from "../../actions/payment/type";


/**
 * @author Vipul Garg.
 * @since 27-04-2023.
 * @description payment initial default state.
 */

export const paymentState = {
    activeSteps:[1],
}

/**
 * @author Vipul Garg.
 * @since 27-04-2023.
 * @description payment state handler.
 * @see INITIAL_STATE
 */
const PaymentReducer = (state = paymentState, action) => {
    const {type, payload} = action;
    switch (type) {
        case SET_ACTIVE_STEPS :
            return {
                ...state,
                activeSteps: action.payload
            }

        default:
            return state;
    }
}

export default PaymentReducer
