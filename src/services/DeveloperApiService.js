import {fetchDataFromAPI} from "../network/NetworkConnection";
import {NetworkConfiguration} from "../network/NetworkConfiguration";
import {TOAST_MESSAGES} from "../components/adminComponents/constants/Constant";
import {developersApiResponseHandler, topDevelopersApiResponseHandler} from "../network/NetworkErrorHandler";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
//const API_URL = "http://localhost:8081/api/";

const topDevelopers = () => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.TOP_DEVELOPER_API, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
                //topDevelopersApiResponseHandler(TOAST_MESSAGES.SUCCESS,res)
            })
            .catch((err) => {
                // logoutAPIErrorHandler(err)
                reject(err)
                //topDevelopersApiResponseHandler(TOAST_MESSAGES.ERROR,err)
            })
    })
}

const developers = () => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.DEVELOPERS_API, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
               // developersApiResponseHandler(TOAST_MESSAGES.SUCCESS,res)
            })
            .catch((err) => {
                // logoutAPIErrorHandler(err)
                reject(err)
                //developersApiResponseHandler(TOAST_MESSAGES.ERROR,err)
            })
    })
}

export const DeveloperApiService = {
    topDevelopers, developers
};
