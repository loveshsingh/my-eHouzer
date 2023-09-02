import {
    ADMIN_DEVELOPERS,
    ADMIN_LEADS,
    ADMIN_LEADS_LOADING,
    ADMIN_LOADING,
    ADMIN_PROPERTY_AMENITIES,
    ADMIN_RM_CUSTOMERS,
    ADMIN_RM_CUSTOMERS_LOADING,
    ADMIN_RM_LIST,
    ADMIN_RM_LIST_LOADING,
    AGENT_LEADS,
    AGENT_LEADS_LOADING,
    AMENITIES,
    BUILDER_DATA,
    BUILDER_LOADING,
    BUTTON_NAME,
    CE_ADMIN_LIST,
    CE_ADMIN_LIST_LOADING,
    CE_AGENT_LIST_LOADING,
    CE_AGENTS_LIST,
    CE_BUILDERS,
    CE_BUILDERS_LOADING,
    CUSTOMER_DATA,
    CUSTOMERS,
    CUSTOMERS_LOADING,
    DISPLAY_FORM,
    DISPLAY_PROPERTY_VARIANT_POPUP,
    OPERATING_CITIES,
    PAYMENT_DATA,
    PAYMENT_LOADING,
    PROPERTY_BOOKING_DATA,
    PROPERTY_BOOKING_LOADING,
    PROPERTY_VARIANTS,
    PROPERTY_VARIANTS_LOADING,
    TOGGLE_FORM,
    USER_DETAILS_FORM
} from "./type";
import {RmApiService} from "../../services/RmApiService";
import {messageHandlerToast} from "../../helper/Utility";
import {TOAST_MESSAGES} from "../../components/adminComponents/constants/Constant";
import {PropertyApiService} from "../../services/PropertyApiService";
import {SET_ADMIN_METADATA} from "../login/types";

export const setCustomerData = (value) => {
    return {
        type: CUSTOMER_DATA,
        payload: value
    }
}

export const toggleForm = (value) => {
    return {
        type: TOGGLE_FORM,
        payload: value
    }
}
export const buttonName = (formType) => ({
    type: 'BUTTON_NAME',
    payload: formType,
});
export const toggleShow = (data) => ({
    type: 'SHO',
    payload: data,
});

export const displayDataForm = (data) => {
    return {
        type: DISPLAY_FORM,
        payload: data,
    }
};

export const setRm = (value) => {
    return {
        type: ADMIN_RM_LIST,
        payload: value
    }
}
export const setLeads = (value) => {
    return {
        type: ADMIN_LEADS,
        payload: value
    }
}
export const setLeadsLoading = (value) => {
    return {
        type: ADMIN_LEADS_LOADING,
        payload: value
    }
}
export const setCEList = (value) => {
    return {
        type: CE_ADMIN_LIST,
        payload: value
    }
}
export const setCEListLoading = (value) => {
    return {
        type: CE_ADMIN_LIST_LOADING,
        payload: value
    }
}

export const setAgents = (value) => {
    return {
        type: CE_AGENTS_LIST,
        payload: value
    }
}

export const setAdminRmCustomer = (value) => {
    return {
        type: ADMIN_RM_CUSTOMERS,
        payload: value
    }
}
export const setAdminRmCustomerLoading = (value) => {
    return {
        type: ADMIN_RM_CUSTOMERS_LOADING,
        payload: value
    }
}

export const setAgentLeads = (value) => {
    return {
        type: AGENT_LEADS,
        payload: value
    }
}
export const setAgentLeadsLoading = (value) => {
    return {
        type: AGENT_LEADS_LOADING,
        payload: value
    }
}

export const setCustomers = (value) => {
    return {
        type: CUSTOMERS,
        payload: value
    }
}
export const setCustomersLoading = (value) => {
    return {
        type: CUSTOMERS_LOADING,
        payload: value
    }
}

export const setBuilders = (value) => {
    return {
        type: CE_BUILDERS,
        payload: value
    }
}
export const setBuildersListLoading = (value) => {
    return {
        type: CE_BUILDERS_LOADING,
        payload: value
    }
}

export const setDevelopers = (value) => {
    return {
        type: ADMIN_DEVELOPERS,
        payload: value
    }
}
export const setBuilderPropertyData = (value) => {
    return {
        type: BUILDER_DATA,
        payload: value
    }
}
export const setBuilderPropertyLoading = (value) => {
    return {
        type: BUILDER_LOADING,
        payload: value
    }
}

export const setPropertyVariants = (value) => {
    return {
        type: PROPERTY_VARIANTS,
        payload: value
    }
}
export const setPropertyVariantsLoading = (value) => {
    return {
        type: PROPERTY_VARIANTS_LOADING,
        payload: value
    }
}

