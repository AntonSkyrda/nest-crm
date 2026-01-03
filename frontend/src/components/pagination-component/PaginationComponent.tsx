import type { FC } from "react";

type PageItem = number | "dots";

type Props = {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    siblings?: number;
};

const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

const range = (start: number, end: number): number[] => {
    const result: number[] = [];
    for (let i = start; i <= end; i++) result.push(i);
    return result;
};

const buildPagination = (
    page: number,
    totalPages: number,
    siblings: number
): PageItem[] => {
    if (totalPages <= 1) return [1];

    const maxVisible = 2 + siblings * 2 + 1; // 1 + window + last
    if (totalPages <= maxVisible) {
        return range(1, totalPages);
    }

    const left = Math.max(2, page - siblings);
    const right = Math.min(totalPages - 1, page + siblings);

    const items: PageItem[] = [1];

    if (left > 2) items.push("dots");
    items.push(...range(left, right));
    if (right < totalPages - 1) items.push("dots");

    items.push(totalPages);

    return items;
};

export const PaginationComponent: FC<Props> = ({
                                                   page,
                                                   totalPages,
                                                   onPageChange,
                                                   siblings = 3,
                                               }) => {
    if (totalPages <= 1) return null;

    const safePage = clamp(page, 1, totalPages);
    const items = buildPagination(safePage, totalPages, siblings);

    const goTo = (next: number) =>
        onPageChange(clamp(next, 1, totalPages));

    return (
        <nav className="flex justify-center items-center gap-2 select-none">
            {safePage > 1 && (
                <button
                    onClick={() => goTo(safePage - 1)}
                    className="h-9 w-9 rounded-full bg-green-500 text-white hover:bg-green-600"
                >
                    {"<"}
                </button>
            )}
            {items.map((item, index) =>
                    item === "dots" ? (
                        <span
                            key={`dots-${index}`}
                            className="h-9 min-w-9 px-3 flex items-center justify-center rounded-full bg-green-500 text-white opacity-70"
                        >
            …
          </span>
                    ) : (
                        <button
                            key={item}
                            onClick={() => goTo(item)}
                            className={`h-9 min-w-9 px-3 rounded-full text-white ${
                                item === safePage
                                    ? "bg-green-700"
                                    : "bg-green-500 hover:bg-green-600"
                            }`}
                        >
                            {item}
                        </button>
                    )
            )}

            {safePage < totalPages && (
                <button
                    onClick={() => goTo(safePage + 1)}
                    className="h-9 w-9 rounded-full bg-green-500 text-white hover:bg-green-600"
                >
                    {">"}
                </button>
            )}
        </nav>
    );
};
