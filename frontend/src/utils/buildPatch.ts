export const buildPatch = <T extends Record<string, unknown>>(patch: T): Partial<T> => {
    const result: Partial<T> = {};

    (Object.keys(patch) as (keyof T)[]).forEach((key) => {
        const value: unknown = patch[key]; // 👈 важливо: робимо unknown

        if (value === undefined) return;
        if (typeof value === "string" && value.trim().length === 0) return;

        result[key] = patch[key];
    });

    return result;
};
