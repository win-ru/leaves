import Vue from 'vue'
import Vuex from 'vuex'
import API_connector from "@/utils/connector";

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  state: {
    api: new API_connector(),
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },

  strict: debug

})
