const ADMIN = '/admin';
const CE = ADMIN + '/ce';
const RM = ADMIN + '/rm';
const BUILDER = ADMIN + '/builder';
const AGENT = ADMIN + '/agent';
const Payment = ADMIN + '/payment';

export const SidebarData = [
    {
        title: "Dashboard",
        icon: "material-symbols:dashboard-outline",
        link: ADMIN,
        role: "UR_000001"
    },
    {
        title: "Customer Experience",
        icon: "material-symbols:groups-outline",
        link: CE,
        role: "UR_000004"
    },
    {
        title: "Relationship Manager",
        icon: "material-symbols:handshake-outline",
        link: RM,
        role: "UR_000002"
    },
    {
        title: "Builder",
        icon: "ic:outline-apartment",
        link: BUILDER,
        role: "UR_000006"
    },
    {
        title: "Agent",
        icon: "material-symbols:real-estate-agent-outline",
        link: AGENT,
        role: "UR_000005"
    },
    /*{
        title: "Payment",
        icon: "Payment",
        link: Payment,
        // role: "UR_000006"
    },*/
];
