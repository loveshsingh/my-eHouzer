import {fetchDataFromAPI} from "../network/NetworkConnection";
import {NetworkConfiguration} from "../network/NetworkConfiguration";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
//const API_URL = "http://localhost:8081/api/";

const downloadBuilders = () => {
        fetchDataFromAPI(API_URL + NetworkConfiguration.DOWNLOAD_BUILDERS_API, "GET", {})
            .then(async (res) => {
                if (res.status === 200) {
                    const blob = await res.blob();
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", "Builders.xlsx");
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    //  resolve(blob);
                } else {
                    console.error(res);
                }
            })
            .catch((err) => {
                console.error("Builders error: ", err);
            });
}

const downloadRms = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.DOWNLOAD_RMS_API, "GET", {})
        .then(async (res) => {
            if (res.status === 200) {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "rms.xlsx");
                document.body.appendChild(link);
                link.click();
                link.remove();
                //  resolve(blob);
            } else {
                console.error(res);
            }
        })
        .catch((err) => {
            console.error("RMS error: ", err);
        });
}

const downloadContractedAgents = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.DOWNLOAD_CONTRACTED_AGENTS_API, "GET", {})
        .then(async (res) => {
            console.log("header-name",res.headers['content-disposition'],res.headers.get('content-disposition'))
            if (res.status === 200) {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "Contracted Agents.xlsx");
                document.body.appendChild(link);
                link.click();
                link.remove();
                //  resolve(blob);
            } else {
                console.error(res);
            }
        })
        .catch((err) => {
            console.error("Contracted Agents error: ", err);
        });
}

const downloadCustomers = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.DOWNLOAD_CUSTOMERS_LIST_API, "GET", {})
        .then(async (res) => {
           // console.log("header-name",res.headers['content-disposition'],res.headers.get('content-disposition'))
            if (res.status === 200) {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "Customers.xlsx");
                document.body.appendChild(link);
                link.click();
                link.remove();
                //  resolve(blob);
            } else {
                console.error(res);
            }
        })
        .catch((err) => {
            console.error("Customers error: ", err);
        });
}


const downloadPropertyVariants = (propertyId) => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.DOWNLOAD_PROPERTY_VARIANTS_API+"?propertyId="+propertyId, "GET", {})
        .then(async (res) => {
            // console.log("header-name",res.headers['content-disposition'],res.headers.get('content-disposition'))
            if (res.status === 200) {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "Property Variants.xlsx");
                document.body.appendChild(link);
                link.click();
                link.remove();
                //  resolve(blob);
            } else {
                console.error(res);
            }
        })
        .catch((err) => {
            console.error("Property Variants error: ", err);
        });
}

const downloadRmCustomers = (rmId) => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.DOWNLOAD_RM_CUSTOMER_API+"?rmId="+rmId, "GET", {})
        .then(async (res) => {
            // console.log("header-name",res.headers['content-disposition'],res.headers.get('content-disposition'))
            if (res.status === 200) {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "Rm Customer("+rmId+").xlsx");
                document.body.appendChild(link);
                link.click();
                link.remove();
                //  resolve(blob);
            } else {
                console.error(res);
            }
        })
        .catch((err) => {
            console.error("Rm Customer error: ", err);
        });
}

const downloadAgentLeads = (agentId) => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.DOWNLOAD_AGENT_LEADS_API+"?agentId="+agentId, "GET", {})
        .then(async (res) => {
            // console.log("header-name",res.headers['content-disposition'],res.headers.get('content-disposition'))
            if (res.status === 200) {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "Agent Leads("+agentId+").xlsx");
                document.body.appendChild(link);
                link.click();
                link.remove();
                //  resolve(blob);
            } else {
                console.error(res);
            }
        })
        .catch((err) => {
            console.error("Agent Leads error: ", err);
        });
}

