import * as React from 'react'
import ProgressTrackerStyle from "./ProgressTracker.module.css";
import {endBookingStatus, startBookingStatus, StatusConstants} from "../../../../constants/StatusConstants";

/**
 * @author Lovesh Singh.
 * @since 10-01-2022.
 * @description to render progress tracker.
 * @return {JSX.Element}
 */
const ProgressTracker = ({status}) => {
    const BookingStatusLevels = StatusConstants.filter((status) => status.level >= startBookingStatus.level);
    const currentStatus = BookingStatusLevels.find((item) => item.name === status);
    const activeSteps = currentStatus?.level;

    return (
        <div className={ProgressTrackerStyle['progress-tracker']}>
            <div className={ProgressTrackerStyle['progress-tracker__wrapper']}>
                {BookingStatusLevels.map((status) => (
                    <>
                        <div
                            className={`${ProgressTrackerStyle['progress-tracker__step']} ${
                                activeSteps >= status.level
                                    ? ProgressTrackerStyle['progress-tracker__step-active']
                                    : ''
                            }`}
                        >
                            <p
                                className={`${ProgressTrackerStyle['progress-tracker__step-text']} ${
                                    activeSteps >= status.level
                                        ? ProgressTrackerStyle['progress-tracker__step-text-active']
                                        : ''
                                }`}
                            >
                                {status.name}
                            </p>
                        </div>
                        {status.level < endBookingStatus.level && (
                            <div
                                className={`${ProgressTrackerStyle['progress-tracker__progress']} ${
                                    activeSteps > status.level
                                        ? ProgressTrackerStyle['progress-tracker__progress-active']
                                        : ''
                                }`}
                            />

                        )}
                    </>
                ))}
            </div>
        </div>



        /*<div className={ProgressTrackerStyle['progress-tracker']}>
            <div className={ProgressTrackerStyle['progress-tracker__wrapper']}>

                <div
                    className={`${ProgressTrackerStyle["progress-tracker__step"]} ${activeSteps.includes(500) ? ProgressTrackerStyle["progress-tracker__step-active"] : ""}`}>
                    <p className={`${ProgressTrackerStyle["progress-tracker__step-text"]} ${activeSteps.includes(500) ? ProgressTrackerStyle["progress-tracker__step-text-active"] : ""}`}>Book
                        Property</p>
                </div>
                <div
                    className={`${ProgressTrackerStyle["progress-tracker__progress"]} ${activeSteps.includes(600) ? ProgressTrackerStyle["progress-tracker__progress-active"] : ""}`}/>

                <div
                    className={`${ProgressTrackerStyle["progress-tracker__step"]} ${activeSteps.includes(600) ? ProgressTrackerStyle["progress-tracker__step-active"] : ""}`}>
                    <p className={`${ProgressTrackerStyle["progress-tracker__step-text"]} ${activeSteps.includes(600) ? ProgressTrackerStyle["progress-tracker__step-text-active"] : ""}`}>
                        Payment Made
                    </p>
                </div>
                <div
                    className={`${ProgressTrackerStyle["progress-tracker__progress"]} ${activeSteps.includes(700) ? ProgressTrackerStyle["progress-tracker__progress-active"] : ""}`}/>
                <div
                    className={`${ProgressTrackerStyle["progress-tracker__step"]} ${activeSteps.includes(700) ? ProgressTrackerStyle["progress-tracker__step-active"] : ""}`}>
                    <p className={`${ProgressTrackerStyle["progress-tracker__step-text"]} ${activeSteps.includes(700) ? ProgressTrackerStyle["progress-tracker__step-text-active"] : ""}`}>Payment
                        Cancelled</p>
                </div>
                <div
                    className={`${ProgressTrackerStyle["progress-tracker__progress"]} ${activeSteps.includes(800) ? ProgressTrackerStyle["progress-tracker__progress-active"] : ""}`}/>

                <div
                    className={`${ProgressTrackerStyle["progress-tracker__step"]} ${activeSteps.includes(800) ? ProgressTrackerStyle["progress-tracker__step-active"] : ""}`}>
                    <p className={`${ProgressTrackerStyle["progress-tracker__step-text"]} ${activeSteps.includes(800) ? ProgressTrackerStyle["progress-tracker__step-text-active"] : ""}`}>Payment
                        Received</p>
                </div>
                <div
                    className={`${ProgressTrackerStyle["progress-tracker__progress"]} ${activeSteps.includes(900) ? ProgressTrackerStyle["progress-tracker__progress-active"] : ""}`}/>

                <div
                    className={`${ProgressTrackerStyle["progress-tracker__step"]} ${activeSteps.includes(900) ? ProgressTrackerStyle["progress-tracker__step-active"] : ""}`}>
                    <p className={`${ProgressTrackerStyle["progress-tracker__step-text"]} ${activeSteps.includes(900) ? ProgressTrackerStyle["progress-tracker__step-text-active"] : ""}`}>
                        Sign Agreement
                    </p>
                </div>
            </div>
        </div>*/
    )
}


export default ProgressTracker;
