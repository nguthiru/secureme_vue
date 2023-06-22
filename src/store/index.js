import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    email: "",
    user: null,
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null;
    },
    isApproved(state) {
      return state.user["approved"];
    },
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    setEmail(state, email) {
      state.email = email;
    },
    setUser(state, user) {
      state.user = user;
    },
    
  },
  actions: {
    saveEmail({ commit }, email) {
      commit("setEmail", email);
    },
    populateUser({ commit }) {
      let config = {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      };
      axios
        .get("http://127.0.0.1:8000/auth/user/", config)
        .then((res) => commit("setUser", res.data))
        .catch((e) => console.log(e));
    },
    logout({commit}){
      localStorage.removeItem("token");
      commit("setUser",null)

    }
  },
  modules: {},
});
