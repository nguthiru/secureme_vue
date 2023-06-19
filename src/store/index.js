import { createStore } from 'vuex'

export default createStore({
  state: {
    email: ''
  },
  getters: {
  },
  mutations: {
    setEmail(state, email) {
      state.email = email;
    }
  },
  actions: {
    saveEmail({ commit }, email) {
      commit('setEmail', email);
    }
  },
  modules: {
  }
})
