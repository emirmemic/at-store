import { ProductResponse } from './types';

export const formatScreenSize = (screenSize: string) => {
  return `${parseFloat(screenSize.replace(/[^0-9.]/g, ''))} inch`;
};

export const makeSpecsArray = (product: ProductResponse): string[] => {
  const specs = [];
  if (product.screenSize) specs.push(formatScreenSize(product.screenSize));
  if (product.memory)
    specs.push(`${product.memory.value}${product.memory.unit}`);
  if (product.ram) specs.push(`${product.ram.value}${product.ram.unit}`);
  if (product.chip) specs.push(product.chip.name);
  if (product.numberOfCores) specs.push(`${product.numberOfCores} cores`);
  if (product.ancModel) specs.push(product.ancModel);
  if (product.keyboard) specs.push(product.keyboard);
  if (product.material) specs.push(product.material);
  if (product.braceletSize) specs.push(product.braceletSize);
  if (product.color) specs.push(product.color.name);
  if (product.brand) specs.push(product.brand.name);
  return specs.slice(0, 4);
};

export const formatPrice = (price: number) => {
  return price.toLocaleString('de-DE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};
