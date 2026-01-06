export const OrderStatuses = {
    InWork: "In work",
    New: "New",
    Agree: "Agree",
    Disagree: "Disagree",
    Dubbing: "Dubbing",
} as const;

export type OrderStatusType =
    (typeof OrderStatuses)[keyof typeof OrderStatuses];