export const setPropertyBookingData = (value) => {
    return {
        type: PROPERTY_BOOKING_DATA,
        payload: value
    }
}
export const setPropertyBookingLoading = (value) => {
    return {
        type: PROPERTY_BOOKING_LOADING,
        payload: value
    }
}

export const displayPropertyVariantTablePopupAction = (value) => {
    return {
        type: DISPLAY_PROPERTY_VARIANT_POPUP,
        payload: value
    }
}

export const setAmenities = (value) => {
    return {
        type: AMENITIES,
        payload: value
    }
}
export const setOperatingCities = (value) => {
    return {
        type: OPERATING_CITIES,
        payload: value
    }
}
export const setUserDetails = (value) => {
    return {
        type: USER_DETAILS_FORM,
        payload: value
    }
}
export const setAdminPropertyAmenities = (value) => {
    return {
        type: ADMIN_PROPERTY_AMENITIES,
        payload: value
    }
}

const adminLoading = (value) => {
    return {
        type: ADMIN_LOADING,
        payload: value
    }
}
const rmListLoading = (value) => {
    return {
        type: ADMIN_RM_LIST_LOADING,
        payload: value
    }
}
const agentsListLoading = (value) => {
    return {
        type: CE_AGENT_LIST_LOADING,
        payload: value
    }
}
export const setPaymentData = (value) => {
    return {
        type: PAYMENT_DATA,
        payload: value
    }
}
export const setPaymentLoading = (value) => {
    return {
        type: PAYMENT_LOADING,
        payload: value
    }
}
export const setAdminMetadata = (value) => {
    return {
        type: SET_ADMIN_METADATA,
        payload: value
    }
}

export const fetchRms = (data = {page: 1, perPage: 10}) => async (dispatch) => {
    await dispatch(rmListLoading(true))
    await RmApiService.getRms(data).then(async (res) => {
        const rmList = res.data[0]
        const metadata = res?.metaData
        console.log('Metadata values', metadata)
        dispatch(setRm({data: rmList, metaData: metadata}))
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(rmListLoading(false))
    })
}

export const fetchAgents = (data = {page: 1, perPage: 10}) => async (dispatch) => {
    await dispatch(agentsListLoading(true))
    await RmApiService.getAgents(data).then(async (res) => {
        const agents = res.data[0]
        const metaData = res.metaData
        dispatch(setAgents({data: agents, metaData: metaData}))
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(agentsListLoading(false))
    })
}

export const fetchRmCustomer = (data = {rmId, page: 1, perPage: 10}) => async (dispatch) => {
    await dispatch(setAdminRmCustomerLoading(true))
    await RmApiService.getRmCustomers(data).then(async (res) => {
        const rmCustomers = res.data[0]
        const metaData = res.metaData
        dispatch(setAdminRmCustomer({data: rmCustomers, metaData: metaData}))
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(setAdminRmCustomerLoading(false))
    })
}

export const fetchPropertyVariants = (data = {propertyId: propertyId, page: 1, perPage: 10}) => async (dispatch) => {
    await dispatch(setPropertyVariantsLoading(true))
    await RmApiService.getPropertyVariants(data).then(async (res) => {
        const propertyVariants = res.data[0]
        const metaData = res.metaData
        dispatch(setPropertyVariants({data: propertyVariants, metaData: metaData}))
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(setPropertyVariantsLoading(false))
    })
}

export const fetchAgentLeads = (data = {agentId, page: 1, perPage: 10}) => async (dispatch) => {
    await dispatch(setAgentLeadsLoading(true))
    await RmApiService.getAgentLeads(data).then(async (res) => {
        const agentLeads = res.data[0]
        const metaData = res.metaData
        dispatch(setAgentLeads({data: agentLeads, metaData: metaData}))
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(setAgentLeadsLoading(false))
    })
}

export const fetchBuilders = (data = {page: 1, perPage: 10}) => async (dispatch) => {
    await dispatch(setBuildersListLoading(true))
    await RmApiService.getBuilders(data).then(async (res) => {
        const builders = res.data[0]
        const metaData = res.metaData
        dispatch(setBuilders({data: builders, metaData: metaData}))
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(setBuildersListLoading(false))
    })
}

export const fetchBuilderData = (data = {developerId: developerId, page: 1, perPage: 10}) => async (dispatch) => {
    await dispatch(setBuilderPropertyLoading(true))
    await RmApiService.getBuilderData(data).then(async (res) => {
        const builderProperties = res.data[0]
        const metaData = res.metaData
        dispatch(setBuilderPropertyData({data: builderProperties, metaData: metaData}))
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(setBuilderPropertyLoading(false))
    })
}

