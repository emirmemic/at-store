export const formatScreenSize = (screenSize: string) => {
  return `${parseFloat(screenSize.replace(/[^0-9.]/g, ''))} inch`;
};
