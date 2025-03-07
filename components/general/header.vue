<template>
  <div class="bg-white h-[92px] flex items-center justify-between px-8 fixed top-0 left-0 w-full z-10 shadow-lg">
    <div class="text-black text-2xl font-bold">
      Brand Name
    </div>
    <div class="flex items-center text-black text-sm">
      <Icon name="material-symbols:shopping-basket-outline" class="mr-2 text-lg" />
      <span>{{ cartCount }} {{ getItemWord(cartCount) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useApplicationStore } from '~/store/application';
import { computed, onMounted } from 'vue';

const appStore = useApplicationStore();

const cartCount = computed(() => appStore.cartItems.length);

const getItemWord = (count: number) => {
  if (count === 1) return 'товар';
  if (count >= 2 && count <= 4) return 'товара';
  return 'товаров';
};

onMounted(async () => {
  if (!appStore.cartItems.length) {
    appStore.updateCartItems();
  }
});
</script>

<style scoped>
.shadow-lg {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}
</style>
