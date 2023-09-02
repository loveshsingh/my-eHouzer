const initialState = {
    displayPopup: false
};

/**
 * @author Vikrant
 * @since 17-02-2023
 * @description to display show/hide popup table
 * @param state
 * @param action
 * @return {{display: boolean}|{display}}
 */
const CustTablePopupDisplayReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW_TABLE":
            return {
                ...state,
                displayPopup: action.payload
            };
        default:
            return state;
    }
}

export default CustTablePopupDisplayReducer
