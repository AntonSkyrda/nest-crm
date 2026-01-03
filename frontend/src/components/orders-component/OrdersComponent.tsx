import {Th} from "../../utils/Th.tsx";
import {OrderComponent} from "../order-component/OrderComponent.tsx";
import {PaginationComponent} from "../pagination-component/PaginationComponent.tsx";
import type {IOrder} from "../../models/IOrder.ts";
import {useOrders} from "../../hooks/useOrders.ts";

export const OrdersComponent = () => {
    const { orders, page, totalPages, loading, error, setPage, sortBy, sortDir, toggleSort } = useOrders();

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="space-y-4">
            <div className="w-full overflow-x-auto rounded-xl border bg-background">
                <table className="w-full text-sm">
                    <thead className="bg-muted">
                    <tr className="text-left">
                        <Th label="id" field="id" activeField={sortBy} activeDir={sortDir} onClick={toggleSort} />
                        <Th label="name" field="name" activeField={sortBy} activeDir={sortDir} onClick={toggleSort} />
                        <Th label="surname" field="surname" activeField={sortBy} activeDir={sortDir} onClick={toggleSort} />
                        <Th label="email" field="email" activeField={sortBy} activeDir={sortDir} onClick={toggleSort} />
                        <Th label="phone" field="phone" activeField={sortBy} activeDir={sortDir} onClick={toggleSort} />
                        <Th label="age" field="age" activeField={sortBy} activeDir={sortDir} onClick={toggleSort} />
                        <Th label="course" field="course" activeField={sortBy} activeDir={sortDir} onClick={toggleSort} />
                        <Th label="course_format" field="course_format" activeField={sortBy} activeDir={sortDir} onClick={toggleSort} />
                        <Th label="course_type" field="course_type" activeField={sortBy} activeDir={sortDir} onClick={toggleSort} />
                        <Th label="status" field="status" activeField={sortBy} activeDir={sortDir} onClick={toggleSort} />
                        <Th label="sum" field="sum" activeField={sortBy} activeDir={sortDir} onClick={toggleSort} />
                        <Th label="alreadyPaid" field="alreadyPaid" activeField={sortBy} activeDir={sortDir} onClick={toggleSort} />
                        <Th label="created_at" field="created_at" activeField={sortBy} activeDir={sortDir} onClick={toggleSort} />
                        <th> manager </th>
                    </tr>
                    </thead>

                    <tbody>
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan={13} className="p-4 text-center text-muted-foreground">
                                No orders found.
                            </td>
                        </tr>
                    ) : (
                        orders.map((order: IOrder) => <OrderComponent key={order.id} order={order} />)
                    )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center">
                <PaginationComponent page={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
        </div>
    );
};
