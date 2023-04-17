<template lang="">
  <div class="p-3 grid grid-cols-6 gap-x-5 gap-y-2">
    <div class="col-span-3 flex justify-end">
      <img :src="seasonIcons[store.state.date.season]" class="rounded w-[50%]" />
    </div>
    <span class="col-span-3 font-bold flex items-center">{{ weekdays[(store.state.date.day - 1) % 7] }}</span>
    <select class="select w-full col-span-4 bg-secondary" v-model="store.state.date.season">
      <option>Spring</option>
      <option>Summer</option>
      <option>Fall</option>
      <option>Winter</option>
    </select>
    <input type="number" placeholder="Day" class="input w-full col-span-2 bg-secondary" @blur="checkDay" v-model="store.state.date.day" />
    <span class="text-base col-span-4">Season</span>
    <span class="text-base col-span-2">Day</span>
    <div class="col-span-6 text-center">
      <button class="btn bg-primary">Next Day</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import store from "@/store";

const seasonIcons = {
  Spring: "https://stardewvalleywiki.com/mediawiki/images/thumb/9/9c/Spring.png/24px-Spring.png",
  Summer: "https://stardewvalleywiki.com/mediawiki/images/thumb/8/85/Summer.png/24px-Summer.png",
  Fall: "https://stardewvalleywiki.com/mediawiki/images/thumb/5/5d/Fall.png/24px-Fall.png",
  Winter: "https://stardewvalleywiki.com/mediawiki/images/thumb/a/a7/Winter.png/24px-Winter.png",
};

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

watch(store.state.date, (newValue, oldValue) => {
  store.state.date.day = Math.max(1, Math.min(newValue.day, 28));
});
</script>
