<template>
  <div draggable="true" @mousedown="startDrag" @mouseup="stopDrag" ref="self" class="cursor-pointer">
    <slot></slot>
  </div>
  <div ref="placeholder" v-show="dragging"></div>
</template>

<script setup lang="ts">
import store from "@/store";
import { Ref, ref, defineProps, inject } from "vue";

const props = defineProps({
  name: { type: String, required: true },
});

const itemDrop: () => void = inject("itemDrop") as () => void;

const self: Ref<HTMLElement> = ref(document.createElement("div"));
const dragging: Ref<boolean> = ref(false);
const placeholder: Ref<HTMLElement> = ref(document.createElement("div"));
const start: Ref<{ x: number; y: number }> = ref({ x: 0, y: 0 });

function stopDrag() {
  itemDrop();
  store.dispatch("itemDrop");
  store.state.dragging = "";
  self.value.style.transition = "300ms";
  self.value.style.top = start.value.y + "px";
  self.value.style.left = start.value.x + "px";
  let el = self.value;
  setTimeout(() => {
    dragging.value = false;
    el.style.position = "";
    el.style.top = "";
    el.style.left = "";
    el.style.width = "";
    el.style.height = "";
    el.style.transition = "";
    el.style["z-index"] = "";
  }, 280);
  document.onmousemove = null;
}

function startDrag(e: MouseEvent) {
  dragging.value = true;
  store.state.dragging = props.name;
  const width = self.value.clientWidth;
  const height = self.value.clientHeight;
  start.value.x = self.value.getBoundingClientRect().left;
  start.value.y = self.value.getBoundingClientRect().top;
  const clickX = e.x - start.value.x;
  const clickY = e.y - start.value.y;
  self.value.style.top = start.value.y + "px";
  self.value.style.left = start.value.x + "px";
  self.value.style.position = "absolute";
  self.value.style.width = width + "px";
  self.value.style.height = height + "px";
  placeholder.value.style.width = width + "px";
  placeholder.value.style.height = height + "px";
  self.value.style["z-index"] = 100;
  document.onmousemove = (e) => {
    e.preventDefault();
    self.value.style.top = e.y - clickY + "px";
    self.value.style.left = e.x - clickX + "px";
  };
}
</script>
