import React, {useEffect} from 'react';
import {useStepper} from "../../../../base/contexts/StepperProvider";

export const StepperSteps = function ({children}) {
    const TAG = "StepperSteps";
    const {currentStep, steps, setSteps} = useStepper();

    console.log("Steps children: ", children, steps, currentStep)

    useEffect(() => {
        console.log(TAG, 'useEffect =>', {steps})
        let stepperSteps = React.Children.toArray(children)
            /*.filter((step) => {
                console.log(TAG, 'inside filter', {step, type: typeof step});
                return step?.type?.name === 'StepperStep';
            })*/;
        console.log(TAG, 'useEffect =>', {steps, stepperSteps})
        setSteps(stepperSteps);
    }, [setSteps]);


    return (
        <div>
            {children &&
            React.Children.map(children, (child, index) => {
                if (steps.length) {
                    const childTemp = child.props.id === steps[currentStep]?.props?.id
                        ? child
                        : null

                    console.log(TAG, index, childTemp);

                    return childTemp;
                }
            })}
        </div>
    );
};

export const StepperStep = function ({children}) {
    return <>{children}</>;
};
