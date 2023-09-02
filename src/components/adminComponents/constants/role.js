/**
 * @author Vikrant
 * @since 11-03-2023
 * @return {{AGENT: string, CE: string, DEVELOPER: string, CUSTOMER: string, ADMIN: string, RM: string}}
 */
const createRole = () => {
    return {
        ADMIN: "UR_000001",
        RM: "UR_000002",
        CUSTOMER: "UR_000003",
        CE: "UR_000004",
        AGENT: "UR_000005",
        DEVELOPER: "UR_000006",
    }
}

export const Role = createRole();
