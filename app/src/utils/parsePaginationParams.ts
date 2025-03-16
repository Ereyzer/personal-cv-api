export const parseNumber = (number: string | unknown, defaultValue: number): number => {
  if (typeof number !== 'string') return defaultValue;
  const parsedNumber: number = parseInt(number);
  if (Number.isNaN(parsedNumber)) return defaultValue;
  if (parsedNumber < 0) return defaultValue;
  return parsedNumber;
};

export const parsePaginationParams = (query: {
  page: string;
  perPage: string;
}): { page: number; perPage: number } => {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 5);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
