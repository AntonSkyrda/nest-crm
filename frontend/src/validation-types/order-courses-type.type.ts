export const OrderCoursesTypes = {
    PRO: "pro",
    MINIMAL: "minimal",
    PREMIUM: "premium",
    INCUBATOR: "incubator",
    VIP: "vip",
} as const;

export type OrderCoursesTypeType =
    (typeof OrderCoursesTypes)[keyof typeof OrderCoursesTypes];
