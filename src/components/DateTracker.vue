<template lang="">
  <div class="p-3 grid grid-cols-6 gap-x-5 gap-y-2">
    <div class="col-span-6 flex mb-1">
      <img :src="seasonIcons[store.state.date.season]" class="rounded w-[15%] ml-2" />
      <span class="font-bold flex items-center ml-3">{{ weekdays[(store.state.date.day - 1) % 7] }}</span>
    </div>
    <span class="text-base col-span-4 pl-2">Season</span>
    <span class="text-base col-span-2 pl-2">Day</span>
    <select class="select w-full col-span-4" v-model="store.state.date.season">
      <option>{{ Season.SPRING }}</option>
      <option>{{ Season.SUMMER }}</option>
      <option>{{ Season.FALL }}</option>
      <option>{{ Season.WINTER }}</option>
    </select>
    <input type="number" placeholder="Day" class="input w-full col-span-2" @blur="checkDay" v-model="store.state.date.day" />

    <div class="col-span-6 text-center">
      <button class="btn bg-primary btn-block mt-2">Next Day</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import store from "@/store";
import { Season } from "@/models";

const seasonIcons = {
  Spring: "https://stardewvalleywiki.com/mediawiki/images/thumb/9/9c/Spring.png/24px-Spring.png",
  Summer: "https://stardewvalleywiki.com/mediawiki/images/thumb/8/85/Summer.png/24px-Summer.png",
  Fall: "https://stardewvalleywiki.com/mediawiki/images/thumb/5/5d/Fall.png/24px-Fall.png",
  Winter: "https://stardewvalleywiki.com/mediawiki/images/thumb/a/a7/Winter.png/24px-Winter.png",
};

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

watch(store.state.date, (value) => {
  store.state.date.day = Math.max(1, Math.min(value.day, 28));
});
</script>
