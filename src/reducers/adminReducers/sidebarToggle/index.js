const initialState = {
    toggle: true
};

/**
 * @author Vikrant
 * @since 14-02-2023
 * @description to toggle side bar
 * @param state
 * @param action
 * @return {{toggle: boolean}|{toggle}}
 */
const SidebarToggleReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TOGGLE":
            return {
                ...state,
                toggle: action.payload
            };
        default:
            return state;
    }
}

export default SidebarToggleReducer
