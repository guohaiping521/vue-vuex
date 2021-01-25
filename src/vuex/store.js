import applyMixin from "./mixin";
import { forEach } from "./util";
import ModuleCollection from "./module/module-collection";
let Vue;
function installModule(store, rootState, path, module) {
    if (path.length > 0) {
        let parent = path.slice(0, -1).reduce((prev, cur) => {
            return prev[cur]
        }, rootState)
        Vue.set(parent, path[path.length - 1], module.state);
    }
    module.forEachMutations((mutation, key) => {//{changeAge:[]}
        store._mutations[key] = store._mutations[key] || []
        store._mutations[key].push((playload) => {//函数的包装
            mutation.call(store, module.state, playload)
        })
    })

    module.forEachActions((action, key) => {
        store._actions[key] = store._actions[key] || []
        store._actions[key].push((playload) => {//函数的包装
            action.call(store, module.state, playload)
        })
    })

    module.forEachGetters((getter, key) => {
        store._wrappedGetters.push(() => {
            getter.call(store, module.state);
        });
    })

    module.forEachChild((child, key) => {
        installModule(store, rootState, path.concat(key), child);
    })
}
class Store {
    constructor(options) {
        //1.收集用户传入的参数，树形结构
        this._modules = new ModuleCollection(options);
        //2.安装模块，属性定义在store上
        let state = this._modules.root.state
        this._mutations = [];
        this._actions = [];
        this._wrappedGetters = [];
        installModule(this, state, [], this._modules.root);
        console.log("state===", state);
        //如果直接state定义在实例上，这个状态发生变化，视图不会更新
        //this.state= options.state;
        // let state = options.state;
        // this.options = options;
        // this.getters = options.getters;
        // let computed = {}
        // //每次调用都会执行
        // forEach(this.getters, (fn, key) => {
        //     computed[key] = () => {
        //         return fn(state);
        //     },
        //         Object.defineProperty(this.getters, key, {
        //             enumerable: true,
        //             configurable: true,
        //             get() {
        //                 return fn(state);
        //             },
        //         });
        // });

        // this._mutation = {}
        // forEach(options.mutations, (fn, key) => {
        //     this._mutation[key] = (data) => {
        //         console.log("this", this);
        //         fn(state, data);
        //     };
        // });

        // this._actions = {}
        // forEach(options.actions, (fn, key) => {
        //     this._actions[key] = (data) => {
        //         fn(this, data);
        //     };
        // });

        // //vue中定义数据，属性名是有特点的，$xxx命名的，不会代理到vue实例上
        // this._vm = new Vue({
        //     data: {
        //         $$state: state,
        //     },
        //     //计算属性会将自己的属性挂载到实例上
        //     computed
        // })
    }
    commit = (fnName, data) => {
        this._mutations[fnName].forEach(fn => {
            fn(data);
        });
    }

    dispatch = (fnName, data) => {
        this._actions[fnName].forEach(fn => {
            fn(data);
        });
    }
    get state() {
        return this._vm._data.$$state;
    }
}
//vue-router 调用install目的，注册了全局组件，注册原型方法，mixin=>router 实例绑定给了所有的组件
const install = (_Vue) => {
    Vue = _Vue;
    applyMixin(Vue);
};

export { Store, install };
