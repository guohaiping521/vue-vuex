import applyMixin from "./mixin";
import { forEach } from "./util";
let Vue;
class Store {
    constructor(options) {
        //如果直接state定义在实例上，这个状态发生变化，视图不会更新
        //this.state= options.state;
        let state = options.state;
        this.options = options;
        this.getters = options.getters;
        let computed = {}
        //每次调用都会执行
        forEach(this.getters, (fn, key) => {
            computed[key] = () => {
                return fn(state);
            },
                Object.defineProperty(this.getters, key, {
                    enumerable: true,
                    configurable: true,
                    get() {
                        return fn(state);
                    },
                });
        });

        this._mutation = {}
        forEach(options.mutations, (fn, key) => {
            this._mutation[key] = (data) => {
                console.log("this", this);
                fn(state, data);
            };
        });

        this._actions = {}
        forEach(options.actions, (fn, key) => {
            this._actions[key] = (data) => {
                fn(this, data);
            };
        });

        //vue中定义数据，属性名是有特点的，$xxx命名的，不会代理到vue实例上
        this._vm = new Vue({
            data: {
                $$state: state,
            },
            //计算属性会将自己的属性挂载到实例上
            computed
        })
    }
    commit = (fnName, data) => {
        this._mutation[fnName](data);
    }

    dispatch = (fnName, data) => {
        this._actions[fnName](data);
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
