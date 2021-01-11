
import applyMixin from './mixin'
let Vue
class Store {
    constructor(options) {
        let state = options.state;
        this.options = options;
        new Vue({
            data: {
                state: state
            }
        })
    }
}
//vue-router 调用install目的，注册了全局组件，注册原型方法，mixin=>router 实例绑定给了所有的组件
const install = (_Vue) => {
    Vue = _Vue;
    applyMixin(Vue);
}

export {
    Store,
    install
}