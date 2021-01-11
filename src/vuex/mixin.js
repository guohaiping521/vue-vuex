const applyMixin = (Vue) => {
    Vue.mixin({
        beforeCreate: vueInit
    })
}
function vueInit() {
    //vue-router 是把属性定义到根实例上，所有组件都能拿到这个跟，通过根实例获取到这个属性
    //vuex 给每个组件都定义一个$store属性，指向同一个对象
    const options = this.$options;
    if (options.store) {
        //根实例
        this.$store = options.store;
    } else if (options.parent && options.parent.$store) {
        //子组件
        this.$store = options.parent.$store;
    }

}
export default applyMixin;