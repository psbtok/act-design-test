<template>
  <div class="pt-[92px] mt-8 mb-8 p-8 pb-[92px]">
    <div class="text-left font-bold text-[32px]">
      Тестовая задача
    </div>
    <div v-if="!isLoaded" class="text-center">
      <p>Загрузка товаров...</p>
    </div>
    <div v-else class="grid grid-cols-6 gap-x-2 mt-2">
      <CatalogItem
        v-for="(product, index) in products"
        :key="index"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useApplicationStore } from '~/store/application';
import { storeToRefs } from 'pinia';
import CatalogItem from '~/components/catalog/catalogItem.vue';

const appStore = useApplicationStore();
const { products, isLoaded } = storeToRefs(appStore);

onMounted(async () => {
  if (products.value.length === 0) {
    await appStore.updateProducts();
  }
});
</script>
