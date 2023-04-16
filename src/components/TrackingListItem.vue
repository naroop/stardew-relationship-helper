<template lang="html">
  <div
    class="grid grid-cols-12 bg-slate-700 rounded shadow-md shadow-slate-900"
  >
    <img
      class="col-span-2 object-contain"
      :src="props.villager.src"
      :id="props.villager.name + 'Image'"
    />
    <div class="col-span-4 grid grid-rows-2">
      <h1 class="row-span-1 text-3xl font-bold flex items-end">
        {{
          props.villager.name.charAt(0).toUpperCase() +
          props.villager.name.slice(1)
        }}
      </h1>
      <div class="row-span-1 flex flex-row items-center">
        <img class="object-contain h-9" src="@/assets/heart-icon.webp" />
        <h1 class="text-3xl flex items-center">{{ props.villager.hearts }}</h1>
      </div>
    </div>
    <div class="col-span-4 flex items-center">
      <img
        class="col-span-2 object-contain"
        src="@/assets/prismatic-shard.png"
        :id="props.villager.name + 'Image'"
      />
    </div>
    <div class="col-span-2 flex items-end justify-end">
      <button class="btn btn-xs rounded-br rounded-none">Edit</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Villager } from "@/store";
import { defineProps } from "vue";

const props = defineProps({
  villager: { type: Villager, required: true },
});
</script>
