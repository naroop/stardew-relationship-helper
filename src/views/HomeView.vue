<template>
  <div
    class="grid grid-cols-5 grid-rows-1 h-screen max-h-screen overflow-hidden p-4 gap-4"
  >
    <div
      class="col-span-1 overflow-y-scroll bg-slate-800 rounded shadow-md shadow-slate-900"
    >
      <VillagerGrid />
    </div>
    <div class="col-span-3 grid grid-rows-3 gap-4">
      <div
        class="row-span-2 overflow-y-scroll rounded bg-slate-800 shadow-md shadow-slate-900"
      >
        <TrackingList />
      </div>
      <div
        class="row-span-1 overflow-y-scroll bg-slate-800 rounded shadow-md shadow-slate-900"
      ></div>
    </div>
    <div
      class="col-span-1 overflow-y-scroll bg-slate-800 rounded shadow-md shadow-slate-900"
    ></div>
  </div>
</template>
<script setup lang="ts">
import DateTracker from "@/components/DateTracker.vue";
import VillagerGrid from "@/components/VillagerGrid.vue";
import TrackingList from "@/components/TrackingList.vue";
import GiftGrid from "@/components/GiftGrid.vue";
</script>
