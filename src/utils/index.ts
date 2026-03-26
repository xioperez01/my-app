type ParamValue = string | number | boolean | undefined | null;

const buildSearchParams = (
  current: URLSearchParams,
  updates: Record<string, ParamValue>,
) => {
  const newParams = new URLSearchParams(current.toString());

  Object.entries(updates).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, String(value));
    }
  });

  return newParams.toString();
};

export { buildSearchParams };
