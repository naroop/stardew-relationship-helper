<template>
  <div class="col-span-1 bg-secondary m-3 rounded" ref="bin"></div>
</template>

<script setup lang="ts">
import { ref, defineEmits, Ref } from "vue";

const emit = defineEmits(["hover"]);

const hovering: Ref<boolean> = ref(false);
const bin: Ref<HTMLElement> = ref(new HTMLElement());

window.onmousemove = (e) => {
  let rect = bin.value.getBoundingClientRect();
  if (e.x <= rect.right && e.x >= rect.left && e.y >= rect.top && e.y <= rect.bottom) {
    if (!hovering.value) {
      hovering.value = true;
      emit("hover", true);
    }
  } else if (hovering.value) {
    hovering.value = false;
    emit("hover", false);
  }
};
</script>
