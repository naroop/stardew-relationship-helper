<template lang="">
  <div class="">
    <div class="grid grid-cols-3 place-items-center gap-3 p-1">
      <div
        class="btn btn-square w-full h-full bg-base-300 shadow-sm shadow-black grid grid-rows-4"
        v-for="(villager, index) in store.state.untrackedVillagers"
        :key="villager.name"
        @click="startTracking(index)"
      >
        <img :src="villager.iconURL" :id="villager.name" class="object-contain p-2 row-span-3 mx-[auto]" />
        <p class="text-xs row-span-1">{{ villager.name }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import store from "@/store";

function startTracking(i: number) {
  store.commit("startTracking", i);
}
</script>
