export const urlBuilder = (path: string): string => {
  return (import.meta.env.VITE_NODE_ENV === "development") ? path : `${import.meta.env.VITE_API_URL}/api/`;
}