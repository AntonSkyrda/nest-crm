import type {IOrder} from "../../models/IOrder.ts";
import {formatDateTime, formatMoney} from "../../utils/utils.ts";
import type {FC} from "react";

type Props = {
    order: IOrder;
}

export const OrderComponent: FC<Props> = ({ order }) => {
    return (
        <tr className="border-b last:border-b-0 hover:bg-muted/50">
            <td className="p-2 align-top">{order.id ?? "—"}</td>
            <td className="p-2 align-top">{order.name ?? "—"}</td>
            <td className="p-2 align-top">{order.surname ?? "—"}</td>
            <td className="p-2 align-top">{order.email ?? "—"}</td>
            <td className="p-2 align-top">{order.phone ?? "—"}</td>
            <td className="p-2 align-top">{order.age ?? "—"}</td>
            <td className="p-2 align-top">{order.course ?? "—"}</td>
            <td className="p-2 align-top">{order.course_format ?? "—"}</td>
            <td className="p-2 align-top">{order.course_type ?? "—"}</td>
            <td className="p-2 align-top">{order.status ?? "—"}</td>
            <td className="p-2 align-top">{formatMoney(order.sum)}</td>
            <td className="p-2 align-top">{formatMoney(order.alreadyPaid)}</td>
            <td className="p-2 align-top">{formatDateTime(order.created_at)}</td>
        </tr>
    );
};