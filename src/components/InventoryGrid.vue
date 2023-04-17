<template lang="html">
  <input type="text" placeholder="Search" class="input w-full max-w-xs mt-2 ml-2 fixed z-10" />
  <div class="grid grid-cols-12 pt-16 gap-y-5">
    <div class="mx-auto my-2" v-for="item in store.state.inventory" :key="item.name">
      <a :href="item.wikiURL" target="_blank" class="tooltip before:z-20" :data-tip="item.name">
        <img class="mb-1 hover:brightness-75 ml-1" :src="item.imgURL" />
      </a>
      <div class="flex items-center">
        <span
          class="indicator-item indicator-bottom indicator-start btn btn-xs rounded-tl rounded-bl rounded-none"
          @click="changeQuantity(item.name, -1)"
          >-</span
        >
        <span class="indicator-item indicator-bottom indicator-center bg-neutral">{{ item.quantity }}</span>
        <span
          class="indicator-item indicator-bottom indicator-end btn btn-xs rounded-tr rounded-br rounded-none"
          @click="changeQuantity(item.name, 1)"
          >+</span
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import store from "@/store";

function changeQuantity(name: string, value: number) {
  store.commit("changeQuantity", { name, value });
}
</script>
