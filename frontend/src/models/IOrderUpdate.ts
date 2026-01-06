import type {OrderCoursesType} from "../validation-types/order-courses.type.ts";
import type {OrderCoursesTypeType} from "../validation-types/order-courses-type.type.ts";
import type {OrderStatusType} from "../validation-types/order-status.type.ts";
import type {OrderCoursesFormatType} from "../validation-types/order-courses-format.type.ts";


export type IOrderUpdate = Partial<{
    name: string | null;
    surname: string | null;
    email: string | null;
    phone: string | null;
    age: number | null;

    course: OrderCoursesType | null;
    course_format: OrderCoursesFormatType | null;
    course_type: OrderCoursesTypeType | null;
    status: OrderStatusType | null;

    sum: number | null;
    alreadyPaid: number | null;
    utm: string | null;
    msg: string | null;
}>;