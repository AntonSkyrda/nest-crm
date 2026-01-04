import type {FC} from "react";
import {useOrderComments} from "../../hooks/useOrderComments.ts";
import {Button} from "../ui/button.tsx";
import {formatDateTime, formatMoney} from "../../utils/utils.ts";
import {Separator} from "../ui/separator.tsx";
import {Input} from "../ui/input.tsx";
import type {IOrder} from "../../models/IOrder.ts";

type Props = {
    order: IOrder;
};

export const OrderComponent: FC<Props> = ({ order }) => {
    const { open, toggleOpen, text, setText, sending, canComment, submit } =
        useOrderComments(order);

    return (
        <>
            {/* MAIN ROW */}
            <tr
                className="border-b last:border-b-0 hover:bg-muted/50 cursor-pointer"
                onClick={toggleOpen}
            >
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
                <td className="p-2 align-top">
                    {order.manager ? `${order.manager.firstName} ${order.manager.lastName}` : "—"}
                </td>
                <td className="p-2 align-top">{order.group ? order.group.name : "—"}</td>
            </tr>

            {open && (
                <tr className="border-b bg-muted/20">
                    <td colSpan={15} className="p-4">
                        <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">Message</p>
                                    <div className="rounded-md border bg-background p-3 whitespace-pre-wrap">
                                        {order.msg ?? "—"}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">UTM</p>
                                    <div className="rounded-md border bg-background p-3 whitespace-pre-wrap">
                                        {order.utm ?? "—"}
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex gap-2 items-center">
                                <Input
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    disabled={!canComment || sending}
                                    placeholder={
                                        canComment
                                            ? "Add Comment..."
                                            : "Can`t comment (Order was taken by another manager.)"
                                    }
                                    onClick={(e) => e.stopPropagation()}
                                />
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        submit();
                                    }}
                                    disabled={!canComment || sending}
                                >
                                    {sending ? "..." : "Send"}
                                </Button>
                            </div>

                            <div className="space-y-2">
                                {(order.comments ?? []).length === 0 ? (
                                    <p className="text-sm text-muted-foreground"></p>
                                ) : (
                                    order.comments!.map((c) => (
                                        <div key={c.id} className="rounded-md border bg-background p-3">
                                            <p className="text-xs text-muted-foreground mb-1">
                                                {c.authorLastName} · {formatDateTime(c.createdAt)}
                                            </p>
                                            <p className="whitespace-pre-wrap">{c.text}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};