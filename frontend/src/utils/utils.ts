import { format, isValid, parseISO } from "date-fns";

import type {IUser} from "../models/IUser.ts";

export const getDisplayName = (user: unknown): { name: string; initials: string } => {
    let name = "User";

    if (user && typeof user === "object") {
        const first = "firstName" in user ? (user as IUser).firstName : "";
        const last = "lastName" in user ? (user as IUser).lastName : "";
        const email = "email" in user ? (user as IUser).email : "";

        name = `${first} ${last}`.trim() || email || "User";
    }

    const parts = name.split(" ").filter(Boolean);
    const initials =
        parts.length >= 2
            ? `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase()
            : (parts[0]?.slice(0, 2) ?? "US").toUpperCase();

    return { name, initials };
}

export const formatDateTime = (
    value: string | Date | null | undefined
): string => {
    if (!value) return "—";

    const date =
        typeof value === "string" ? parseISO(value) : value;

    if (!isValid(date)) return "—";

    return format(date, "MMM d, yyyy");
};


export const formatMoney = (value: number | null | undefined) => {
    if (value === null || value === undefined) return "—";
    return String(value)
}

