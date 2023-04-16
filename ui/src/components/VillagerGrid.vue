<template lang="">
  <div class="">
    <div class="grid grid-cols-3 place-items-center gap-3 p-1">
      <img
        v-for="(villager, index) in villagerList"
        :key="villager.name"
        :src="villager.src"
        :id="villager.name"
        class="btn btn-square btn-lg object-contain bg-slate-600 shadow-sm shadow-black"
        @click="startTracking(index)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import store, { Villager } from "@/store";
import { computed } from "vue";

const villagerList = computed<Villager[]>(() => {
  return store.state.villagers.filter((villager) => !villager.isTracking);
});

function startTracking(i: number) {
  store.commit("startTracking", villagerList.value[i].name);
}
</script>
