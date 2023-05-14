<template>
  <div :class="['modal', modalOpen ? 'modal-open' : '']">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Import Save File</h3>
      <p class="py-4">Import a save file to automatically load in your friendship points, current in-game date, and item quantities.</p>
      <p class="text-sm italic">Note: friendship points and item quantities will only update for the villagers you are currently tracking.</p>
      <div class="divider"></div>
      <div class="tabs">
        <a
          :class="[
            'tab tab-lifted border-none [--tab-border-color:hsl(var(--b1))]',
            activeTab === 'apple' ? 'tab-active !bg-base-200 [--tab-bg:hsl(var(--b2))] border' : '',
          ]"
          @click="tabPressed('apple')"
        >
          <font-awesome-icon icon="fa-brands fa-apple" size="xl" />
        </a>
        <a
          :class="[
            'tab tab-lifted border-none [--tab-border-color:hsl(var(--b1))]',
            activeTab === 'windows' ? 'tab-active !bg-base-200 [--tab-bg:hsl(var(--b2))]' : '',
          ]"
          @click="tabPressed('windows')"
        >
          <font-awesome-icon icon="fa-brands fa-windows" size="lg" />
        </a>
      </div>
      <div v-if="activeTab === 'apple'" class="bg-base-200 rounded-e-lg rounded-bl-lg">
        <ul class="space-y-3 p-3">
          <li>1. Open Finder and select "Go" in the upper menu bar.</li>

          <li>2. In the "Go" menu, select "Go to Folder"</li>
          <li>3. Enter the following file path:</li>
          <li><code class="bg-base-300 ml-4">~/.config/StardewValley/Saves</code></li>
          <li>4. Select a save folder, and choose the file that takes the following format:</li>
          <li><code class="bg-base-300 ml-4">{player name}_{lots of numbers}</code></li>
          <li>5. Submit the file down below.</li>
        </ul>
      </div>
      <div v-else-if="activeTab === 'windows'" class="bg-base-200 rounded-lg">
        <ul class="space-y-3 p-3">
          <li class="flex items-center">
            1. Press
            <kbd class="kbd mx-2"><font-awesome-icon icon="fa-brands fa-windows" /></kbd> + <kbd class="kbd mx-2">r</kbd> to open "Run"
          </li>
          <li>2. In the resulting text field, enter the following file path:</li>
          <li><code class="bg-base-300 ml-4">%appdata%\StardewValley\Saves</code></li>
          <li>3. Select a save folder, and choose the file that takes the following format:</li>
          <li><code class="bg-base-300 ml-4">{player name}_{lots of numbers}</code></li>
          <li>4. Submit the file down below.</li>
        </ul>
      </div>
      <div class="mt-3"></div>
      <a class="text-sm italic hover:brightness-75" href="https://stardewvalleywiki.com/Saves" target="_blank">
        Click here if you are unable to locate your save file based on the provided instructions.
      </a>
      <div class="modal-action flex justify-between">
        <input
          type="file"
          :class="['file-input w-full max-w-xs bg-base-200 hover:brightness-90', fileError ? 'input-error' : '']"
          @change="handleFileUpload"
        />
        <label for="my-modal" :class="['btn', isFileLoading ? 'loading' : '']" @click="submitSaveFile">Import</label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { Ref, ref, defineExpose } from "vue";
import { XMLParser } from "fast-xml-parser";
import { Season, StardewDate } from "@/models";

const modalOpen = ref(false);
const activeTab = ref("apple");
const isFileLoading = ref(false);
const fileError = ref(false);
const saveFile: Ref<File | null> = ref(null);

function open() {
  modalOpen.value = true;
}

function close() {
  modalOpen.value = false;
}

function tabPressed(os: string) {
  switch (os) {
    case "apple":
      activeTab.value = "apple";
      break;
    case "windows":
      activeTab.value = "windows";
      break;
  }
}

function handleFileUpload(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement.files) {
    const file = inputElement.files[0];
    saveFile.value = file;
    fileError.value = false;
  }
}

function submitSaveFile() {
  if (!saveFile.value) {
    fileError.value = true;
    return;
  }
  isFileLoading.value = true;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const xml = event.target?.result;
      const parser = new XMLParser();
      const parsedXML = parser.parse(xml);

      const friendshipData = parsedXML.SaveGame.player.friendshipData.item;
      const day = parsedXML.SaveGame.player.dayOfMonthForSaveGame;
      const season = parsedXML.SaveGame.player.seasonForSaveGame;
      store.commit("addSaveFileData", transformData(friendshipData, season, day));
      isFileLoading.value = false;
      close();
    } catch (error) {
      console.log(error);
      fileError.value = true;
      isFileLoading.value = false;
    }
  };

  reader.readAsText(saveFile.value);
}

function transformData(dataArray: [], season: number, day: number) {
  const friendshipData = dataArray.map((entry) => {
    const { key, value } = entry;
    const { string: name } = key;
    const { Friendship: friendship } = value;
    const { Points: friendshipPoints, Status: status } = friendship;
    return { name, friendshipPoints, status };
  });

  return { friendshipData: friendshipData, date: { season: convertSeasonToString(season), day: day } };
}

function convertSeasonToString(season: number) {
  switch (season) {
    case 1:
      return Season.SPRING;
    case 2:
      return Season.SUMMER;
    case 3:
      return Season.FALL;
    case 4:
      return Season.WINTER;
  }
}

defineExpose({ open, close });
</script>
