import React, {createContext, useContext, useEffect, useState} from "react";
import {useSelector} from "react-redux";

export const AuthContext = createContext(null);

/**
 * @author Vikrant.
 * @since 27-04-2023.
 * @description to handle authentications.
 */
const AuthProvider = ({children}) => {
    const TAG = 'AuthProvider';
    const {userDetails} = useSelector((state) => state.adminReducer)

    useEffect(() => {

    }, []);


    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * @author Vikrant.
 * @since 27-04-2023.
 * @description hook to get Auth Context value.
 * @returns value from Auth Context
 */
export const useAuth = () => useContext(AuthContext);

/**
 * @description App context types.
 */
/*export const AppContextValueType = {
    isMobile: false
};*/

export default AuthProvider;
