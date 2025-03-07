import { generateFakeProduct } from '~/utils/generate';
import type { Product } from '~/models/models';

export default defineEventHandler((event) => {
  const products: Product[] = Array.from({ length: 12 }, () => generateFakeProduct()); 
  return products
});
