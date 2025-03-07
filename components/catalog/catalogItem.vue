<template>
  <div class="relative z-index-10">
    <div class="h-[380px] p-4 rounded-[32px] relative group border border-transparent hover-card">
      <div class="relative">
        <img
          :src="product.image"
          alt="Product Image"
          class="w-full h-64 object-cover rounded-[20px] mb-2"
        />
      </div>
      <div v-if="product.oldPrice >  product.newPrice && product.oldPrice" class="absolute top-[234px] left-[26px] w-[44px] py-1 bg-white rounded-lg flex justify-center">
        <span class="text-sm font-bold text-[#E0119D]">-{{ ((product.oldPrice - product.newPrice) / product.oldPrice * 100).toFixed(0) }}%</span>
      </div>

      <div class="flex items-center space-x-2">
        <span class="text-xl font-bold text-black">
          {{ product.newPrice }} ₽
        </span>
        <span v-if="product.oldPrice" class="text-sm text-gray-500 line-through">
          {{ product.oldPrice }} ₽
        </span>
      </div>

      <div class="font-semibold text-lg truncate">{{ product.name }}</div>

      <div class="text-sm text-black line-clamp-2 mb-4">
        {{ product.description || 'Нет описания' }}
      </div>

      <button
        class="py-2 px-4 bg-black text-white rounded-[14px] opacity-0 group-hover:opacity-100"
        @click="toggleCart"
      >
        {{ isInCart(product) ? 'Удалить' : 'В корзину' }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import type { Product } from '~/models/models';
import { useApplicationStore } from '~/store/application';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CatalogItem',
  props: {
    product: {
      type: Object as () => Product,
      required: true,
    },
  },
  setup(props) {
    const appStore = useApplicationStore();
    
    const toggleCart = () => {
      if (appStore.isInCart(props.product)) {
        appStore.removeFromCart(props.product);
      } else {
        appStore.addToCart(props.product);
      }
    };

    return {
      toggleCart,
      isInCart: appStore.isInCart,
    };
  },
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hover-card {
  box-shadow: none;
}

.hover-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border-color: white;
  background-color: white;
  position: absolute;
  z-index: 10;
  height: 446px;
  width: 100%;
}
</style>