export const fetchPropertyBookingData = (data = {propertyId: propertyId, page: 1, perPage: 10}) => async (dispatch) => {
    await dispatch(setPropertyBookingLoading(true))
    await RmApiService.getPropertyBookingData(data).then(async (res) => {
        const propertyBookings = res.data[0]
        const metaData = res.metaData
        dispatch(setPropertyBookingData({data: propertyBookings, metaData: metaData}))
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(setPropertyBookingLoading(false))
    })
}

export const fetchCustomers = (data = {page: 1, perPage: 10}) => async (dispatch) => {
    await dispatch(setCustomersLoading(true))
    await RmApiService.getCustomers(data).then(async (res) => {
        const customers = res.data[0]
        const metaData = res.metaData
        dispatch(setCustomers({data: customers, metaData: metaData}))
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(setCustomersLoading(false))
    })
}


export const deleteProperty = (propertyName, developerId, onSuccess) => async (dispatch) => {
    //  await dispatch(loading(true))
    await RmApiService.deleteProperty(propertyName, developerId).then(async (res) => {
        messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        onSuccess(true)
        await dispatch(fetchBuilders())
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        //    dispatch(loading(false))
    })
}

export const deleteDeveloper = (developerId, onSuccess) => async (dispatch) => {
    //  await dispatch(loading(true))
    await RmApiService.deleteDeveloper(developerId).then(async (res) => {
        messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        onSuccess(true)
        await dispatch(fetchBuilders())
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        //    dispatch(loading(false))
    })
}

export const addRM = (rmFormData, onSuccess) => async (dispatch) => {
    //  await dispatch(loading(true))
    await RmApiService.addRM(rmFormData).then(async (res) => {
        messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        await dispatch(fetchRms())
        onSuccess(true);
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        //    dispatch(loading(false))
    })
}

export const addCustomerLead = (customerLeadData, onSuccess) => async (dispatch) => {
    //  await dispatch(loading(true))
    await RmApiService.addCustomerLead(customerLeadData).then(async (res) => {
        messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        onSuccess(true);

    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        //    dispatch(loading(false))
    })
}
export const addAgent = (agentFormData, onSuccess) => async (dispatch) => {
    //  await dispatch(loading(true))
    await RmApiService.addAgent(agentFormData).then(async (res) => {
        messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        onSuccess(true);
        await dispatch(fetchAgents())
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        //    dispatch(loading(false))
    })
}
export const addBuilder = (formData, onSuccess) => async (dispatch) => {
    //  await dispatch(loading(true))
    await RmApiService.addBuilder(formData).then(async (res) => {
        messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        onSuccess(true);
        await dispatch(fetchBuilders())
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        //    dispatch(loading(false))
    })
}

export const addPropertyVariant = (formData, onSuccess) => async (dispatch) => {
    await dispatch(adminLoading(true))
    await RmApiService.addPropertyVariant(formData).then(async (res) => {
        messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        await dispatch(fetchPropertyVariants({propertyId: formData.get('propertyId'), page: 1, perPage: 10}));
        onSuccess(true);
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(adminLoading(false))
    })
}

export const updatePropertyVariant = (formData, onSuccess) => async (dispatch) => {
    await dispatch(adminLoading(true))
    await RmApiService.updatePropertyVariant(formData).then(async (res) => {
        messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        onSuccess(true);
        await dispatch(fetchPropertyVariants({propertyId: formData.get('propertyId'), page: 1, perPage: 10}));

    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(adminLoading(false))
    })
}

export const updateBuilder = (formData, onSuccess) => async (dispatch) => {
    //  await dispatch(loading(true))
    await RmApiService.updateBuilder(formData).then(async (res) => {
        messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        await dispatch(fetchBuilders())
        onSuccess(true);
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        //    dispatch(loading(false))
    })
}

export const updateAgent = (agentFormData, onSuccess) => async (dispatch) => {
    //  await dispatch(loading(true))
    await RmApiService.updateAgent(agentFormData).then(async (res) => {
        messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        await dispatch(fetchAgents())
        onSuccess(true);
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        //    dispatch(loading(false))
    })
}

