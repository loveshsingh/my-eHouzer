import moment from 'moment'
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import {TOAST_MESSAGES} from "../components/adminComponents/constants/Constant";
import {RegionApiService} from "../services/RegionApiService";
import CryptoJS from "crypto-js";
import {SECRET_KEY} from "../constants/StringConstants";

export const getFormattedDate = (date, formatType) => {
    return moment(date).format(formatType)
}

export const getFormattedTime = (time) => {
    return moment(time).format('hh:mm A')
}

export const getDateFromTimestamp = (timestamp) => {

    return new Date(Number(timestamp)).toLocaleDateString();
    /*return moment.unix(Number(timestamp)).format("D MMM YYYY");*/
}
export const THIS_YEAR = +(new Date().getFullYear());

export const THIS_MONTH = +(new Date().getMonth()) + 1;

export const THIS_DATE = +(new Date().getDate())

export const WEEK_DAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
]

export const ALL_MONTH = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

export const getStatus = (date = THIS_DATE, month = THIS_MONTH, year = THIS_YEAR, monthStatus) => {
    if (year < THIS_YEAR) return 'disabled'
    if (monthStatus === 'previous') {
        return 'disabled'
    }
    if (monthStatus === 'current') {
        if (year === THIS_YEAR && month < THIS_MONTH) return 'disabled'
        if (year === THIS_YEAR && month === THIS_MONTH && date < THIS_DATE) return 'disabled'
    }
    if (monthStatus === 'next') {
        return 'disabled'
    }
    return 'select'
}

export const zeroPad = (value, length) => {
    return `${value}`.padStart(length, '0');
}

export const getMonthDays = (month = THIS_MONTH, year = THIS_YEAR) => {
    const months30 = [4, 6, 9, 11];
    const leapYear = year % 4 === 0;
    return (month === 2) ? (leapYear ? 29 : 28) : (months30.includes(month) ? 30 : 31);
}
export const getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR) => {
    let d = +(new Date(`${year}-${zeroPad(month, 2)}-01`).getDay());
    return (d === 0 ? 6 : d - 1)
}

export const getPreviousMonth = (month = THIS_MONTH, year = THIS_YEAR) => {
    return (month !== 1) ? [month - 1, year] : [12, year - 1]
}

export const dateRangeInPreviousMonth = (month = THIS_MONTH, year = THIS_YEAR) => {
    const [prevMonth, prevYear] = getPreviousMonth(month, year);
    return [(getMonthDays(prevMonth, prevYear) - getMonthFirstDay(month, year) + 1), getMonthDays(prevMonth, prevYear)];
}

export const getNextMonth = (month = THIS_MONTH, year = THIS_YEAR) => {
    return (month === 12) ? [1, year + 1] : [month + 1, year]
}

export const getDaysofMonthAndYear = (month = THIS_MONTH, year = THIS_YEAR, dd, mm, yy) => {
    const [prevMonth, prevYear] = getPreviousMonth(month, year);
    const [nextMonth, nextYear] = getNextMonth(month, year);

    const totalDays = getMonthDays(month, year);
    const [start, end] = dateRangeInPreviousMonth(month, year);
    const data = new Array(6)
    for (let i = 0; i < 6; i++) data[i] = new Array(7)
    let j = 0
    for (let i = start; i <= end; i++) {
        data[0][j] = {
            date: i,
            month: 'previous',
            class: ['not-current ', getStatus(i, prevMonth, prevYear, 'previous')],
            status: getStatus(i, prevMonth, prevYear, 'previous')
        }
        j++;
    }

    let i = 0
    for (let k = 1; k <= totalDays; k++) {
        data[i][j] = {
            date: k,
            month: 'current',
            class: ((k === dd && month === mm && year === yy) ? ['current', 'active'] : [getStatus(k, month, year, 'current'), ' current']),
            status: getStatus(k, month, year, 'current')
        }
        j++;
        if (j === 7) {
            j = 0
            i++;
        }
    }
    const remainingDays = 42 - (totalDays + end - start + 1);
    for (let k = 1; k <= remainingDays; k++) {
        data[i][j] = {
            date: k,
            month: 'next',
            class: ['not-current ', getStatus(k, nextMonth, nextYear, 'next')],
            status: getStatus(k, nextMonth, nextYear, 'next')
        }
        j++;
        if (j === 7) {
            j = 0
            i++;
        }
    }
    return data;
}


/**
 * @author Lovesh Singh.
 * @since 01-12-2023.
 * @returns {(function(...[*]=): void)|*}
 * @description to get range text from range slider value
 */
export const getBudgetRangeTextFromSliderValue = (value) => {
    switch (value) {
        case '0':
            return "0";
        case '0.1':
            return "10 Lacs";
        case '0.25':
            return "25 Lacs";
        case '0.50':
            return "50 Lacs";
        case '1.0':
            return "1 Cr";
        case '5.0':
            return "5 Cr";
        case '10.0':
            return "10 Cr";
        default:
            return "0"
    }
}

/**
 * @author Vikrant
 * @since 20-03-2023
 * @description to display error/success/warning toast messages
 * @param type
 * @param text
 */
export const messageHandlerToast = (type, text) => {
    if (TOAST_MESSAGES.SUCCESS === type) {
        toast.success(text, toastOptions)
    } else if (TOAST_MESSAGES.ERROR === type) {
        toast.error(text, toastOptions);
    } else if (TOAST_MESSAGES.WARNING === type) {
        toast.warning(text, toastOptions);
    }
}

