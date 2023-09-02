import {DISPLAY_CUSTOMER_POPUP, DISPLAY_PROPERTY_BOOKING_POPUP} from "../type";

export const displayCustTablePopupAction = (value) => {
    return {
        type: DISPLAY_PROPERTY_BOOKING_POPUP,
        payload: value
    }
}
export const displayCustomerPopupAction = (value) => {
    return {
        type: DISPLAY_CUSTOMER_POPUP,
        payload: value
    }
}

