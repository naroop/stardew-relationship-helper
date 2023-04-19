<template lang="html">
  <div class="grid grid-cols-12 bg-base-300 rounded shadow-md shadow-black">
    <a class="col-span-2 hover:brightness-75" target="_blank" :href="props.villager.wikiURL">
      <img class="object-contain" :src="props.villager.imgURL" :id="props.villager.name + 'Image'" />
    </a>
    <div class="col-span-2 grid grid-rows-2">
      <h1 class="row-span-1 text-3xl font-bold flex items-end">
        {{ props.villager.name.charAt(0).toUpperCase() + props.villager.name.slice(1) }}
      </h1>
      <div class="row-span-1 flex flex-row items-center">
        <img class="object-contain h-9" src="@/assets/heart-icon.webp" />
        <h1 class="text-4xl flex items-center ml-1 pb-1">{{ props.villager.hearts }}</h1>
        <img class="object-contain h-9 ml-3" v-if="villager.isMarried" src="@/assets/mermaids-pendant.png" />
      </div>
    </div>
    <div
      class="col-span-1 bg-secondary m-3 rounded"
      @dragover="(e) => store.state.dragging && e.preventDefault()"
      @drop="store.state.dragging && itemDrop()"
    ></div>
    <div class="col-span-6 grid grid-rows-2">
      <div class="row-span-1 flex flex-row">
        <img
          class="object-contain h-4/5"
          v-for="(item, i) in store.state.inventory.filter((i) => villager.loves.some((j) => i.name === j.name) && i.quantity > 0)"
          :key="item.name"
          :src="item.imgURL"
          ref="items"
          draggable="false"
          @mousedown="startDrag(i)"
          @mouseup="stopDrag()"
        />
      </div>
      <div class="row-span-1 flex flex-row">
        <img
          class="brightness-50 object-contain h-4/5"
          v-for="item in store.state.inventory.filter((i) => villager.loves.some((j) => i.name === j.name) && i.quantity === 0)"
          :key="item.name"
          :src="item.imgURL"
        />
      </div>
    </div>
    <div class="col-span-1 flex flex-col justify-between items-end">
      <img class="w-10 pt-1 pr-1" src="https://stardewvalleywiki.com/mediawiki/images/3/32/Pink_Cake.png" />
      <button class="btn btn-xs rounded-br rounded-none">Edit</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Villager } from "@/store";
import { defineProps, ref } from "vue";
import store from "@/store";

const items = ref(null);
const drag = ref({
  start: { x: null, y: null },
  el: null,
});

function itemDrop() {
  store.commit("giveItem", props.villager.name);
  store.commit("changeQuantity", { name: store.state.dragging, value: -1 });
}

function stopDrag() {
  drag.value.el.style.transition = "300ms";
  drag.value.el.style.top = drag.value.start.y + "px";
  drag.value.el.style.left = drag.value.start.x + "px";
  setTimeout(() => {
    drag.value.el.style.position = "static";
    drag.value.el.style.top = null;
    drag.value.el.style.left = null;
    drag.value.el.style.transition = null;
    drag.value.el.style["z-index"] = null;
    drag.value.el = null;
    drag.value.start = { x: null, y: null };
  }, 280);
  document.onmousemove = null;
}

function startDrag(i: number) {
  const item = items.value[i];
  const width = items.value[i].clientWidth;
  const height = items.value[i].clientHeight;
  drag.value.start.x = items.value[i].getBoundingClientRect().left;
  drag.value.start.y = items.value[i].getBoundingClientRect().top;
  drag.value.el = item;
  item.style.top = drag.value.start.y + "px";
  item.style.left = drag.value.start.x + "px";
  item.style.position = "absolute";
  item.style.width = width + "px";
  item.style.height = height + "px";
  item.style["z-index"] = 100;
  document.onmousemove = (e) => {
    e.preventDefault();
    item.style.top = e.y - height / 2 + "px";
    item.style.left = e.x - width / 2 + "px";
  };
}

const props = defineProps({
  villager: { type: Object as () => Villager, required: true },
});
</script>
