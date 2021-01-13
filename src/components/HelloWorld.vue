<template>
  <div class="app">
    age:{{ $store.state.age }}
    <button @click="addAge">点击</button>
    age:{{ $store.getters.getAge }} 
    <br/>
     getChildAge:{{ $store.state.childAge }}
    getChildAge::{{
      $store.getters.getChildAge
    }}
      <button @click="addChildAge">点击</button>
    <!-- <button @click="$store.commit('changeAge', 5)">同步更新</button>
    <button @click="$store.dispatch('changeAge', 5)">异步更新</button> -->
  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {},
  methods: {
    addAge() {
      this.$store.state.age = this.$store.state.age + 1;
    },
    addChildAge() {
      this.$store.state.childAge = this.$store.state.childAge + 1;
    },
  },
};
</script>

<style scoped lang="less"></style>
