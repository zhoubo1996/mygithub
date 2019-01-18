import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    message: "vue权威指南",
    testMsg: "原始文本",
    childText: "子组件原始文本",
    name: "weish",
    age: 22,
    count: 1,
    show: false
  },
  getters: {
    count: state => {
      return (state.count += 10);
    },
    personInfo: state => {
      return `My name is ${state.name}, I am ${state.age}`;
    }
  },
  actions: {
    addPlus(context) {
      context.commit("add");
    },
    reducePlus(context) {
      context.commit("reduce");
    }
  },
  mutations: {
    switch_color(state) {
      state.show = state.show ? false : true;
    },
    add(state) {
      state.count += 1;
    },
    reduce(state) {
      state.count -= 1;
    }
  }
});

export default store;
