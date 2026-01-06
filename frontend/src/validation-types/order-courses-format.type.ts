export const OrderCoursesFormats = {
    STATIC: "static",
    ONLINE: "online",
} as const;

export type OrderCoursesFormatType =
    (typeof OrderCoursesFormats)[keyof typeof OrderCoursesFormats];