export const updateRm = (rmFormData, onSuccess) => async (dispatch) => {
    //  await dispatch(loading(true))
    await RmApiService.updateRm(rmFormData).then(async (res) => {
        messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        onSuccess(true);
        await dispatch(fetchRms())
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        //    dispatch(loading(false))
    })
}
export const updateRMCustomerRemarks = (rmFormData, rmId, onSuccess) => async (dispatch) => {
    //  await dispatch(loading(true))
    await RmApiService.updateRMCustomerRemarks(rmFormData).then(async (res) => {
        messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        onSuccess(true);
        await dispatch(fetchRmCustomer({rmId: rmId}))
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        //    dispatch(loading(false))
    })
}
export const addProperty = (propertyDetails, formData, onSuccess) => async (dispatch) => {
    //  await dispatch(loading(true))
    await RmApiService.addProperty(formData).then(async (res) => {
        messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        onSuccess(true);
        await dispatch(fetchBuilders())
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        //    dispatch(loading(false))
    })
}

export const updateProperty = (propertyDetails, formData, onSuccess) => async (dispatch) => {
    //  await dispatch(loading(true))
    await RmApiService.updateProperty(propertyDetails, formData).then(async (res) => {
        messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        onSuccess(true);
        await dispatch(fetchBuilders())
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        //    dispatch(loading(false))
    })
}

export const deleteRM = (rmId, onSuccess) => async (dispatch) => {
    //  await dispatch(loading(true))
    await RmApiService.deleteRM(rmId).then(async (res) => {
        messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        onSuccess(true)
        await dispatch(fetchRms())
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        //    dispatch(loading(false))
    })
}

export const deletePropertyVariant = (variantId, propertyId, onSuccess) => async (dispatch) => {
    //  await dispatch(loading(true))
    await RmApiService.deletePropertyVariant(variantId).then(async (res) => {
        messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        onSuccess(true)
        await dispatch(fetchPropertyVariants({propertyId: propertyId, page: 1, perPage: 10}));
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        //    dispatch(loading(false))
    })
}

export const deleteAgent = (userId, onSuccess) => async (dispatch) => {
    //  await dispatch(loading(true))
    await RmApiService.deleteAgent(userId).then(async (res) => {
        messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        onSuccess(true);
        await dispatch(fetchAgents())
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        //    dispatch(loading(false))
    })
}

export const updateCustomerStatus = (details) => async (dispatch) => {
    //  await dispatch(loading(true))
    await RmApiService.updateCustomerStatus(details).then(async (res) => {
        messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        //await fetchBuilders(dispatch)
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        //    dispatch(loading(false))
    })
}
export const updatePaymentStatus = (details, onSuccess) => async (dispatch) => {
    //  await dispatch(loading(true))
    await RmApiService.updatePaymentStatus(details).then(async (res) => {
        messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        onSuccess(true);
        //await fetchBuilders(dispatch)
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        //    dispatch(loading(false))
    })
}

export const updateCustomerProfile = (details, onSuccess) => async (dispatch) => {
    //  await dispatch(loading(true))
    await RmApiService.updateCustomerProfile(details).then(async (res) => {
        messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        await dispatch(fetchCustomers())
        onSuccess(true);
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        //    dispatch(loading(false))
    })
}

export const updateCustomerRm = (details) => async (dispatch) => {
    //  await dispatch(loading(true))
    await RmApiService.updateCustomerRm(details).then(async (res) => {
        messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        await dispatch(fetchCustomers());
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        //    dispatch(loading(false))
    })
}

export const getDevelopers = () => async (dispatch) => {
    //  await dispatch(loading(true))
    await RmApiService.getDevelopers().then(async (res) => {
        const developers = res.data[0]
        dispatch(setDevelopers(developers))
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        console.log('error', errorMsg)
        // dispatch(error(errorMsg))
    }).finally(() => {
        //    dispatch(loading(false))
    })
}

export const fetchAmenities = async (dispatch) => {
    //  await dispatch(loading(true))
    await RmApiService.getAmenities().then(async (res) => {
        const amenities = res.data[0]
        dispatch(setAmenities(amenities))
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        //    dispatch(loading(false))
    })
}
export const fetchOperatingCities = () => async (dispatch) => {
    // await dispatch(loading(true))
    await PropertyApiService.allCities().then(async (res) => {
        const cities = res.data[0]
        dispatch(setOperatingCities(cities))
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        // dispatch(loading(false))
    })
}
export const fetchAdminPropertyAmenities = (propertyId, onSuccess) => async (dispatch) => {
    //  await dispatch(loading(true))
    await PropertyApiService.getPropertyAmenities(propertyId).then(async (res) => {
        const amenities = res.data[0]
        dispatch(setAdminPropertyAmenities(amenities))
        onSuccess(amenities)
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        //    dispatch(loading(false))
    })
}

