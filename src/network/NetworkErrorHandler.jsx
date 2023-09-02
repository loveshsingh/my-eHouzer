import {NetworkStatus} from "./NetworkConnection";
import {messageHandlerToast} from "../helper/Utility";
import {TOAST_MESSAGES} from "../components/adminComponents/constants/Constant";
import {StringConstants} from "../constants/StringConstants";


export const bookingApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const offlineBookingPaymentApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const viewPropertyApiResponseHandler = (type,res)=> {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const topDevelopersApiResponseHandler = (type,res)=> {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const developersApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const topPropertiesApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const developerPropertiesApiResponseHandler = (type,res)=> {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const propertyApiResponseHandler = (type,res)=> {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const filteredPropertiesApiResponseHandler = (type,res)=> {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const developerApiResponseHandler = (type,res)=> {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const getVariantsApiResponseHandler = (type,res)=> {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const getAmenitiesApiResponseHandler = (type,res)=> {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const getPropertyApiResponseHandler = (type,res)=> {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const getMeetingsApiResponseHandler = (type,res)=> {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const getViewedPropertiesApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const getVisitedPropertiesApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const updateMeetingApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const allPropertiesApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}

export const getRmsApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const getAgentsApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const getAgentLeadsApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const getRmCustomersApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const getPropertyVariantsApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const getCustomersApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const addPropertyApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const addPropertyVariantApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const updatePropertyVariantApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const updatePropertyApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const getBuildersApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const deletePropertyApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const deletePropertyVariantApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const deleteDeveloperApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const addRMApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const addAgentApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const addCustomerLeadApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const addBuilderApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const updateBuilderApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const updateAgentApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const updateRmApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const deleteRMApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const deleteAgentApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const updateCustomerStatusApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const updateCustomerProfileApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const updateCustomerRmApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const getBuilderDataApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const getPropertyBookingDataApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const getDevelopersApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const logoutApiResponseHandler = (type,res)=> {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const loginApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const userProfileApiResponseHandler = (type,res)=> {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const updateUserProfileApiResponseHandler = (type,res)=> {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const wishlistServiceApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}

export const getBookingIdApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}
export const propertyBookingApiResponseHandler = (type,res) => {
    let message=''
    if (res.status === NetworkStatus.REQUEST_TIMEOUT) {
        message=StringConstants.InternetConnectionProblemMsg
    }
    else if (res.status === NetworkStatus.NO_DATA_FOUND) {
        message=StringConstants.NodataFoundProblemMsg
    }
    else {
        message=res.message
    }
    messageHandlerToast(type, message);
}