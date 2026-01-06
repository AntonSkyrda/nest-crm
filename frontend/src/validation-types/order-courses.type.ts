export const OrderCourses = {
    FS: "FS",
    QACX: "QACX",
    JCX: "JCX",
    JSCX: "JSCX",
    FE: "FE",
    PCX: "PCX",
} as const;

export type OrderCoursesType =
    (typeof OrderCourses)[keyof typeof OrderCourses];
