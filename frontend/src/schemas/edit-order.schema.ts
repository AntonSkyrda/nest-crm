import Joi from "joi";
import { OrderCourses } from "../validation-types/order-courses.type.ts";
import { OrderStatuses } from "../validation-types/order-status.type.ts";
import { OrderCoursesFormats } from "../validation-types/order-courses-format.type.ts";
import { OrderCoursesTypes } from "../validation-types/order-courses-type.type.ts";

type ValuesOf<T> = T[keyof T];

const enumValues = <T extends Record<string, string>>(obj: T) =>
    Object.values(obj) as ValuesOf<T>[];

const optTrimmedString = Joi.string().trim().min(1).optional().allow("");

const optNumber = Joi.number().min(0).optional().allow(null, "");

export type EditOrderFormValues = {
    name?: string;
    surname?: string;
    email?: string;
    phone?: string;
    age?: number;

    course?: ValuesOf<typeof OrderCourses>;
    course_format?: ValuesOf<typeof OrderCoursesFormats>;
    course_type?: ValuesOf<typeof OrderCoursesTypes>;
    status?: ValuesOf<typeof OrderStatuses>;

    sum?: number;
    alreadyPaid?: number;

    utm?: string;
    msg?: string;
};

export const editOrderJoiSchema = Joi.object<EditOrderFormValues>({
    name: optTrimmedString,
    surname: optTrimmedString,
    email: Joi.string().trim().email({ tlds: { allow: false } }).optional().allow(""),
    phone: Joi.string().trim().min(6).max(20).optional().allow(""),
    age: Joi.number().integer().min(0).optional().allow("", null),

    course: Joi.string().valid(...enumValues(OrderCourses)).optional().allow(""),
    course_format: Joi.string().valid(...enumValues(OrderCoursesFormats)).optional().allow(""),
    course_type: Joi.string().valid(...enumValues(OrderCoursesTypes)).optional().allow(""),
    status: Joi.string().valid(...enumValues(OrderStatuses)).optional().allow(""),

    sum: optNumber,
    alreadyPaid: optNumber,

    utm: optTrimmedString,
    msg: optTrimmedString,
}).options({
    abortEarly: false,
    convert: true,
});