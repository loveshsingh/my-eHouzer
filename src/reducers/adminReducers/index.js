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
    DISPLAY_CUSTOMER_POPUP,
    DISPLAY_FORM,
    DISPLAY_PROPERTY_BOOKING_POPUP,
    DISPLAY_PROPERTY_VARIANT_POPUP, OPERATING_CITIES,
    PAYMENT_DATA,
    PAYMENT_LOADING,
    PROPERTY_BOOKING_DATA,
    PROPERTY_BOOKING_LOADING,
    PROPERTY_VARIANTS,
    PROPERTY_VARIANTS_LOADING,
    SHO,
    TOGGLE_FORM,
    USER_DETAILS_FORM
} from "../../actions/adminActions/type";
import {SET_ADMIN_METADATA} from "../../actions/login/types";

const initialState = {
    customerData: [
        {id: 0, customerName: "xyz", status: 'Searching'},
        {id: 1, customerName: "abc", status: 'Online Site Visit Scheduled'},
        {id: 2, customerName: "olp", status: 'RM Assigned'},
        {id: 3, customerName: "yup", status: 'Not interested'},
        {id: 4, customerName: "gym", status: 'Sign Agreement'},
    ],
    adminLoading: false,
    formToggle: false,
    buttonName: null,
    show: false,
    dataForm: [],
    popupRmId: "",
    popupPropertyId: "",
    rmList: [],
    rmListMetaData: {},
    rmListLoading: false,

    agentsList: [],
    agentsListMetaData: {},
    agentsListLoading: false,

    agentLeads: [],
    agentLeadsMetaData: {},
    agentLeadsLoading: false,

    rmCustomers: [],
    rmCustomersMetaData: {},
    rmCustomersLoading: false,

    customers: [],
    customersMetaData: {},
    customersLoading: false,

    builders: [],
    buildersListMetaData: {},
    buildersListLoading: false,

    developers: [],
    builderPropertiesData: [],
    builderPropertiesMetaData: {},
    builderPropertiesLoading: false,

    propertyBookingData: [],
    propertyBookingMetaData: {},
    propertyBookingLoading: false,

    popupPropertyIdVariant: '',
    propertyVariants: [],
    propertyVariantsMetaData: {},
    propertyVariantsLoading: false,


    amenities: [],
    propertyAmenities: [],

    operatingCities: [],

    userDetailsForm: {},
    adminLeads: [],
    adminLeadsLoading: false,
    adminLeadsMetaData: {},

    ceList: [],
    ceListMetaData: {},
    ceListLoading: false,

    paymentData: [],
    paymentLoading: false,
    onFormSubmit: undefined
};

/**
 * @author Vikrant
 * @since 18-02-2023
 * @description to toggle sidebar
 * @param state
 * @param action
 * @return {{toggle: boolean}|{toggle}}
 */
