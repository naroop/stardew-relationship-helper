<template lang="html">
  <div class="flex flex-col gap-3 p-2">
    <TrackingListItem
      v-for="villager in villagerList"
      :key="villager.name"
      :villager="villager"
    ></TrackingListItem>
  </div>
</template>
<script setup lang="ts">
import store, { Villager } from "@/store";
import { computed } from "vue";
import TrackingListItem from "./TrackingListItem.vue";

const villagerList = computed<Villager[]>(() => {
  return store.state.villagers.filter((villager) => villager.isTracking);
});

function stopTracking(i: number) {
  store.commit("stopTracking", villagerList.value[i].name);
}
</script>
