<template>
  <div class="flex flex-col min-h-screen">
    <Header></Header>
    <div class="flex-grow min-h-[calc(100vh-184px)]">
      <NuxtPage />
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import Footer from './components/general/footer.vue';
import Header from './components/general/header.vue';
</script>
