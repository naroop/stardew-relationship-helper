import { createStore } from "vuex";
import data from "./data.json";
import { watch } from "vue";

interface State {
  untrackedVillagers: Villager[];
  trackedVillagers: Villager[];
  inventory: Item[];
  date: Date;
  dragging: string;
}

export interface Villager {
  name: string;
  imgURL: string;
  iconURL: string;
  wikiURL: string;
  friendshipPoints: number;
  isMarried: boolean;
  loves: Item[];
}

export interface Item {
  name: string;
  wikiURL: string;
  imgURL: string;
  quantity: number;
}

export interface Date {
  season: string;
  day: number;
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
    startTracking(state: State, index: number) {
      // Remove and retrieve villager from untracked list
      const vill: Villager = removeVillager(index, state.untrackedVillagers);

      // Add villager to tracked villagers
      state.trackedVillagers.push(vill);

      // Add villager's like items to inventory
      addItemsToInventory(state.inventory, vill.loves);
    },
    stopTracking(state: State, index: number) {
      state.untrackedVillagers.push(removeVillager(index, state.trackedVillagers));
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
  (newValue, oldValue) => {
    localStorage.setItem("trackedVillagers", JSON.stringify(newValue));
  },
  {
    deep: true,
  }
);

store.watch(
  (state) => state.inventory,
  (newValue, oldValue) => {
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
      inventory.push(item);
    }
  }
}
