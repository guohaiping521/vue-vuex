import Vue from "vue";
import Vuex from "../vuex";
//跨组件通信
Vue.use(Vuex);

export default new Vuex.Store({
  //内部会创建一个vue实例，通信用
  state: {
    //组件的状态  new Vue(data)
    age: 28,
  },
  getters: {
    //获取计算属性new Vue(computed)依赖，当依赖的值变化后重新执行
    getAge(state) {
      return state.age + 10;
    }
  },
  mutations: {
    //vue 中的方法唯一可以改状态方法（同步）
    changeAge(state, playload) {
      state.age += playload;
    }
  },
  actions: {
    //通过action中发起请求（异步）
    changeAge({ commit }, playload) {
      setTimeout(() => {
        commit("changeAge", playload);
      }, 1000);
    }
  },
  modules: {},
});