export const loadCEScreenData = () => async (dispatch) => {
    // await dispatch(loading(true))
    await FetchInitialDataForCE(dispatch).then().catch((err) => {

    }).finally(() => {
            //   dispatch(loading(false))
        }
    )
}

/**
 * @author Vipul Garg
 * @since 02-05-2023
 * @description to fetch leads
 */
export const fetchLeads = (data = {page: 1, perPage: 10}) => async (dispatch) => {
    await dispatch(setLeadsLoading(true))
    await RmApiService.getLeads(data).then(async (res) => {
        const leads = res.data[0]
        const metaData = res.metaData
        dispatch(setLeads({data: leads, metaData: metaData}))
    }).catch((err) => {
        const errorMsg = err.message
        // messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(setLeadsLoading(false))
    })
}
/**
 * @author Vipul Garg
 * @since 02-05-2023
 * @description to fetch CE List
 */

export const fetchCEList = (data = {page: 1, perPage: 10}) => async (dispatch) => {
    await dispatch(setCEListLoading(true))
    await RmApiService.getCEList(data).then(async (res) => {
        const ceList = res.data[0]
        const metaData = res.metaData
        dispatch(setCEList({data: ceList, metaData: metaData}))
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(setCEListLoading(false))
    })
}
/**
 * @author Vipul Garg
 * @since 02-05-2023
 * @description to add CE to the List
 */
export const addCE = (ceFormData, onSuccess) => async (dispatch) => {
    //  await dispatch(loading(true))
    await RmApiService.addCE(ceFormData).then(async (res) => {
        messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        await dispatch(fetchCEList());
        onSuccess(true);
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        //    dispatch(loading(false))
    })
}
/**
 * @author Vipul Garg
 * @since 03-05-2023
 * @description to update CE
 */
export const updateCE = (ceFormData, onSuccess) => async (dispatch) => {
    //  await dispatch(loading(true))
    await RmApiService.updateCE(ceFormData).then(async (res) => {
        messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        onSuccess(true);
        await dispatch(fetchCEList())
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        //    dispatch(loading(false))
    })
}
/**
 * @author Vipul Garg
 * @since 03-05-2023
 * @description to delete CE
 */
export const deleteCE = (ceId, onSuccess) => async (dispatch) => {
    //  await dispatch(loading(true))
    await RmApiService.deleteCE(ceId).then(async (res) => {
        messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        onSuccess(true)
        await dispatch(fetchCEList())
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        //    dispatch(loading(false))
    })
}
/**
 * @author Vipul Garg
 * @since 03-05-2023
 * @description to update lead status
 */
export const updateLeadStatus = (details) => async (dispatch) => {
    //  await dispatch(loading(true))
    await RmApiService.updateLeadStatus(details).then(async (res) => {
        messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        //await fetchBuilders(dispatch)
        await dispatch(fetchLeads())
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        //    dispatch(loading(false))
    })
}
/**
 * @author Vipul Garg
 * @since 04-05-2023
 * @description to add Property Booking
 */
export const addPropertyBooking = (propertyBookingFormData, onSuccess) => async (dispatch) => {
    //  await dispatch(loading(true))
    await RmApiService.propertyBooking(propertyBookingFormData).then(async (res) => {
        messageHandlerToast(TOAST_MESSAGES.SUCCESS, res.message);
        await dispatch(fetchRmCustomer({rmId:propertyBookingFormData.rmId,perPage: 10,page:1 }))
        onSuccess(true);
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        //    dispatch(loading(false))
    })
}
/**
 * @author Vipul Garg
 * @since 15-05-2023
 * @description to fetch payment data
 */
export const fetchPaymentData = (data) => async (dispatch) => {
    await dispatch(setPaymentLoading(true))
    await RmApiService.getPaymentData(data).then(async (res) => {
        const paymentData = res.data[0]
        dispatch(setPaymentData(paymentData))
    }).catch((err) => {
        const errorMsg = err.message
        messageHandlerToast(TOAST_MESSAGES.ERROR, errorMsg);
        // dispatch(error(errorMsg))
    }).finally(() => {
        dispatch(setPaymentLoading(false))
    })
}

const FetchInitialDataForCE = async (dispatch) => {
    const promises = []
    promises.push(dispatch(fetchRms()));
    promises.push(dispatch(fetchAgents()));
    promises.push(dispatch(fetchCustomers()));
    promises.push(dispatch(fetchBuilders()));
    promises.push(getDevelopers(dispatch));
    promises.push(fetchAmenities(dispatch));
    promises.push(dispatch(fetchLeads()));
    promises.push(dispatch(fetchOperatingCities()));
    return Promise.all(promises)
}
