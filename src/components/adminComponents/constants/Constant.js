export const CUSTOMER_COLUMN = [
    {value: 'siNo', name: 'S. No.'},
    {value: 'firstName', name: 'First name'},
    {value: 'lastName', name: 'Last name'},
    {value: 'contactNo', name: 'Mobile no.'},
    {value: 'emailId', name: 'Email address'},
    {value: 'address', name: 'Address'},
    {value: 'city', name: 'City'},
    {value: 'state', name: 'State'},
    {value: 'pincode', name: 'Pincode'},
    {value: 'remark', name: 'Remarks'},
    {value: 'properties', name: 'Properties'},
    {value: 'builder', name: 'Builder'},
    {value: 'location', name: 'Location'},
    {value: 'propertyPrice', name: 'Property price'},
    {value: 'status', name: 'Status'},
    {value: 'date', name: 'Date'},
    {value: 'rm', name: 'RM'},
    {value: 'contractedAgent', name: 'Contracted Agent'},
    /*{value: 'saveStatus', name: 'Save Status'},
    {value: 'saveRm', name: 'Save Rm'},*/
];

export const BUILDER_COLUMN = [
    {value: 'siNo', name: 'S. No.'},
    {value: 'builderName', name: 'Name'},
    {value: 'builderGroup', name: 'Group'},
    {value: 'project', name: 'Project'},
    {value: 'area', name: 'Area'},
    {value: 'city', name: 'City'},
    {value: 'variants', name: 'Variants'},
    {value: 'representative1', name: 'Representative 1'},
    {value: 'representative2', name: 'Representative 2'},
];

export const RM_COLUMN = [
    {value: 'siNo', name: 'S. No.'},
    {value: 'employeeID', name: 'Employee ID'},
    {value: 'name', name: 'Name'},
    {value: 'contactNumber', name: 'Mobile no.'},
    {value: 'emailId', name: 'Email address'},
    {value: 'customerCount', name: 'Customers'},
    {value: 'contractedAgents', name: 'Agents'},
    {value: 'remarks', name: 'Remarks'},
    /*{value: 'delete', name: 'Delete'},*/
    {value: 'remarks', name: 'Actions'},
];

export const CONTRACTED_AGENT_COLUMN = [
    {value: 'siNo', name: 'S. No.'},
    {value: 'agentFirstName', name: 'First Name'},
    {value: 'agentLastName', name: 'Last Name'},
    {value: 'mobileNo', name: 'Mobile no.'},
    {value: 'emailAddress', name: 'Email address'},
    {value: 'noOfCustomers', name: 'Customers'},
    {value: 'assignedRM', name: 'Assigned RM'},
    {value: 'remark', name: 'Remarks'},
    /*{value: 'delete', name: 'Delete'},*/
];

export const CUSTOMER_STATUS = [
    'Searching',
    'Requested for RM',
    'RM Assigned',
    'RM Call',
    'Site Visit Scheduled',
    'Site Visit Completed',
    'Online Site Visit Scheduled',
    'Online Site Visit Completed',
    'Book Property',
    'Payment made',
    'Payment received',
    'Not interested',
    'Sign Agreement'
];

/**
 * @author Vikrant
 * @since 20-03-2023
 * @description toast message constants
 * @type {{SUCCESS: string, ERROR: string, WARNING: string}}
 */
export const TOAST_MESSAGES = {
    SUCCESS: "success",
    ERROR: "error",
    WARNING: "warning",
}


export const CONSTANTS = {
    EMAIL: "email",
    MOBILE: "mobile"
}
/**
 * @author VIpul Garg
 * @since 03-05-2023
 * @description lead status constants
 */
export const LEAD_STATUS = [
    'Initiate',
    'Customer',
    'Not Interested',
];
