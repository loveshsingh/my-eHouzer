import {fetchDataFromAPI} from "../network/NetworkConnection";
import {NetworkConfiguration} from "../network/NetworkConfiguration";
import {updateUserProfileApiResponseHandler} from "../network/NetworkErrorHandler";
import {TOAST_MESSAGES} from "../components/adminComponents/constants/Constant";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
// const API_URL = "http://localhost:8081/api/";
const logout = () => {

    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.LOGOUT_API, "POST", {}, {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                // logoutAPIErrorHandler(err)
                reject(err)
            })
    })
}

export const login = (data) => {

    //TODO Have to change api url after backend
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.LOGIN_API, "POST", {}, data)
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                console.log("reject..")
                // loginAPIErrorHandler(err)
                reject(err)
            })
    })
}

export const userProfile = (condition) => {

    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.USER_PROFILE_API + "?" + condition, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                // loginAPIErrorHandler(err)
                reject(err)
            })
    })
}

export const updateUserProfile = (updateData) => {

    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.USER_API, "PUT", {}, updateData)
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
                updateUserProfileApiResponseHandler(TOAST_MESSAGES.SUCCESS, res)
            })
            .catch((err) => {
                // loginAPIErrorHandler(err)
                reject(err)
                updateUserProfileApiResponseHandler(TOAST_MESSAGES.ERROR, err)
            })
    })
}

/*Start Email Login/Register*/
export const emailSignupLogin = (data) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.EMAIL_LOGIN_SIGNUP, "POST", {}, data)
            .then(async (res) => {
                if (res.code < 300) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                console.log("reject..")
                // loginAPIErrorHandler(err)
                reject(err)
            })
    })
}
export const emailSignup = (data) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.EMAIL_SIGNUP, "POST", {}, data)
            .then(async (res) => {
                if (res.code < 300) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                console.log("reject..")
                // loginAPIErrorHandler(err)
                reject(err)
            })
    })
}
export const verifyEmailSignup = (data) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.VERIFY_EMAIL_SIGNUP, "POST", {}, data)
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                console.log("reject..")
                // loginAPIErrorHandler(err)
                reject(err)
            })
    })
}

export const verifyEmailLogin = (data) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.VERIFY_EMAIL_LOGIN, "POST", {}, data)
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                console.log("reject..")
                // loginAPIErrorHandler(err)
                reject(err)
            })
    })
}

/*End Email Login/Register*/


/*Start Mobile Login/Register*/
export const mobileSignupLogin = (data) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.MOBILE_LOGIN_SIGNUP, "POST", {}, data)
            .then(async (res) => {
                if (res.code < 300) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                console.log("reject..")
                // loginAPIErrorHandler(err)
                reject(err)
            })
    })
}
export const mobileSignup = (data) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.MOBILE_SIGNUP, "POST", {}, data)
            .then(async (res) => {
                if (res.code < 300) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                console.log("reject..")
                // loginAPIErrorHandler(err)
                reject(err)
            })
    })
}
export const verifyMobileSignup = (data) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.VERIFY_MOBILE_SIGNUP, "POST", {}, data)
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                console.log("reject..")
                // loginAPIErrorHandler(err)
                reject(err)
            })
    })
}

export const verifyMobileLogin = (data) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.VERIFY_MOBILE_LOGIN, "POST", {}, data)
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                console.log("reject..")
                // loginAPIErrorHandler(err)
                reject(err)
            })
    })
}

/*End Mobile Login/Register*/


export const contact = (data) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.CONTACT, "POST", {}, JSON.stringify(data))
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                console.log("reject..")
                // loginAPIErrorHandler(err)
                reject(err)
            })
    })
}
export const career = (data) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.CAREER, "POST", {}, data)
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                console.log("reject..")
                // loginAPIErrorHandler(err)
                reject(err)
            })
    })
}
export const viewedPropertiesCount = () => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.VIEWED_PROPERTIES_COUNT, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                console.log("reject..")
                // loginAPIErrorHandler(err)
                reject(err)
            })
    })
}

export const UserApiService = {
    login, userProfile, updateUserProfile, logout,
    emailSignupLogin, emailSignup, verifyEmailSignup, verifyEmailLogin,
    mobileSignupLogin, mobileSignup, verifyMobileSignup, verifyMobileLogin,
    contact, career,viewedPropertiesCount
};
