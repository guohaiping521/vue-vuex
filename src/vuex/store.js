
import applyMixin from './mixin'
let Vue
class Store {
    constructor(options) {
        //如果直接state定义在实例上，这个状态发生变化，视图不会更新
        //this.state= options.state;
        let state = options.state;
        this.options = options;
        //vue中定义数据，属性名是有特点的，$xxx命名的，不会代理到vue实例上
        this._vm=new Vue({
            data: {
                $$state: state
            }
        })
    }
    get state(){
        console.log("vm=====",this._vm);
        return this._vm._data.$$state;
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