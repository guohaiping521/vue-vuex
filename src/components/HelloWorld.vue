<template>
  <div class="app">
   age:{{ $store.state.age }}
    <button @click="addAge">点击</button> 
    age:{{ $store.getters.getAge }}
   <!-- <button @click="$store.commit('changeAge', 5)">同步更新</button>
    <button @click="$store.dispatch('changeAge', 5)">异步更新</button> -->
  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {
  },
  methods: {
addAge(){
  console.log("this.$store",this.$store);
  this.$store.state.age=this.$store.state.age+1
}
  }
};
</script>

<style scoped lang="less"></style>
