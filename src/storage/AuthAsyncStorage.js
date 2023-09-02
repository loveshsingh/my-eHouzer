import {StorageConstant} from "./StorageConstant";

/**
 * @author Lovesh Singh.
 * @since 31-01-2023.
 * @description to add user credentials.
 */
export const setAuthAsyncStorage = async (userDetails, userId) => {
    await localStorage.setItem(StorageConstant.IS_LOGGED_IN, 'true');
    await localStorage.setItem(StorageConstant.USER_DETAILS, JSON.stringify(userDetails));
}

/**
 * @author Lovesh Singh.
 * @since 31-01-2023.
 * @description to get user credentials.
 */
export const getAuthAsyncStorage = async () => {
    const response = {}
    response.isLoggedIn = localStorage.getItem(StorageConstant.IS_LOGGED_IN)
    response.userDetails = localStorage.getItem(StorageConstant.USER_DETAILS)
    return response
}


/**
 * @author Lovesh Singh.
 * @since 04-02-2023.
 * @description to set shortlisted properties.
 */
export const setShortlistedPropertiesStorage = async (shortlistedProperties) => {
    await localStorage.setItem(StorageConstant.SHORTLISTED_PROPERTIES, JSON.stringify(shortlistedProperties));
}

/**
 * @author Lovesh Singh.
 * @since 04-02-2023.
 * @description to get shortlisted properties.
 */
export const getShortlistedPropertiesStorage = async () => {
    const response = {}
    response.shortlistedProperties = localStorage.getItem(StorageConstant.SHORTLISTED_PROPERTIES)
    return response
}

export const clearAuthAsyncStorage = () => {
    localStorage.removeItem(StorageConstant.USER_DETAILS);
    localStorage.setItem(StorageConstant.IS_LOGGED_IN, 'false');
}

export const clearShortlistedPropertiesStorage = () => {
    localStorage.removeItem(StorageConstant.SHORTLISTED_PROPERTIES);
}
