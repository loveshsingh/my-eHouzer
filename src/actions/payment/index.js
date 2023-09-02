
import {SET_ACTIVE_STEPS} from "./type";
/**
 * @author Vipul Garg.
 * @since 27-04-2023.
 * @description to set can proceed further .
 * @returns {{payload, type}}
 */
export const setActiveSteps = (data) => ({
    type: SET_ACTIVE_STEPS,
    payload: data
})