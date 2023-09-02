import {fetchDataFromAPI} from "../network/NetworkConnection";
import {NetworkConfiguration} from "../network/NetworkConfiguration";
import {propertyBookingApiResponseHandler} from "../network/NetworkErrorHandler";
import {TOAST_MESSAGES} from "../components/adminComponents/constants/Constant";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
// const API_URL = "http://localhost:8081/api/";

const getRms = (data) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.RMS_API + '?page=' + data?.page + '&perPage=' + data?.perPage, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                console.log("RMS error: ", err)
                reject(err)
            })
    })
}

const getAgents = (data) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.AGENTS_API + '?page=' + data?.page + '&perPage=' + data?.perPage, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const getAgentLeads = (data) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.LEAD_API + "?agentId=" + data.agentId + '&page=' + data?.page + '&perPage=' + data?.perPage, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const getRmCustomers = (data) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.RM_Customer_API + "?rmId=" + data.rmId + '&page=' + data.page + '&perPage=' + data.perPage, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const getPropertyVariants = (data) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.PROPERTY_VARIANT_API + "?propertyId=" + data.propertyId + '&page=' + data?.page + '&perPage=' + data?.perPage, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const getCustomers = (data) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.Customers_API + '?page=' + data?.page + '&perPage=' + data?.perPage, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}


const addProperty = (formData) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.PROPERTY, "POST", {}, formData)
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const addPropertyVariant = (formData) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.PROPERTY_VARIANT_API, "POST", {}, formData)
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const updatePropertyVariant = (formData) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.PROPERTY_VARIANT_API, "PUT", {}, formData)
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}


const updateProperty = (propertyData, formData) => {

    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.PROPERTY, "PUT", {}, formData)
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const getBuilders = (data) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.BUILDERS_API + '?page=' + data?.page + '&perPage=' + data?.perPage, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const deleteProperty = (propertyName, developerId) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.DELETE_PROPERTY + "?propertyName=" + propertyName + "&developerId=" + developerId, "DELETE", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const deletePropertyVariant = (variantId) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.PROPERTY_VARIANT_API + "?variantId=" + variantId, "DELETE", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const deleteDeveloper = (developerId) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.DEVELOPER_API + "?developerId=" + developerId, "DELETE", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}
const addRM = (rmData) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.ADD_PROFILE_API, "POST", {}, JSON.stringify(rmData))
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}
const addAgent = (agentData) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.AGENT_API, "POST", {}, JSON.stringify(agentData))
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const addCustomerLead = (customerLeadDetails) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.LEAD_API, "POST", {}, JSON.stringify(customerLeadDetails))
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const addBuilder = (formData) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.DEVELOPER_API, "POST", {}, formData)
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const updateBuilder = (formData) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.DEVELOPER_API, "PUT", {}, formData)
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const updateAgent = (agentFormData) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.AGENT_API, "PUT", {}, JSON.stringify(agentFormData))
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const updateRm = (rmFormData) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.RM_API, "PUT", {}, JSON.stringify(rmFormData))
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}
const updateRMCustomerRemarks = (customerFormData) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.USER_REMARKS, "PUT", {}, JSON.stringify(customerFormData))
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const deleteRM = (rmId) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.RM_API + "?rmId=" + rmId, "DELETE", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const deleteAgent = (userId) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.AGENT_API + "?userId=" + userId, "DELETE", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const updateCustomerStatus = (details) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.CUSTOMER_STATUS_API, "PUT", {}, JSON.stringify(details))
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}
const updatePaymentStatus = (details) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.PAYMENT_STATUS_API, "PUT", {}, JSON.stringify(details))
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const updateCustomerProfile = (details) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.UPDATE_PROFILE_API, "PUT", {}, JSON.stringify(details))
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const updateCustomerRm = (details) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.ASSIGN_RM_API, "PUT", {}, JSON.stringify(details))
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const getBuilderData = (data) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.BUILDER_STATS_API + "?developerId=" + data.developerId + "&page=" + data.page + "&perPage=" + data.perPage, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const getPropertyBookingData = (data) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.PROPERTY_BOOKING_STAT_API + "?propertyId=" + data.propertyId + "&page=" + data.page + "&perPage=" + data.perPage, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const getDevelopers = () => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.DEVELOPERS_API, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const getAmenities = () => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.AMENITIES_API, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const sendImage = (file) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.UPLOAD, "POST", {}, file)
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}
/**
 * @author Vipul Garg
 * @since 02-05-2023
 * @description api request to get leads
 */
