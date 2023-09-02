import React, {useCallback, useEffect, useRef, useState} from "react";
import AppMultiRangeSliderStyle from "./AppMultiRangeSlider.module.css"

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @constructor
 * @description custom multi range slider Component.
 * @since 30-01-2023
 */
const AppMultiRangeSlider = ({minVal, maxVal, setMinVal, setMaxVal}) => {

    const [minValText, setMinValText] = useState("0");
    const [maxValText, setMaxValText] = useState("10 Cr");
    const minValRef = useRef(null);
    const maxValRef = useRef(null);
    const range = useRef(null);

    const minOfRange = 0;
    const maxOfRange = 30;

    // Convert to percentage
    const getPercent = useCallback(
        (value) => Math.round(((value - minOfRange) / (maxOfRange - minOfRange)) * 100), [minOfRange, maxOfRange]
    );

// Set width of the range to decrease from the left side
    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            // @ts-ignore
            const maxPercent = getPercent(+maxValRef.current?.value);

            if (range.current) {
                // @ts-ignore
                range.current.style.left = `${minPercent}%`;
                // @ts-ignore
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, getPercent]);

// Set width of the range to decrease from the right side
    useEffect(() => {
        if (minValRef.current) {
            // @ts-ignore
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                // @ts-ignore
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxVal, getPercent]);

    const getValue = (value) => {
        switch (value) {
            case 0:
                return "Min Budget";
            case 5:
                return "10 Lacs";
            case 10:
                return "25 Lacs";
            case 15:
                return "50 Lacs";
            case 20:
                return "1 Cr";
            case 25:
                return "5 Cr";
            case 30:
                return "Max Budget";
            default:
                return "0"
        }
    }

    useEffect(() => {
        setMinValText(getValue(minVal));
        setMaxValText(getValue(maxVal));
    }, [minVal, maxVal]);


    return (
        <>
            <input
                type="range"
                min={minOfRange}
                max={maxOfRange}
                value={minVal}
                ref={minValRef}
                onChange={(event) => {
                    const value = Math.min(+event.target.value, maxVal - 5);
                    setMinVal(value)
                    event.target.value = value.toString();
                }}
                step={5}
                // className="thumb thumb--zindex-3"
                className={`${AppMultiRangeSliderStyle["thumb"]} ${AppMultiRangeSliderStyle["thumb--zindex-3"]} ${AppMultiRangeSliderStyle[minVal > maxVal - 100 ? "thumb--zindex-5" : ""]} `}
            />
            <input
                type="range"
                min={minOfRange}
                max={maxOfRange}
                value={maxVal}
                ref={maxValRef}
                step={5}
                onChange={(event) => {
                    const value = Math.max(+event.target.value, minVal + 5);
                    setMaxVal(value)
                    event.target.value = value.toString();
                }}
                // className="thumb thumb--zindex-4"
                className={`${AppMultiRangeSliderStyle["thumb"]} ${AppMultiRangeSliderStyle["thumb--zindex-4"]} `}
            >
            </input>
            <div className={AppMultiRangeSliderStyle["slider"]}>
                <div className={AppMultiRangeSliderStyle["slider__left-value"]}>{minValText}</div>
                <div className={AppMultiRangeSliderStyle["slider__right-value"]}>{maxValText}</div>
                <div className={AppMultiRangeSliderStyle["slider__track"]}/>
                <div ref={range} className={AppMultiRangeSliderStyle["slider__range"]}/>
            </div>
        </>
    )
}

export default AppMultiRangeSlider
