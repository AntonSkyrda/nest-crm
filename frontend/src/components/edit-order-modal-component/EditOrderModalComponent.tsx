import type { IOrder } from "../../models/IOrder.ts";
import { type FC, useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../hooks/redux-hooks.ts";
import { useGroups } from "../../hooks/useGroups.ts";
import { useOrderUpdate } from "../../hooks/useOrderUpdate.ts";
import { useOrderGroup } from "../../hooks/useOrderGroup.ts";
import { useForm } from "react-hook-form";

import type { IOrderUpdate } from "../../models/IOrderUpdate.ts";

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog.tsx";
import { Label } from "../ui/label.tsx";
import { Input } from "../ui/input.tsx";
import { Separator } from "../ui/separator.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select.tsx";
import { Button } from "../ui/button.tsx";
import { Textarea } from "../ui/textarea.tsx";

import { joiResolver } from "@hookform/resolvers/joi";

import { OrderCoursesFormats } from "../../validation-types/order-courses-format.type.ts";
import { OrderCoursesTypes } from "../../validation-types/order-courses-type.type.ts";
import { OrderCourses } from "../../validation-types/order-courses.type.ts";
import { OrderStatuses } from "../../validation-types/order-status.type.ts";

import { asEnumValue } from "../../utils/asEnumValue.ts";
import {type EditOrderFormValues, editOrderJoiSchema} from "../../schemas/edit-order.schema.ts";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    order: IOrder;
};