const getLeads = (data) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.LEADS_API + '?page=' + data?.page + '&perPage=' + data?.perPage, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                console.log("Leads error: ", err)
                reject(err)
            })
    })
}
/**
 * @author Vipul Garg
 * @since 02-05-2023
 * @description api request to get CE list
 */
const getCEList = (data) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.CE_API + '?page=' + data.page + '&perPage=' + data.perPage, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                console.log("CE List error: ", err)
                reject(err)
            })
    })
}
/**
 * @author Vipul Garg
 * @since 02-05-2023
 * @description api request to post CE Data
 */
const addCE = (ceData) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.ADD_PROFILE_API, "POST", {}, JSON.stringify(ceData))
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}
/**
 * @author Vipul Garg
 * @since 02-05-2023
 * @description api request update CE
 */
const updateCE = (ceFormData) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.CE_API, "PUT", {}, JSON.stringify(ceFormData))
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}


/**
 * @author Vipul Garg
 * @since 02-05-2023
 * @description api request to delete selected CE
 */
const deleteCE = (ceId) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.CE_API + "?userId=" + ceId, "DELETE", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}
/**
 * @author Vipul Garg
 * @since 03-05-2023
 * @description api request to update lead status
 */
const updateLeadStatus = (details) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.LEAD_API, "PUT", {}, JSON.stringify(details))
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}
/**
 * @author Vipul Garg
 * @since 03-05-2023
 * @description api request to book a property
 */
const propertyBooking = (propertyBookingData) => {
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.OFFLINE_BOOKING, "POST", {}, propertyBookingData)
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
                propertyBookingApiResponseHandler(TOAST_MESSAGES.SUCCESS, res)
            })
            .catch((err) => {
                reject(err)
                propertyBookingApiResponseHandler(TOAST_MESSAGES.ERROR, err)
            })
    })
}
/**
 * @author Vipul Garg
 * @since 15-05-2023
 * @description api request to get payment data
 */
const getPaymentData = (data) => {
    let queryParam = '?';
    if (data?.developerId) {
        queryParam += "developerId=" + data.developerId + "&";
    }
    if (data?.status) {
        queryParam += "status=" + data.status + "&"
    }
    if (data?.key) {
        queryParam += "key=" + data.key + "&"
    }
    if (data?.perPage) {
        queryParam += "pageSize=" + data.perPage + "&"
    }
    return new Promise((resolve, reject) => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.PAYMENTS + queryParam, "GET", {})
            .then(async (res) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}


export const RmApiService = {
    addRM,
    addAgent,
    addBuilder,
    getRms,
    getAgents,
    getRmCustomers,
    getCustomers,
    getBuilders,
    deleteProperty,
    deleteDeveloper,
    updateCustomerProfile,
    updateCustomerStatus,
    updatePaymentStatus,
    updateCustomerRm,
    getDevelopers,
    getBuilderData,
    getPropertyBookingData,
    addProperty,
    deleteRM,
    deleteAgent,
    updateBuilder,
    updateAgent,
    updateRm,
    updateProperty,
    getAgentLeads,
    addCustomerLead,
    addPropertyVariant,
    getPropertyVariants,
    updatePropertyVariant,
    deletePropertyVariant,
    updateRMCustomerRemarks,
    getAmenities,
    sendImage,
    getLeads,
    getCEList,
    addCE,
    updateCE,
    deleteCE,
    updateLeadStatus,
    propertyBooking,
    getPaymentData
}
