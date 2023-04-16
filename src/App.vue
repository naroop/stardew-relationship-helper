<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import store from "./store";

onMounted(() => {
  store.dispatch("fetchVillagers");
});
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