const toastOptions = {
    closeButton: true,
    hideProgressBar: true, // Hide the progress bar
    autoClose: 2000
};

export const TimeSlotsArray = [
    {
        name: "9:30",
        value: "9:30"
    },
    {
        name: "10:30",
        value: "10:30"
    },
    {
        name: "11:30",
        value: "11:30"
    },
    {
        name: "12:30",
        value: "12:30"
    },
    {
        name: "01:30",
        value: "13:30"
    },
    {
        name: "02:30",
        value: "14:30"
    },
    {
        name: "03:30",
        value: "15:30"
    },
    {
        name: "04:30",
        value: "16:30"
    },
    {
        name: "05:30",
        value: "17:30"
    },
]

export const ResidentialPropertyTypes = [
    {
        name: "All Residential",
        value: "Residential"
    },
    {
        name: "Apartment",
        value: "Apartment"
    },
    {
        name: "Independent House",
        value: "Independent House"
    },
    {
        name: "Independent Floor",
        value: "Independent Floor"
    },
]

export const CommercialPropertyTypes = [
    {
        name: "All Commercial",
        value: "Commercial"
    },
    {
        name: "Shop",
        value: "Shop"
    },
    {
        name: "Office Space",
        value: "Office Space"
    },
    {
        name: "Coworking Space",
        value: "Coworking Space"
    },
    {
        name: "Showroom",
        value: "Showroom"
    },
    {
        name: "Restaurant",
        value: "Restaurant"
    },
]

export const AmentiesList = [
    {
        name: "24*7 Water Supply",
        value: "24*7 Water Supply"
    },
    {
        name: "Lift",
        value: "Lift"
    },
    {
        name: "Power Backup",
        value: "Power Backup"
    },
    {
        name: "Vaastu Compliant",
        value: "Vaastu Compliant"
    },
    {
        name: "CCTV/Video Survelliance",
        value: "CCTV/Video Survelliance"
    },
    {
        name: "Fire Fighting Systems",
        value: "Fire Fighting Systems"
    },
    {
        name: "Security Guard",
        value: "Security Guard"
    },
    {
        name: "Rain Water Harvesting",
        value: "Rain Water Harvesting"
    },
    {
        name: "Sewage Treatment Plant",
        value: "Sewage Treatment Plant"
    },
    {
        name: "24*7 Security",
        value: "24*7 Security"
    }
]

export const ConfigurationList = [
    {
        name: "1BHK",
        value: "1BHK"
    },
    {
        name: "2BHK",
        value: "2BHK"
    },
]

export const StatusList = [
    {
        name: "Pre Launch",
        value: "Pre Launch"
    },
    {
        name: "Ready to move",
        value: "Ready to move"
    },
    {
        name: "Under Construction",
        value: "Under Construction"
    }
]

export const BathroomsList = [
    {
        name: "1",
        value: "1"
    },
    {
        name: "2",
        value: "2"
    },
    {
        name: "3",
        value: "3"
    },
    {
        name: "4",
        value: "4"
    },
    {
        name: "5",
        value: "5"
    }
]

export const AreaList = [
    {
        name: "<500 sq.ft.",
        value: {
            minValue: "0",
            maxValue: "500"
        }
    },
    {
        name: "500-1000 sq.ft.",
        value: {
            minValue: "500",
            maxValue: "1000"
        }
    },
    {
        name: "1000-2000 sq.ft.",
        value: {
            minValue: "1000",
            maxValue: "2000"
        }
    },
    {
        name: "2000+ sq.ft.",
        value: {
            minValue: "2000",
            maxValue: "7000"
        }
    },
]

/**
 * @author Vipul Garg
 * @since 11-05-2023
 * @description utility function to fetch states
 */
export const fetchStates = async () => {
    try {
        const res = await RegionApiService.getStates();
        const statesList = res.data[0];
        return statesList;
    } catch (err) {
        const errorMsg = err.message;
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        throw err;
    } finally {
        console.log("success");
    }
};

/**
 * @author Vipul Garg
 * @since 11-05-2023
 * @description utility function to fetch cities
 */
export const fetchCities = async (stateId) => {
    try {
        const res = await RegionApiService.getCities(stateId);
        const citiesList = res.data[0];
        return citiesList;
    } catch (err) {
        const errorMsg = err.message;
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        throw err;
    } finally {
        console.log("success");
    }
};

/**
 * @author Vipul Garg
 * @since 11-05-2023
 * @description utility function to fetch areas
 */
export const fetchAreas = async (cityId) => {
    try {
        const res = await RegionApiService.getAreas(cityId);
        const areasList = res.data[0];
        return areasList;
    } catch (err) {
        const errorMsg = err.message;
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        throw err;
    } finally {
        console.log("success");
    }
};

/**
 * @author Vikrant.
 * @since 02-06-2023
 * @description to make deep copy of object.
 * @here value can be ARRAY or OBJECT
 * @param value
 * @returns {any}
 */
export const deepCopy = (value) => {
    return JSON.parse(JSON.stringify(value));
}


export const encryptListOfObject = (list) => {
    return list.map((item) => {
        const jsonString = JSON.stringify(item);
        return CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
    });
};

export const decryptListOfObject = (encryptedList) => {
    return encryptedList.map((item) => {
        const bytes = CryptoJS.AES.decrypt(item, SECRET_KEY);
        const decryptedJsonString = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedJsonString);
    });
};