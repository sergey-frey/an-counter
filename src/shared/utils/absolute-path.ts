export const absolutePath = (path: string) => {
  return `${import.meta.env.BASE_URL}${path}`;
};
