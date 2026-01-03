import type { FC, MouseEvent } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem, PaginationLink, PaginationNext,
    PaginationPrevious
} from "../ui/pagination.tsx";


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
    if (totalPages <= maxVisible) return range(1, totalPages);

    const left = Math.max(2, page - siblings);
    const right = Math.min(totalPages - 1, page + siblings);

    const items: PageItem[] = [1];

    if (left > 2) items.push("dots");
    items.push(...range(left, right));
    if (right < totalPages - 1) items.push("dots");

    items.push(totalPages);

    return items;
};

export const PaginationComponent: FC<Props> = (
    {
        page,
        totalPages,
        onPageChange,
        siblings = 3,
    }
) => {
    if (totalPages <= 1) return null;

    const safePage = clamp(page, 1, totalPages);
    const items = buildPagination(safePage, totalPages, siblings);

    const onNav = (e: MouseEvent, nextPage: number) => {
        e.preventDefault();
        onPageChange(clamp(nextPage, 1, totalPages));
    };

    return (
        <Pagination className="flex justify-center">
            <PaginationContent>
                {safePage > 1 && (
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            size="default"
                            onClick={(e) => onNav(e, safePage - 1)}
                        />
                    </PaginationItem>
                )}
                {items.map((item, index) =>
                    item === "dots" ? (
                        <PaginationItem key={`dots-${index}`}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={item}>
                            <PaginationLink
                                size="default"
                                href="#"
                                isActive={item === safePage}
                                onClick={(e) => onNav(e, item)}
                            >
                                {item}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}
                {safePage < totalPages && (
                    <PaginationItem>
                        <PaginationNext
                            size="default"
                            href="#"
                            onClick={(e) => onNav(e, safePage + 1)}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
};
