import { defineStore } from 'pinia';
import { ref, watch, onMounted } from 'vue';
import type { Product } from '~/models/models';
import { apiPath } from '~/utils/api';

const loadFromCache = <T>(key: string, defaultValue: T): T => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error('Error loading from cache:', error);
    return defaultValue;
  }
};

const saveToCache = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
};

export const useApplicationStore = defineStore('application', () => {
  const products = ref<Product[]>([]);
  const isLoaded = ref<boolean>(false);
  const cartItems = ref<Product[]>([]);

  const updateProducts = async () => {
    const cachedProducts = loadFromCache<Product[]>('cachedProducts', [])

    if (cachedProducts.length) {
      console.log('Нашли сохраненные продукты. Не делаем запрос!')
      products.value = cachedProducts
      isLoaded.value = true;
      return
    }

    if (isLoaded.value) return;

    try {
      console.log('Кеша нет. Делаем запрос!')
      const response: Product[] = await $fetch(apiPath.products);

      products.value = response;
      isLoaded.value = true;

      saveToCache('cachedProducts', response);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const addToCart = (product: Product) => {
    if (!cartItems.value.find((item) => item.id === product.id)) {
      cartItems.value.push(product);
      saveToCache('cartItems', cartItems.value);
    }
  };

  const updateCartItems = () => {
    cartItems.value = loadFromCache<Product[]>('cartItems', [])
  }

  const removeFromCart = (product: Product) => {
    cartItems.value = cartItems.value.filter((item) => item.id !== product.id);
    saveToCache('cartItems', cartItems.value);
  };

  const isInCart = (product: Product) => cartItems.value.some((item) => item.id === product.id);

  return {
    products,
    isLoaded,
    updateProducts,
    cartItems,
    addToCart,
    removeFromCart,
    isInCart,
    updateCartItems
  };
});
