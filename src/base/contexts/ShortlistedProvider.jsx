import React, {createContext, useContext, useEffect} from "react";
import {fetchWishListProperties, setShortlistedProperties, updateWishListProperties} from "../../actions/login";
import {getShortlistedPropertiesStorage, setShortlistedPropertiesStorage} from "../../storage/AuthAsyncStorage";
import {useDispatch, useSelector} from "react-redux";

export const ShortlistedContext = createContext(null)

/**
 * @author Lovesh Singh.
 * @since 17-02-2023.
 * @description to handle app shortlisted feature.
 */
const ShortlistedProvider = ({children}) => {

    const TAG = 'ShortlistedProvider'
    const dispatch = useDispatch();
    const {isLoggedIn, shortlistedProperties, userDetails} = useSelector((state) => state.authReducer);

    useEffect(() => {
        const loadShortlistedProperties = async () => {
            const shortlistedPropertiesStorage = await getShortlistedPropertiesStorage();
            const shortlistedProperties = await JSON.parse(shortlistedPropertiesStorage?.shortlistedProperties)
            if (shortlistedProperties) {
                dispatch(setShortlistedProperties(shortlistedProperties))
            }
        }

        if (isLoggedIn && userDetails.userRoleList[0].name === 'CUSTOMER') {
            dispatch(fetchWishListProperties())
        } else {
            loadShortlistedProperties().then()
        }
    }, []);


    const shortlisted = (property) => {
        if (!shortlistedProperties.some((shortlistedProperty) => shortlistedProperty?.id === property?.id)) {
            if (isLoggedIn) {
                dispatch(updateWishListProperties(property?.id, "POST", [...shortlistedProperties, property]))
            } else {
                setShortlistedPropertiesStorage([...shortlistedProperties, property]).then((res) => {
                    dispatch(setShortlistedProperties([...shortlistedProperties, property]))
                })
            }
        } else {
            if (isLoggedIn) {
                dispatch(updateWishListProperties(property?.id, "DELETE", shortlistedProperties.filter((shortlistedProperty) => shortlistedProperty?.id !== property?.id)))
            } else {
                setShortlistedPropertiesStorage(shortlistedProperties.filter((shortlistedProperty) => shortlistedProperty?.id !== property?.id)).then(() => {
                    dispatch(setShortlistedProperties(shortlistedProperties.filter((shortlistedProperty) => shortlistedProperty?.id !== property?.id)))
                })
            }
        }
    }

    return (
        <ShortlistedContext.Provider value={{shortlisted}}>
            {children}
        </ShortlistedContext.Provider>
    );
}

/**
 * @author Lovesh Singh.
 * @since 17-02-2023.
 * @description hook to get Shortlisted Context value.
 * @returns value from Shortlisted Context
 * @type {function(): null}
 */
export const useShortlisted = () => useContext(ShortlistedContext)

/**
 * @author Lovesh Singh.
 * @since 17-02-2023.
 * @description Shortlisted context types.
 */
export const ShortlistedContextValueType = {
    shortlisted: () => {

    },
}

export default ShortlistedProvider

