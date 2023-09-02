import React, {createContext, useContext, useRef} from "react";
import {toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import {TOAST_MESSAGES} from "../../components/adminComponents/constants/Constant";

//Note:  Class based component can't be able to use hook to access Context value for that we have to export this context
export const MessageContext = createContext(null)

/**
 * @author Vikrant
 * @since 20-03-2023
 * @description to handle toast messages
 * @param children
 * @return {JSX.Element}
 * @constructor
 */
const MessageProvider = ({children}) => {
    const TAG = 'MessageProvider'
    const alertRef = useRef();

    const showToast = (type, text) => {
        if (type === TOAST_MESSAGES.SUCCESS) {
            toast.success(text,toastOptions);
        } else if (type === TOAST_MESSAGES.ERROR) {
            toast.error(text,toastOptions);
        }

    }


    return (
        <MessageContext.Provider value={{showToast}}>
            {children}
            <ToastContainer/>
        </MessageContext.Provider>
    );
}


const toastOptions = {
    closeButton: true,
    hideProgressBar: true, // Hide the progress bar
    autoClose:2000
};

export const useMessage = () => useContext(MessageContext)

export default MessageProvider;

/**
 * @author Vikrant.
 * @since 20-03-2023.
 * @description Message context types.
 */
export const MessageContextValueType = {
    showToast: () => {

    },
}

