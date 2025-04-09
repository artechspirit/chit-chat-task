export const getSingleInitialName = (name: string) => {
  return name.split("")[0].toUpperCase();
};

export const cutText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};
