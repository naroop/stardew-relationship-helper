<template lang="html">
  <div class="flex flex-col gap-3 p-2">
    <TrackingListItem
      v-for="(villager, index) in store.state.trackedVillagers"
      :key="villager.name"
      :villager="villager"
      :index="index"
    ></TrackingListItem>
  </div>
</template>
<script setup lang="ts">
import store from "@/store";
import TrackingListItem from "./TrackingListItem.vue";
</script>
