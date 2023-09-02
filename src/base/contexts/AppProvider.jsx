import React, {createContext, useContext, useEffect, useState} from "react";

export const AppContext = createContext(null);

/**
 * @author Lovesh Singh.
 * @since 20-02-2023.
 * @description to handle app feature.
 */
const AppProvider = ({children}) => {
    const TAG = 'AppProvider';
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    const isMobile = width <= 768;

    return (
        <AppContext.Provider value={{isMobile}}>
            {children}
        </AppContext.Provider>
    );
};

/**
 * @author Lovesh Singh.
 * @since 20-02-2023.
 * @description hook to get App Context value.
 * @returns value from App Context
 * @type {{showToast: Function}}
 */
export const useApp = () => useContext(AppContext);

/**
 * @description App context types.
 */
export const AppContextValueType = {
    isMobile: false
};

export default AppProvider;
