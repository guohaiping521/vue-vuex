import Vue from "vue";
import Vuex from "../vuex";
//跨组件通信
Vue.use(Vuex);

export default new Vuex.Store({
  //根模块
  //内部会创建一个vue实例，通信用
  state: {
    //组件的状态  new Vue(data)
    age: 28,
    childAge: 0
  },
  getters: {
    //获取计算属性new Vue(computed)依赖，当依赖的值变化后重新执行
    getAge(state) {
      return state.age + 10;
    },
    getChildAge(state) {
      return state.childAge + 10;
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
  modules: {
    a: {
      state: {
        d: 48
      },
      mutations: {
        changeAge(state, playload, rootState) {
          state.d += playload;
        }
      },
      actions: {
        changeAge({ state, commit, rootState }) {
          state.d += rootState.age;
        }
      },
      modules: {
        moduleA: {
          state: {
            e: 500
          }
        },
        mutations: {
          changeAge(state, playload) {
            state.e += playload;
          }
        },
      }
    }, b: {
      state: {
        d: 28
      },
      getters: {
        getD(state) {
          return state.d + 10;
        }
      },
      mutations: {
        changeAge(state, playload) {
          state.c += playload;
        }
      },

    }
  },
});
//1.默认模块没有作用域问题
//2.状态不要和模块的名称相同
//3.计算属性直接通过getts取值
//4.如果增加namespaced: true会将这个模块的属性都封装在作用域下