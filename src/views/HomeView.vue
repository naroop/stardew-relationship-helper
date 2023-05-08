<template>
  <div class="drawer">
    <input id="drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <div class="grid grid-cols-5 grid-rows-1 h-screen max-h-screen p-4 gap-4" data-theme="dark">
        <div class="col-span-1 flex flex-col">
          <label for="drawer" class="h-10 mb-2 flex flex-nowrap items-center btn gap-5 bg-base-300 drawer-button">
            <img class="object-contain h-4/5" src="https://stardewvalleywiki.com/mediawiki/images/6/61/Blue_Chicken.png" />
            <span class="text-lg font-bold normal-case overflow-hidden whitespace-nowrap">Stardew Relationship Helper</span>
          </label>
          <div class="flex-1 overflow-y-scroll bg-base-200 rounded shadow-md shadow-black">
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
        <li class="menu-title">
          <span>Actions</span>
        </li>
        <li><label @click="openModal">Import Save File</label></li>
        <li><a @click="store.commit('reset')">Reset</a></li>
      </ul>
    </div>
    <ImportSaveModal ref="importSaveModal" />
  </div>
</template>
<script setup lang="ts">
import DateTracker from "@/components/DateTracker.vue";
import VillagerGrid from "@/components/VillagerGrid.vue";
import TrackingList from "@/components/TrackingList/TrackingList.vue";
import InventoryGrid from "@/components/InventoryGrid.vue";
import ImportSaveModal from "@/components/ImportSaveModal.vue";
import store from "@/store";
import { Ref, ref } from "vue";

const importSaveModal: Ref<typeof ImportSaveModal | null> = ref(null);

function openModal() {
  importSaveModal.value?.open();
}
</script>
