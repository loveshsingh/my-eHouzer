import React, {useEffect} from "react";
import PriceRangeDropdownStyle from "../../../../styles/componentStyles/dropdownStyles/PriceRangeDropdown.module.css"
import AppMultiRangeSlider from "../../../lib/MultiRangeSlider/AppMultiRangeSlider";
import {useDispatch, useSelector} from "react-redux";
import {setSearchFilters} from "../../../../actions/search";

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @constructor
 * @description Price Range Dropdown Component.
 * @since 10-12-2022
 */
const PriceRangeDropdown = () => {

    const [minValue, setMinValue] = React.useState(0);
    const [maxValue, setMaxValue] = React.useState(30);
    const searchFilters = useSelector(((state) => state.searchReducer.searchFilters))
    const dispatch = useDispatch();

    useEffect(() => {
        if (minValue >= 0 || (maxValue <= 30 && maxValue > 0)) {
            dispatch(setSearchFilters({
                ...searchFilters, ...{
                    minBudget: getRangeValue(minValue),
                    maxBudget: getRangeValue(maxValue)
                }
            }))
        }
    }, [minValue, maxValue])

    useEffect(() => {
        if (searchFilters?.minBudget && searchFilters?.maxBudget) {
            setMinValue(getFilterRangeValue(searchFilters?.minBudget))
            setMaxValue(getFilterRangeValue(searchFilters?.maxBudget))
        }
    }, [searchFilters]);

    const handleMinValueChange = (event) => {
        if (+event.target.value < maxValue)
            setMinValue(+event.target.value);
    };

    const handleMaxValueChange = (event) => {
        if (+event.target.value > minValue)
            setMaxValue(+event.target.value);
    };

    const getRangeValue = (value) => {
        switch (value) {
            case 0:
                return "0";
            case 5:
                return "0.1";
            case 10:
                return "0.25";
            case 15:
                return "0.50";
            case 20:
                return "1.0";
            case 25:
                return "5.0";
            case 30:
                return "10.0";
            default:
                return 0
        }
    }

    const getFilterRangeValue = (value) => {
        switch (value) {
            case "0":
                return 0;
            case '0.1':
                return 5;
            case '0.25':
                return 10;
            case '0.50':
                return 15;
            case '1.0':
                return 20;
            case '5.0':
                return 25
            case '10.0':
                return 30;
            default:
                return 0
        }
    }

    useEffect(() => {
    }, [minValue]);


    return (
        <div className={PriceRangeDropdownStyle["price-range-dropdown"]}>
            <div className={PriceRangeDropdownStyle["price-range-dropdown__wrapper"]}>
                <label>

                    Minimum <br/>

                    <select className={PriceRangeDropdownStyle["price-range-dropdown__minimum"]} value={minValue}
                            onChange={handleMinValueChange}>

                        <option value={0}>Min Budget</option>

                        <option value={5}>10 Lacs</option>

                        <option value={10}>25 Lacs</option>

                        <option value={15}>50 Lacs</option>

                        <option value={20}>1 Cr</option>

                        <option value={25}>5 Cr</option>

                        <option value={30}>10 Cr</option>

                    </select>

                </label>

                <label>

                    Maximum <br/>

                    <select className={PriceRangeDropdownStyle["price-range-dropdown__minimum"]} value={maxValue}
                            onChange={handleMaxValueChange}>

                        <option value={30} selected={true}>Max Budget</option>

                        <option value={5}>10 Lacs</option>

                        <option value={10}>25 Lacs</option>

                        <option value={15}>50 Lacs</option>

                        <option value={20}>1 Cr</option>

                        <option value={25}>5 Cr</option>

                        <option value={30}>10 Cr</option>

                    </select>

                </label>
            </div>

            {/*<input*/}
            {/*    className={PriceRangeDropdownStyle["price-range-dropdown__slider"]}*/}
            {/*    type="range"*/}
            {/*    min="1"*/}
            {/*    max="500"*/}
            {/*    value={1}*/}
            {/*    style={{width: '100%'}}*/}
            {/*/>*/}

            <div style={{marginTop: 50}}>

                <AppMultiRangeSlider minVal={minValue} maxVal={maxValue} setMinVal={setMinValue}
                                     setMaxVal={setMaxValue}/>
            </div>
        </div>
    )
}


export default PriceRangeDropdown
