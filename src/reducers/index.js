import {combineReducers} from "redux";
import homeReducer from "./home";
import AuthReducer from "./login";
import bookingReducer from "./booking";
import SearchReducer from "./search";
import loadingReducer from "./loading";
import VisitReducer from "./visit";
import SidebarToggleReducer from "./adminReducers/sidebarToggle";
import CustTablePopupDisplayReducer from "./adminReducers/custTablePopup";
import AdminReducer from "./adminReducers";
import PaymentReducer from "./payment";

/**
 * @author Lovesh Singh.
 * @since 22-12-2022.
 * @description to combine multiple reducers.
 */
const AppReducers = combineReducers({
    //TODO fix reducer naming convention
    homeReducer: homeReducer,
    authReducer: AuthReducer,
    /* profileReducer:profileReducer,*/
    bookingReducer: bookingReducer,
    searchReducer: SearchReducer,
    commonLoadingReducer: loadingReducer,
    visitReducer: VisitReducer,
    /*navBarReducer:navBarReducer,*/
    sidebarToggleReducer: SidebarToggleReducer,
    custTablePopReducer: CustTablePopupDisplayReducer,
    adminReducer: AdminReducer,
    paymentReducer:PaymentReducer
})

export default AppReducers
