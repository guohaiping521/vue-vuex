<template>
  <div class="app">
    age:{{ $store.state.age }}
    <button @click="$store.state.age + 1">点击</button>
    <!--age:{{ $store.getters.getAge }}
    <button @click="$store.commit('changeAge', 5)">同步更新</button>
    <button @click="$store.dispatch('changeAge', 5)">异步更新</button> -->
  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {
    console.log("this mounted-----", this.$store);
  },
};
</script>

<style scoped lang="less"></style>
