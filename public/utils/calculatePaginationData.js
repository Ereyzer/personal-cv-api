export const calculatePaginationData = (totalItems, page, perPage) => {
    const totalPages = Math.ceil(totalItems / perPage);
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;
    return {
        page,
        perPage,
        totalItems,
        totalPages,
        hasPrevPage,
        hasNextPage,
    };
};