const AdminReducer = (state = initialState, action) => {
    switch (action.type) {

        case CUSTOMER_DATA:
            return {
                ...state,
                customerData: state.customerData.map(row => {

                    if (row.id === action.payload.id) {
                        row.status = action.payload.value;
                    }
                    return row;
                })
            };
        case DISPLAY_CUSTOMER_POPUP:
            return {
                ...state,
                popupRmId: action.payload.rmId
            };
        case DISPLAY_PROPERTY_VARIANT_POPUP:
            return {
                ...state,
                popupPropertyIdVariant: action.payload.propertyId
            };
        case DISPLAY_PROPERTY_BOOKING_POPUP:
            return {
                ...state,
                popupPropertyId: action.payload.propertyId
            };
        case DISPLAY_FORM:
            return {
                ...state,
                formToggle: action.payload.formToggle,
                buttonName: action.payload.buttonName,
                show: action.payload.show,
                dataForm: action.payload.data,
                onFormSubmit: action.payload.onSubmit,
            };
        case PROPERTY_VARIANTS:
            return {
                ...state,
                propertyVariants: action.payload.data,
                propertyVariantsMetaData: action.payload.metaData,
            };
        case PROPERTY_VARIANTS_LOADING:
            return {
                ...state,
                propertyVariantsLoading: action.payload
            };
        case TOGGLE_FORM:
            return {
                ...state,
                formToggle: action.payload
            };
        case BUTTON_NAME:
            return {
                ...state,
                buttonName: action.payload,
            };
        case SHO:
            return {
                ...state,
                show: action.payload,
            };
        case ADMIN_RM_LIST:
            return {
                ...state,
                rmList: action.payload.data,
                rmListMetaData: action.payload.metaData,
                rmListLoading: action.payload.isLoading
            };
        case ADMIN_RM_LIST_LOADING:
            return {
                ...state,
                rmListLoading: action.payload
            };
        case CE_AGENTS_LIST:
            return {
                ...state,
                agentsList: action.payload.data,
                agentsListMetaData: action.payload.metaData
            };
        case CE_AGENT_LIST_LOADING:
            return {
                ...state,
                agentsListLoading: action.payload
            };
        case ADMIN_RM_CUSTOMERS:
            return {
                ...state,
                rmCustomers: action.payload.data,
                rmCustomersMetaData: action.payload.metaData
            };
        case ADMIN_RM_CUSTOMERS_LOADING:
            return {
                ...state,
                rmCustomersLoading: action.payload
            };
        case AGENT_LEADS:
            return {
                ...state,
                agentLeads: action.payload.data,
                agentLeadsMetaData: action.payload.metaData
            };
        case AGENT_LEADS_LOADING:
            return {
                ...state,
                agentLeadsLoading: action.payload
            };
        case CUSTOMERS:
            return {
                ...state,
                customers: action.payload.data,
                customersMetaData: action.payload.metaData
            };
        case CUSTOMERS_LOADING:
            return {
                ...state,
                customersLoading: action.payload
            };
        case CE_BUILDERS:
            return {
                ...state,
                builders: action.payload.data,
                buildersListMetaData: action.payload.metaData
            };
        case CE_BUILDERS_LOADING:
            return {
                ...state,
                buildersListLoading: action.payload
            };
        case ADMIN_DEVELOPERS:
            return {
                ...state,
                developers: action.payload
            };
        case BUILDER_DATA:
            return {
                ...state,
                builderPropertiesData: action.payload.data,
                builderPropertiesMetaData: action.payload.metaData
            };
        case BUILDER_LOADING:
            return {
                ...state,
                builderPropertiesLoading: action.payload
            };
        case PROPERTY_BOOKING_DATA:
            return {
                ...state,
                propertyBookingData: action.payload.data,
                propertyBookingMetaData: action.payload.metaData
            };
        case PROPERTY_BOOKING_LOADING:
            return {
                ...state,
                propertyBookingLoading: action.payload
            };
        case AMENITIES:
            return {
                ...state,
                amenities: action.payload
            };
        case OPERATING_CITIES:
            return {
                ...state,
                operatingCities: action.payload
            };
        case ADMIN_PROPERTY_AMENITIES:
            return {
                ...state,
                propertyAmenities: action.payload
            };
        case USER_DETAILS_FORM:
            return {
                ...state,
                userDetailsForm: action.payload
            };
        case ADMIN_LEADS:
            return {
                ...state,
                adminLeads: action.payload.data,
                adminLeadsMetaData: action.payload.metaData
            }
        case ADMIN_LEADS_LOADING:
            return {
                ...state,
                adminLeadsLoading: action.payload
            }
        case CE_ADMIN_LIST:
            return {
                ...state,
                ceList: action.payload.data,
                ceListMetaData: action.payload.metaData
            }
        case CE_ADMIN_LIST_LOADING:
            return {
                ...state,
                ceListLoading: action.payload
            }
        case ADMIN_LOADING:
            return {
                ...state,
                adminLoading: action.payload
            }
        case PAYMENT_DATA:
            return {
                ...state,
                paymentData: action.payload
            }
        case PAYMENT_LOADING:
            return {
                ...state,
                paymentLoading: action.payload
            }
        case SET_ADMIN_METADATA:
            return {
                ...state,
                adminMetadata: action.payload,
            }
        default:
            return state;
    }
}

export default AdminReducer
