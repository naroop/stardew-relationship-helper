<template>
  <div class="grid grid-cols-5 grid-rows-1 h-screen max-h-screen overflow-hidden p-4 gap-4" data-theme="dark">
    <div class="col-span-1 overflow-y-scroll bg-base-200 rounded shadow-md shadow-black">
      <VillagerGrid />
    </div>
    <div class="col-span-3 grid grid-rows-3 gap-4">
      <div class="row-span-2 overflow-y-scroll rounded bg-base-200 shadow-md shadow-black">
        <TrackingList />
      </div>
      <div class="row-span-1 overflow-y-scroll bg-base-200 rounded shadow-md shadow-black">
        <InventoryGrid />
      </div>
    </div>
    <div class="col-span-1 overflow-y-scroll bg-base-200 rounded shadow-md shadow-black">
      <DateTracker />
    </div>
  </div>
</template>
<script setup lang="ts">
import DateTracker from "@/components/DateTracker.vue";
import VillagerGrid from "@/components/VillagerGrid.vue";
import TrackingList from "@/components/TrackingList/TrackingList.vue";
import InventoryGrid from "@/components/InventoryGrid.vue";
</script>
