export {}
import {DECREMENT_CURRENT_STEP, INCREMENT_CURRENT_STEP, SET_STEPS} from "../../actions/stepper/types";

/**
 * @author Lovesh Singh.
 * @since 22-12-2022.
 * @description stepper initial default state.
 */
export const defaultStepperState = {
    steps: [],
    currentStep: 0
}

/**
 * @author Lovesh Singh.
 * @since 22-12-2022.
 * @description Stepper state handler.
 * @see INITIAL_STATE
 */
export const StepperReducer = (state = defaultStepperState, action) => {
    const {currentStep, steps} = state;
    const {type, payload} = action;
    switch (type) {
        case SET_STEPS:
            return {
                ...state,
                steps: payload.steps
            };
        case INCREMENT_CURRENT_STEP:
            return {
                ...state,
                currentStep:
                    currentStep < steps.length - 1
                        ? currentStep + 1
                        : currentStep
            };
        case DECREMENT_CURRENT_STEP:
            return {
                ...state,
                currentStep:
                    currentStep > 0
                        ? currentStep - 1
                        : currentStep
            };

        default:
            return state;
    }
}
