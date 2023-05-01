<template>
  <div draggable="true" @mousedown="startDrag" @mouseup="stopDrag" ref="self" class="cursor-pointer">
    <slot></slot>
  </div>
  <div ref="placeholder" v-show="dragging"></div>
</template>

<script setup lang="ts">
import { Ref, ref, defineProps } from "vue";
import store from "@/store";

const props = defineProps({
  name: { type: String, required: true },
});

const self: Ref<Element> | Ref<any> = ref(null);
const dragging: Ref<boolean> = ref(false);
const placeholder: Ref<Element> | Ref<any> = ref(null);
const start: Ref<any> = ref({ x: null, y: null });

function stopDrag() {
  store.state.dragging = "";
  self.value.style.transition = "300ms";
  self.value.style.top = start.value.y + "px";
  self.value.style.left = start.value.x + "px";
  setTimeout(() => {
    dragging.value = false;
    self.value.style.position = "static";
    self.value.style.top = null;
    self.value.style.left = null;
    self.value.style.width = null;
    self.value.style.height = null;
    self.value.style.transition = null;
    self.value.style["z-index"] = null;
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
