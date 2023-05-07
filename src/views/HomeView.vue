<template>
  <div class="drawer">
    <input id="drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <div class="grid grid-cols-5 grid-rows-1 h-screen max-h-screen overflow-hidden p-4 gap-4" data-theme="dark">
        <div class="grid col-span-1">
          <label for="drawer" class="flex flex-col items-center btn gap-2 mb-2 bg-base-300 drawer-button">
            <font-awesome-icon icon="fa-solid fa-bars" size="xl" />
            <span class="text-lg font-bold normal-case">Stardew Relationship Helper</span>
          </label>
          <div class="overflow-y-scroll bg-base-200 rounded shadow-md shadow-black">
            <VillagerGrid />
          </div>
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
    </div>
    <div class="drawer-side">
      <label for="drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 bg-base-100 text-base-content">
        <li><a>Import Save File</a></li>
        <li><a>Reset</a></li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import DateTracker from "@/components/DateTracker.vue";
import VillagerGrid from "@/components/VillagerGrid.vue";
import TrackingList from "@/components/TrackingList/TrackingList.vue";
import InventoryGrid from "@/components/InventoryGrid.vue";
</script>
