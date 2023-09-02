/*const createStatusNames = () => {
    return {
        BOOK_PROPERTY: "Book Property",
        SEARCHING: "Searching",
        RM_ASSIGNED: "RM Assigned",
        RM_CALL_REQUESTED: "RM Call Requested",
        RM_CALL_NOT_ANSWERED: "RM Call Not Answered",
        RM_CALL_COMPLETED: "RM Call Completed",
        ONLINE_SITE_VISIT_SCHEDULED: "Online Site Visit Scheduled",
        ONLINE_SITE_VISIT_COMPLETED: "Online Site Visit Completed",
        SITE_VISIT_SCHEDULED: "Site Visit Scheduled",
        SITE_VISIT_COMPLETED: "Site Visit Completed",
        SITE_VISIT_CANCELLED: "Site Visit Cancelled",
        SIGN_AGGREMENT: "Sign Aggrement",
        PAYMENT_MADE: "Payment Made",
        PAYMENT_RECIEVED: "Payment Recieved",
        PAYMENT_CANCELLED: "Payment Cancelled",
        NOT_INTERESTED: "Not Interested",
    }
}

const createStatusLevels = () => {
    return {
        SEARCHING: 100,
        RM_ASSIGNED: 200,
        RM_CALL_REQUESTED: 300,
        RM_CALL_NOT_ANSWERED: 320,
        RM_CALL_COMPLETED: 340,
        ONLINE_SITE_VISIT_SCHEDULED: 400,
        SITE_VISIT_SCHEDULED: 420,
        SITE_VISIT_CANCELLED: 440,
        ONLINE_SITE_VISIT_COMPLETED: 460,
        SITE_VISIT_COMPLETED: 480,
        BOOK_PROPERTY: 500,
        PAYMENT_MADE: 600,
        PAYMENT_CANCELLED: 700,
        PAYMENT_RECIEVED: 800,
        SIGN_AGGREMENT: 900,
        NOT_INTERESTED: 10,
    }
}*/

export const StatusConstants = [
    {level: 10, name: "Not Interested"},
    {level: 100, name: "Searching"},
    {level: 200, name: "RM Assigned"},
    {level: 300, name: "RM Call Requested"},
    {level: 320, name: "RM Call Not Answered"},
    {level: 340, name: "RM Call Completed"},
    {level: 400, name: "Online Site Visit Scheduled"},
    {level: 420, name: "Site Visit Scheduled"},
    {level: 440, name: "Site Visit Cancelled"},
    {level: 460, name: "Online Site Visit Completed"},
    {level: 480, name: "Site Visit Completed"},
    {level: 500, name: "Book Property"},
    {level: 600, name: "Payment Made"},
    {level: 700, name: "Payment Cancelled"},
    {level: 800, name: "Payment Recieved"},
    {level: 900, name: "Sign Aggrement"},
]


export const PaymentConstants = [
    {level: 600, name: "Payment Made"},
    {level: 700, name: "Payment Cancelled"},
    {level: 800, name: "Payment Recieved"},
]

export const startBookingStatus = {level: 600, name: "Payment Made"}
export const endBookingStatus = {level: 900, name: "Sign Aggrement"}

/*
export const StatusNames = createStatusNames();

export const StatusLevels = createStatusLevels();
*/
