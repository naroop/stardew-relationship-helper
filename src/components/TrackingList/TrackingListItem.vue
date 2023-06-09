<template lang="html">
  <div class="grid grid-cols-12 bg-base-300 rounded shadow-md shadow-black" ref="listItem">
    <a class="col-span-2 hover:brightness-75" target="_blank" :href="props.villager.wikiURL">
      <img class="object-contain" :src="props.villager.imgURL" :id="props.villager.name + 'Image'" />
    </a>
    <div class="col-span-2 grid grid-rows-2">
      <h1 class="row-span-1 text-3xl font-bold flex items-end">
        {{ props.villager.name.charAt(0).toUpperCase() + props.villager.name.slice(1) }}
      </h1>
      <div class="row-span-1 flex items-center">
        <img class="object-contain mt-1" src="@/assets/heart-icon.webp" />
        <h1 class="text-3xl font-bold ml-1">
          {{ isNaN(Math.floor(props.villager.friendshipPoints / 250)) ? 0 : Math.floor(props.villager.friendshipPoints / 250) }}
        </h1>
        <img class="object-contain h-9 ml-3" v-if="villager.isMarried" src="@/assets/mermaids-pendant.png" />
      </div>
    </div>
    <ShippingBin ref="bin" class="col-span-1" />
    <div class="col-span-6 grid grid-rows-2 py-2 gap-y-4">
      <div class="row-span-1 flex flex-row">
        <DraggableItem
          v-for="item in store.state.inventory.filter((i) => villager.loves.some((j) => i.name === j.name) && i.quantity > 0)"
          :key="item.name"
          :name="item.name"
        >
          <img class="object-contain h-full" :src="item.imgURL" draggable="false" />
        </DraggableItem>
      </div>
      <div class="row-span-1 flex flex-row h-full">
        <img
          class="brightness-50 object-contain"
          v-for="item in store.state.inventory.filter((i) => villager.loves.some((j) => i.name === j.name) && i.quantity === 0)"
          :key="item.name"
          :src="item.imgURL"
        />
      </div>
    </div>
    <div class="col-span-1 flex flex-col justify-between items-end">
      <font-awesome-icon
        :class="['p-2 text-warning', areDatesEqual(villager.birthday, store.state.date) ? 'block' : 'invisible']"
        icon="fa-solid fa-cake-candles"
        beat-fade
        size="xl"
      />
      <button class="btn btn-xs rounded-br rounded-tl rounded-none text-error" @click="stopTracking">
        <font-awesome-icon icon="fa-solid fa-xmark" size="lg" />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { StardewDate, Villager } from "@/models";
import { defineProps, ref, defineExpose } from "vue";
import type { Ref } from "vue";
import store from "@/store";
import DraggableItem from "../DraggableItem.vue";
import ShippingBin from "../TrackingList/ShippingBin.vue";

const bin: Ref<typeof ShippingBin> = ref(ShippingBin);

const props = defineProps({
  villager: { type: Object as () => Villager, required: true },
  index: { type: Number, required: true },
});

function stopTracking() {
  store.commit("stopTracking", props.index);
  console.log(props.villager.birthday, store.state.date);
}

function areDatesEqual(date1: StardewDate, date2: StardewDate) {
  return date1.day === date2.day && date1.season === date2.season ? true : false;
}

defineExpose({ bin, villager: props.villager });
</script>
