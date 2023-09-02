import {fetchDataFromAPI} from "../network/NetworkConnection";
import {NetworkConfiguration} from "../network/NetworkConfiguration";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
/**
 * @author Vipul Garg
 * @since 11-05-2023
 * @description api request to get the states of a country
 */
const getStates = () => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.STATE, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res);
                } else {
                    reject(res);
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
};
/**
 * @author Vipul Garg
 * @since 11-05-2023
 * @description api request to get the cities of a particular state
 */
const getCities = (stateId) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL +NetworkConfiguration.CITY + "?stateId=" + stateId, "GET", {})
            .then(async (res) => {
                console.log("getCities response: ", res);
                if (res.code === 200) {
                    resolve(res);
                } else {
                    reject(res);
                }
            })
            .catch((err) => {
                console.log("getCities error: ", err);
                reject(err);
            });
    });
};
/**
 * @author Vipul Garg
 * @since 11-05-2023
 * @description api request to get the areas of a particular city
 */
const getAreas = (cityId) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL +NetworkConfiguration.AREA + "?cityId=" + cityId, "GET", {})
            .then(async (res) => {
                console.log("getAreas response: ", res);
                if (res.code === 200) {
                    resolve(res);
                } else {
                    reject(res);
                }
            })
            .catch((err) => {
                console.log("getAreas error: ", err);
                reject(err);
            });
    });
};
export const RegionApiService = {
    getStates,
    getCities,
    getAreas,
};