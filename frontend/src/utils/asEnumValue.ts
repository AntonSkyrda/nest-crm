export const asEnumValue = <T extends Record<string, string>>(
    obj: T,
    value: unknown
): T[keyof T] | undefined => {
    if (typeof value !== "string") return undefined;
    return (Object.values(obj) as string[]).includes(value) ? (value as T[keyof T]) : undefined;
};