export const EditOrderModalComponent: FC<Props> = ({ open, onOpenChange, order }) => {
    const me = useAppSelector((s) => s.auth.me);

    const canEdit = useMemo(() => {
        if (!me) return false;
        return order.managerId === null || order.managerId === me.id;
    }, [me, order.managerId]);

    const { groups, error: groupsError, refresh, createGroup } = useGroups(false);
    const { updateOrder, updating, error: updateError } = useOrderUpdate();
    const { setGroup, updatingGroup, error: groupError } = useOrderGroup();

    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(order.groupId ?? null);
    const [addNewGroup, setAddNewGroup] = useState(false);
    const [newGroupName, setNewGroupName] = useState("");
    const [localGroupError, setLocalGroupError] = useState<string | null>(null);

    const form = useForm<EditOrderFormValues>({
        resolver: joiResolver(editOrderJoiSchema),
        defaultValues: {
            name: order.name ?? "",
            surname: order.surname ?? "",
            email: order.email ?? "",
            phone: order.phone ?? "",
            age: order.age ?? undefined,

            course: asEnumValue(OrderCourses, order.course),
            course_format: asEnumValue(OrderCoursesFormats, order.course_format),
            course_type: asEnumValue(OrderCoursesTypes, order.course_type),
            status: asEnumValue(OrderStatuses, order.status),

            sum: order.sum ?? undefined,
            alreadyPaid: order.alreadyPaid ?? undefined,

            utm: order.utm ?? "",
            msg: order.msg ?? "",
        },
        mode: "onSubmit",
    });

    useEffect(() => {
        if (!open) return;

        refresh();
        setSelectedGroupId(order.groupId ?? null);
        setAddNewGroup(false);
        setNewGroupName("");
        setLocalGroupError(null);

        form.reset({
            name: order.name ?? "",
            surname: order.surname ?? "",
            email: order.email ?? "",
            phone: order.phone ?? "",
            age: order.age ?? undefined,

            course: asEnumValue(OrderCourses, order.course),
            course_format: asEnumValue(OrderCoursesFormats, order.course_format),
            course_type: asEnumValue(OrderCoursesTypes, order.course_type),
            status: asEnumValue(OrderStatuses, order.status),

            sum: order.sum ?? undefined,
            alreadyPaid: order.alreadyPaid ?? undefined,

            utm: order.utm ?? "",
            msg: order.msg ?? "",
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, order.id]);

    const sortedGroups = useMemo(() => {
        return [...groups].sort((a, b) => a.name.localeCompare(b.name));
    }, [groups]);

    const disabledAll = !canEdit || updating || updatingGroup;

    const onCreateGroup = async () => {
        setLocalGroupError(null);
        const name = newGroupName.trim();

        if (!name) {
            setLocalGroupError("Enter group name");
            return;
        }
        if (name.length > 15) {
            setLocalGroupError("Group name should be 15 or less symbols");
            return;
        }

        try {
            const created = await createGroup(name);
            setSelectedGroupId(created.id);
            setAddNewGroup(false);
            setNewGroupName("");
        } catch (e) {
            setLocalGroupError(typeof e === "string" ? e : "Create group failed");
        }
    };

    const onSubmit = async (values: EditOrderFormValues) => {
        if (!canEdit) return;

        if (selectedGroupId !== (order.groupId ?? null)) {
            if (selectedGroupId !== null) {
                await setGroup(order.id, selectedGroupId);
            }
        }

        const patch: IOrderUpdate = {
            name: values.name || undefined,
            surname: values.surname || undefined,
            email: values.email || undefined,
            phone: values.phone || undefined,
            age: values.age ?? undefined,

            course: values.course || undefined,
            course_format: values.course_format || undefined,
            course_type: values.course_type || undefined,
            status: values.status || undefined,

            sum: values.sum ?? undefined,
            alreadyPaid: values.alreadyPaid ?? undefined,

            utm: values.utm || undefined,
            msg: values.msg || undefined,
        };

        await updateOrder(order.id, patch);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[760px]">
                <DialogHeader>
                    <DialogTitle>Edit order #{order.id}</DialogTitle>
                </DialogHeader>

                {!canEdit && (
                    <div className="rounded-md border p-3 text-sm">
                        Ти можеш редагувати тільки заявку без менеджера або заявку, що призначена тобі.
                    </div>
                )}

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name/Surname */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Name</Label>
                            <Input disabled={disabledAll} {...form.register("name")} />
                            {form.formState.errors.name?.message && (
                                <p className="text-sm text-red-500">{String(form.formState.errors.name.message)}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Surname</Label>
                            <Input disabled={disabledAll} {...form.register("surname")} />
                            {form.formState.errors.surname?.message && (
                                <p className="text-sm text-red-500">{String(form.formState.errors.surname.message)}</p>
                            )}
                        </div>
                    </div>

                    {/* Email/Phone */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="space-y-2 sm:col-span-2">
                            <Label>Email</Label>
                            <Input disabled={disabledAll} {...form.register("email")} />
                            {form.formState.errors.email?.message && (
                                <p className="text-sm text-red-500">{String(form.formState.errors.email.message)}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Phone</Label>
                            <Input disabled={disabledAll} {...form.register("phone")} />
                            {form.formState.errors.phone?.message && (
                                <p className="text-sm text-red-500">{String(form.formState.errors.phone.message)}</p>
                            )}
                        </div>
                    </div>

                    {/* Age/Sum/Paid */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="space-y-2">
                            <Label>Age</Label>
                            <Input
                                disabled={disabledAll}
                                type="number"
                                // 👇 важливо: valueAsNumber, щоб RHF давав number, а не string
                                {...form.register("age", { valueAsNumber: true })}
                            />
                            {form.formState.errors.age?.message && (
                                <p className="text-sm text-red-500">{String(form.formState.errors.age.message)}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Sum</Label>
                            <Input disabled={disabledAll} type="number" {...form.register("sum", { valueAsNumber: true })} />
                            {form.formState.errors.sum?.message && (
                                <p className="text-sm text-red-500">{String(form.formState.errors.sum.message)}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Already paid</Label>
                            <Input
                                disabled={disabledAll}
                                type="number"
                                {...form.register("alreadyPaid", { valueAsNumber: true })}
                            />
                            {form.formState.errors.alreadyPaid?.message && (
                                <p className="text-sm text-red-500">{String(form.formState.errors.alreadyPaid.message)}</p>
                            )}
                        </div>
                    </div>

                    <Separator />

                    {/* Enums */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
                        <div className="space-y-2">
                            <Label>Status</Label>
                            <Select
                                disabled={disabledAll}
                                value={form.watch("status") ?? ""}
                                onValueChange={(v) => form.setValue("status", (v || undefined) as EditOrderFormValues["status"])}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(OrderStatuses).map((s) => (
                                        <SelectItem key={s} value={s}>
                                            {s}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Course</Label>
                            <Select
                                disabled={disabledAll}
                                value={form.watch("course") ?? ""}
                                onValueChange={(v) => form.setValue("course", (v || undefined) as EditOrderFormValues["course"])}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(OrderCourses).map((c) => (
                                        <SelectItem key={c} value={c}>
                                            {c}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Course type</Label>
                            <Select
                                disabled={disabledAll}
                                value={form.watch("course_type") ?? ""}
                                onValueChange={(v) =>
                                    form.setValue("course_type", (v || undefined) as EditOrderFormValues["course_type"])
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(OrderCoursesTypes).map((t) => (
                                        <SelectItem key={t} value={t}>
                                            {t}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Course format</Label>
                            <Select
                                disabled={disabledAll}
                                value={form.watch("course_format") ?? ""}
                                onValueChange={(v) =>
                                    form.setValue("course_format", (v || undefined) as EditOrderFormValues["course_format"])
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(OrderCoursesFormats).map((f) => (
                                        <SelectItem key={f} value={f}>
                                            {f}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Separator />

                    {/* Group */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                            <Label>Group</Label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                disabled={disabledAll}
                                onClick={() => {
                                    setLocalGroupError(null);
                                    setAddNewGroup((v) => !v);
                                }}
                            >
                                {addNewGroup ? "Cancel add" : "Add new group"}
                            </Button>
                        </div>

                        {!addNewGroup && (
                            <Select
                                disabled={disabledAll}
                                value={selectedGroupId ? String(selectedGroupId) : ""}
                                onValueChange={(v) => setSelectedGroupId(v ? Number(v) : null)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select group" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sortedGroups.map((g) => (
                                        <SelectItem key={g.id} value={String(g.id)}>
                                            {g.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}

                        {addNewGroup && (
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                                <div className="flex-1 space-y-2">
                                    <Label>New group name</Label>
                                    <Input
                                        disabled={disabledAll}
                                        value={newGroupName}
                                        onChange={(e) => setNewGroupName(e.target.value)}
                                        maxLength={15}
                                    />
                                </div>
                                <Button type="button" disabled={disabledAll} onClick={onCreateGroup}>
                                    Create
                                </Button>
                            </div>
                        )}

                        {(localGroupError || groupsError) && (
                            <p className="text-sm text-red-500">{localGroupError ?? groupsError}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label>UTM</Label>
                            <Input disabled={disabledAll} {...form.register("utm")} />
                        </div>
                        <div className="space-y-2">
                            <Label>Message</Label>
                            <Textarea disabled={disabledAll} {...form.register("msg")} />
                        </div>
                    </div>

                    {(updateError || groupError) && (
                        <p className="text-sm text-red-500">{updateError ?? groupError}</p>
                    )}

                    <DialogFooter className="gap-2">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={disabledAll}>
                            {updating || updatingGroup ? "Saving..." : "Save"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
