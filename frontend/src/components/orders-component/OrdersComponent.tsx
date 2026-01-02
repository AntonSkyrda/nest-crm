import {useOrders} from "../../hooks/useOrders.ts";
import {OrderComponent} from "../order-component/OrderComponent.tsx";
import {PaginationComponent} from "../pagination-component/PaginationComponent.tsx";

export const OrdersComponent = () => {
    const {orders, page, totalPages, loading, error, setPage} = useOrders()

    if (loading) return <p>loading...</p>
    if (error) return <p className="text-red-500">error</p>

    return (
        <div className="space-y-4">
            <div className="w-full overflow-x-auto rounded-xl border bg-background">
                <table className="w-full text-sm">
                    <thead className="bg-[#79b35a]">
                    <tr className="text-left">
                        <th className="p-2 text-white">id</th>
                        <th className="p-2 text-white">name</th>
                        <th className="p-2 text-white">surname</th>
                        <th className="p-2 text-white">email</th>
                        <th className="p-2 text-white">phone</th>
                        <th className="p-2 text-white">age</th>
                        <th className="p-2 text-white">course</th>
                        <th className="p-2 text-white">course_format</th>
                        <th className="p-2 text-white">course_type</th>
                        <th className="p-2 text-white">status</th>
                        <th className="p-2 text-white">sum</th>
                        <th className="p-2 text-white">alreadyPaid</th>
                        <th className="p-2 text-white">created_at</th>
                    </tr>
                    </thead>

                    <tbody>
                    {orders.length === 0 ? (
                        <tr>
                            <td
                                colSpan={13}
                                className="p-4 text-center text-muted-foreground"
                            >
                                Any orders ...
                            </td>
                        </tr>
                    ) : (
                        orders.map(order => (
                            <OrderComponent key={order.id} order={order} />
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            <PaginationComponent
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
};
