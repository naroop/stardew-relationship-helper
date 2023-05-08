<template lang="html">
  <div class="flex flex-col gap-3 p-2">
    <TrackingListItem v-for="villager in store.state.trackedVillagers" :key="villager.name" :villager="villager"></TrackingListItem>
  </div>
</template>
<script setup lang="ts">
import store from "@/store";
import TrackingListItem from "./TrackingListItem.vue";

function stopTracking(i: number) {
  store.commit("stopTracking", store.state.trackedVillagers[i].name);
}
</script>
