export const Th = ({
                label,
                field,
                activeField,
                activeDir,
                onClick,
            }: {
    label: string;
    field: string;
    activeField: string;
    activeDir: "asc" | "desc";
    onClick: (field: string) => void;
}) => {
    const isActive = activeField === field;
    const arrow = isActive ? (activeDir === "asc" ? " ▲" : " ▼") : "";

    return (
        <th
            onClick={() => onClick(field)}
            className="p-2 cursor-pointer select-none hover:underline whitespace-nowrap"
            aria-sort={
                isActive ? (activeDir === "asc" ? "ascending" : "descending") : "none"
            }
        >
            {label}
            {arrow}
        </th>
    );
};