const downloadBuilderStaticData = (developerId) => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.DOWNLOAD_BUILDER_STATS_API+"?developerId="+developerId, "GET", {})
        .then(async (res) => {
            // console.log("header-name",res.headers['content-disposition'],res.headers.get('content-disposition'))
            if (res.status === 200) {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "Builder Static Data("+developerId+").xlsx");
                document.body.appendChild(link);
                link.click();
                link.remove();
                //  resolve(blob);
            } else {
                console.error(res);
            }
        })
        .catch((err) => {
            console.error("Builder Static Data error: ", err);
        });
}

const downloadPropertyBookings = (propertyId) => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.DOWNLOAD_PROPERTY_BOOKINGS_API+"?propertyId="+propertyId, "GET", {})
        .then(async (res) => {
            if (res.status === 200) {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "Property Booking Data.xlsx");
                document.body.appendChild(link);
                link.click();
                link.remove();
                //  resolve(blob);
            } else {
                console.error(res);
            }
        })
        .catch((err) => {
            console.error("Property Booking Data error: ", err);
        });
}

const downloadCustomerDashboard = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.DOWNLOAD_CUSTOMER_DASHBOARD_API, "GET", {})
        .then(async (res) => {
            if (res.status === 200) {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "Customer Dashboard Data.xlsx");
                document.body.appendChild(link);
                link.click();
                link.remove();
                //  resolve(blob);
            } else {
                console.error(res);
            }
        })
        .catch((err) => {
            console.error("Customer Dashboard Data error: ", err);
        });
}

const downloadBuilderSales = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.DOWNLOAD_BUILDER_SALES_API, "GET", {})
        .then(async (res) => {
            if (res.status === 200) {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "Builder Sales Data.xlsx");
                document.body.appendChild(link);
                link.click();
                link.remove();
                //  resolve(blob);
            } else {
                console.error(res);
            }
        })
        .catch((err) => {
            console.error("Builder Sales Data error: ", err);
        });
}

const downloadBuilderSalesUnit = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.DOWNLOAD_BUILDER_SALES_UNIT_API, "GET", {})
        .then(async (res) => {
            if (res.status === 200) {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "Builder Sales Unit Data.xlsx");
                document.body.appendChild(link);
                link.click();
                link.remove();
                //  resolve(blob);
            } else {
                console.error(res);
            }
        })
        .catch((err) => {
            console.error("Builder Sales Unit Data error: ", err);
        });
}

const downloadTotalSales = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.DOWNLOAD_TOTAL_SALES_API, "GET", {})
        .then(async (res) => {
            if (res.status === 200) {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "Total Sales Data.xlsx");
                document.body.appendChild(link);
                link.click();
                link.remove();
                //  resolve(blob);
            } else {
                console.error(res);
            }
        })
        .catch((err) => {
            console.error("Total Sales Data error: ", err);
        });
}
/**
 * @author Vipul Garg
 * @since 02-05-2023
 * @description to download Admin Leads
 */
const downloadAdminLeads = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.DOWNLOAD_ADMIN_LEADS_API, "GET", {})
        .then(async (res) => {
            if (res.status === 200) {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "adminLeads.xlsx");
                document.body.appendChild(link);
                link.click();
                link.remove();
                //  resolve(blob);
            } else {
                console.error(res);
            }
        })
        .catch((err) => {
            console.error("Admin Leads Data error: ", err);
        });
}

/**
 * @author Vipul Garg
 * @since 02-05-2023
 * @description to download CE List
 */
const downloadCEList = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.DOWNLOAD_CE_LIST_API, "GET", {})
        .then(async (res) => {
            if (res.status === 200) {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "ceList.xlsx");
                document.body.appendChild(link);
                link.click();
                link.remove();
                //  resolve(blob);
            } else {
                console.error(res);
            }
        })
        .catch((err) => {
            console.error("CE List Data error: ", err);
        });
}

export const ExcelDownloadService = {
    downloadRms,
    downloadBuilders,
    downloadContractedAgents,
    downloadCustomers,
    downloadPropertyVariants,
    downloadRmCustomers,
    downloadAgentLeads,
    downloadBuilderStaticData,
    downloadPropertyBookings,
    downloadCustomerDashboard,
    downloadBuilderSales,
    downloadBuilderSalesUnit,
    downloadTotalSales,
    downloadAdminLeads,
    downloadCEList,
}
