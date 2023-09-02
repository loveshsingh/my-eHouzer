import {fetchDataFromAPI} from "../network/NetworkConnection";
import {NetworkConfiguration} from "../network/NetworkConfiguration";
import {bookingApiResponseHandler, wishlistServiceApiResponseHandler} from "../network/NetworkErrorHandler";
import {TOAST_MESSAGES} from "../components/adminComponents/constants/Constant";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
// const API_URL = "http://localhost:8081/api/";

const wishlistService = (condition, method) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.WISHLIST_API + "?" + condition, method.toUpperCase(), {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
                //wishlistServiceApiResponseHandler(TOAST_MESSAGES.SUCCESS,res)
            })
            .catch((err) => {
                // logoutAPIErrorHandler(err)
                reject(err)
                //wishlistServiceApiResponseHandler(TOAST_MESSAGES.ERROR,err)
            })
    })
}

export const WishListApiService = {
    wishlistService
};
