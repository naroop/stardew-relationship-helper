<template>
  <div class="flex justify-items-center">
    <img class="object-fit h-28" ref="img" :src="frames[currentFrame]" />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch, defineExpose } from "vue";

// const props = defineProps({
//   setMouseMove: { type: Function, required: true },
// });

const hovering: Ref<boolean> = ref(false);
const img: Ref<HTMLElement> = ref(document.createElement("div"));
const currentFrame: Ref<number> = ref(0);
const interval: Ref<number> = ref(0);
const frames: Array<string> = [
  require("@/assets/bin/bin-0.png"),
  require("@/assets/bin/bin-1.png"),
  require("@/assets/bin/bin-2.png"),
  require("@/assets/bin/bin-3.png"),
  require("@/assets/bin/bin-4.png"),
];

const startAnimation = (change: number) => {
  if (interval.value) clearInterval(interval.value);
  interval.value = setInterval(() => {
    currentFrame.value += change;
  }, 50);
};

const startHovering = () => {
  hovering.value = true;
  startAnimation(1);
};

const stopHovering = () => {
  hovering.value = false;
  startAnimation(-1);
};

watch(currentFrame, (value) => {
  currentFrame.value = Math.max(Math.min(currentFrame.value, 4), 0);
  if (value == 0 || value == 4) {
    clearInterval(interval.value);
  }
});

defineExpose({ img, hovering, startHovering, stopHovering });
</script>
