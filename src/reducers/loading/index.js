import {SET_YATIN} from "../../actions/loading/type";

const initialState = {
    loadingCount: 0
}

const loadingReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_YATIN :
            const loaderCount = action.payload ? +state.loadingCount + 1 : +state.loadingCount - 1
            return {
                ...state,
                loadingCount: loaderCount
            }
        default:
            return state
    }
}

export default loadingReducer

