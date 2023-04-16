import { createStore } from "vuex";

interface State {
  villagers: Villager[];
}

export class Villager {
  name = "";
  src = "";
  hearts = 5;
  isTracking = false;
}

export default createStore<State>({
  state: {
    villagers: [],
  },
  getters: {},
  mutations: {
    initVillagers(state: State, villagers: Villager[]) {
      state.villagers = villagers;
    },
    startTracking(state: State, name: string) {
      state.villagers.forEach((villager) => {
        if (villager.name == name) {
          villager.isTracking = true;
        }
      });
    },
    stop(state: State, name: string) {
      state.villagers.forEach((villager) => {
        if (villager.name == name) {
          villager.isTracking = false;
        }
      });
    },
  },
  actions: {
    fetchVillagers({ commit }) {
      const villagers: Villager[] = [];
      const imageFiles = require.context(
        "@/assets/villagers",
        false,
        /\.(png)$/
      );
      imageFiles.keys().forEach((key) => {
        const n: Villager = new Villager();
        n.name = key.replace("./", "").replace(".png", "");
        n.src = imageFiles(key);
        villagers.push(n);
      });
      commit("initVillagers", villagers);
    },
  },
  modules: {},
});
