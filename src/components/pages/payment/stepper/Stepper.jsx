import * as React from 'react'
import {useEffect, useState} from 'react'
import StepperStyle from "./Stepper.module.css";
import {useStepper} from "../../../../base/contexts/StepperProvider"
import {StepperStep, StepperSteps} from "../stepperSteps/StepperSteps";
import {useDispatch, useSelector} from "react-redux";
import {setActiveSteps} from "../../../../actions/payment/index";
import PaymentReducer, {paymentState} from "../../../../reducers/payment";

/**
 * @author Lovesh Singh.
 * @since 19-12-2022.
 * @description to render top developer tab.
 * @return {JSX.Element}
 */
const Stepper = ({children}) => {
    // const [activeSteps, setActiveSteps] = useState([1]);
    const {activeSteps}=useSelector((state) => state.paymentReducer);
    const dispatch=useDispatch()
    const {
        currentStep,
        steps,
        incrementCurrentStep, decrementCurrentStep,
    } = useStepper();

    console.log("Stepper: ", {currentStep, steps, children})
    // const onPressStep = (tabId) => {
    //     let clickedTabId = tabId;
    //     let newArray = [];
    //
    //     while (clickedTabId > 1) {
    //         clickedTabId--;
    //         newArray.push(clickedTabId)
    //     }
    //
    //     console.log("TAbid: ", tabId, currentStep)
    //
    //     newArray.push(tabId)
    //     dispatch(setActiveSteps(newArray));
    //     if (tabId < currentStep + 1) {
    //         console.log("decrease")
    //         decrementCurrentStep()
    //     } else if (tabId > currentStep + 1) {
    //         incrementCurrentStep();
    //     }
    // }

    return (
        <div>
            <div className={StepperStyle["stepper"]}>
                <div
                    className={`${StepperStyle["stepper__step"]} ${activeSteps.includes(1) ? StepperStyle["stepper__step-active"] : ""}`}
                    // onClick={() => onPressStep(1)}
                >
                    <p className={StepperStyle["stepper__step-num"]}>1</p>
                    <p className={`${StepperStyle["stepper__step-text"]} ${activeSteps.includes(1) ? StepperStyle["stepper__step-text-active"] : ""}`}>Booking
                        Overview</p>
                </div>

                <div
                    className={`${StepperStyle["stepper__progress"]} ${activeSteps.includes(2) ? StepperStyle["stepper__progress-active"] : ""}`}/>
                <div
                    className={`${StepperStyle["stepper__step"]} ${activeSteps.includes(2) ? StepperStyle["stepper__step-active"] : ""}`}
                    // onClick={() => onPressStep(2)}
                >
                    <p className={StepperStyle["stepper__step-num"]}>2</p>
                    <p className={`${StepperStyle["stepper__step-text"]} ${activeSteps.includes(2) ? StepperStyle["stepper__step-text-active"] : ""}`}>Make
                        Payment</p>
                </div>

                <div
                    className={`${StepperStyle["stepper__progress"]} ${activeSteps.includes(3) ? StepperStyle["stepper__progress-active"] : ""}`}/>
                <div
                    className={`${StepperStyle["stepper__step"]} ${activeSteps.includes(3) ? StepperStyle["stepper__step-active"] : ""}`}
                    // onClick={() => onPressStep(3)}
                >
                    <p className={StepperStyle["stepper__step-num"]}>3</p>
                    <p className={`${StepperStyle["stepper__step-text"]} ${activeSteps.includes(3) ? StepperStyle["stepper__step-text-active"] : ""}`}>Transaction
                        Complete</p>
                </div>
            </div>
            <div style={{textAlign: "center", marginTop: "3rem"}}>
                {children}
            </div>
        </div>
    )
}

Stepper.Step = StepperStep;
Stepper.Steps = StepperSteps;

export default Stepper;
