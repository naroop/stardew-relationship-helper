import { createStore } from "vuex";
import data from "./data.json";
import { Item, Villager, StardewDate } from "@/models/index";

interface State {
  untrackedVillagers: Villager[];
  trackedVillagers: Villager[];
  inventory: Item[];
  date: StardewDate;
  dragging: string;
}

const store = createStore<State>({
  state: {
    untrackedVillagers: [],
    trackedVillagers: [],
    inventory: [],
    date: { season: "Spring", day: 1 },
    dragging: "",
  },
  getters: {},
  mutations: {
    initVillagers(state: State) {
      data.forEach((villager) => villager.loves.sort((item1, item2) => (item1.name > item2.name ? 1 : -1)));

      const localTrackedVillagers = localStorage.getItem("trackedVillagers");
      if (localTrackedVillagers) {
        state.trackedVillagers = JSON.parse(localTrackedVillagers) as Villager[];
        state.untrackedVillagers = (data as Villager[]).filter((villager) => !state.trackedVillagers.find((v) => v.name === villager.name));
      } else {
        state.untrackedVillagers = data as Villager[];
      }
      const localInventory = localStorage.getItem("inventory");
      state.inventory = localInventory ? JSON.parse(localInventory) : [];
    },
    reset(state: State) {
      data.forEach((villager) => villager.loves.sort((item1, item2) => (item1.name > item2.name ? 1 : -1)));
      state.untrackedVillagers = data as Villager[];
      state.trackedVillagers = [];
      state.inventory = [];
      state.date = { season: "Spring", day: 1 };
    },
    addSaveFileData(state: State, saveData: [{ name: string; friendshipPoints: number; status: string }]) {
      state.trackedVillagers.forEach((trackedVillager) => {
        trackedVillager.friendshipPoints = saveData.find((villager) => villager.name === trackedVillager.name)!.friendshipPoints;
      });
      console.log(state.trackedVillagers);
    },
    startTracking(state: State, index: number) {
      const vill: Villager = removeVillager(index, state.untrackedVillagers);
      state.trackedVillagers.push(vill);
      addItemsToInventory(state.inventory, vill.loves);
    },
    stopTracking(state: State, index: number) {
      const vill: Villager = removeVillager(index, state.trackedVillagers);
      state.untrackedVillagers.push(vill);
      state.untrackedVillagers.sort((a, b) => (a.name > b.name ? 1 : -1));
      removeItemsFromInventory(state.inventory, vill.loves);
    },
    changeQuantity(state: State, params: { name: string; value: number }) {
      const item = state.inventory.find((item) => item.name === params.name);
      if (item) {
        item.quantity += params.value;
      }
    },
    giveItem(state: State, villagerName: string) {
      const villager = state.trackedVillagers.find((v) => v.name === villagerName);
      if (villager) villager.name = state.dragging;
    },
  },
  modules: {},
});

export default store;

store.watch(
  (state) => state.trackedVillagers,
  (newValue) => {
    localStorage.setItem("trackedVillagers", JSON.stringify(newValue));
  },
  {
    deep: true,
  }
);

store.watch(
  (state) => state.inventory,
  (newValue) => {
    localStorage.setItem("inventory", JSON.stringify(newValue));
  },
  {
    deep: true,
  }
);

function removeVillager(index: number, arr: Villager[]): Villager {
  const villager = arr[index];
  arr.splice(index, 1);
  return villager;
}

function addItemsToInventory(inventory: Item[], itemsToAdd: Item[]) {
  for (const item of itemsToAdd) {
    item.quantity = 0;
    if (!inventory.some((existingItem) => existingItem.name === item.name)) {
      item.loveCount = 1;
      inventory.push(item);
    } else {
      inventory[inventory.findIndex((invItem) => invItem.name === item.name)].loveCount++;
    }
  }
}

function removeItemsFromInventory(inventory: Item[], itemsToRemove: Item[]) {
  for (const item of itemsToRemove) {
    for (let i = 0; i < inventory.length; i++) {
      if (item.name === inventory[i].name) {
        if (inventory[i].loveCount === 1) {
          inventory.splice(i, 1);
        } else {
          inventory[i].loveCount--;
        }
      }
    }
  }
}
