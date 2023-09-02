import {createContext, useCallback, useContext, useReducer, useState} from "react";
import {defaultStepperState, StepperReducer} from "../../reducers/stepper";
import {DECREMENT_CURRENT_STEP, INCREMENT_CURRENT_STEP, SET_STEPS} from "../../actions/stepper/types";

//Note: Class based component can't be able to use hook to access Context value for that we have to export this context

export const StepperContext = createContext()

/**
 * @author Lovesh Singh.
 * @since 22-12-2022.
 * @description to handle stepper context feature.
 * @deprecated
 * todo: warning don't use this component anywhere.
 */
const StepperProvider = ({children}) => {

    const [state, dispatch] = useReducer(StepperReducer, defaultStepperState);

    return (
        <StepperContext.Provider value={[state, dispatch]}>
            {children}
        </StepperContext.Provider>
    );
}

export default StepperProvider

export const useStepper = () => {
    const [state, dispatch] = useContext(StepperContext);
    const {currentStep, steps} = state;

    if (!StepperContext) {
        throw new Error('useStepper should be used inside StepperProvider')
    }

    const incrementCurrentStep = useCallback(() => {
        dispatch({
            type: INCREMENT_CURRENT_STEP
        });
    }, [dispatch]);

    const decrementCurrentStep = useCallback(() => {
        dispatch({
            type: DECREMENT_CURRENT_STEP
        });
    }, [dispatch]);

    const setSteps = useCallback(steps => dispatch({type: SET_STEPS, payload: {steps}}), [dispatch]);


    return {
        incrementCurrentStep,
        decrementCurrentStep,
        setSteps,
        currentStep,
        steps,
    }
}
