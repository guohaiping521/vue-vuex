<template>
  <div class="app">
    <!-- age:{{ $store.state.age }}
    <button @click="addAge">点击</button>
    age:{{ $store.getters.getAge }}<br />
    a module:{{ $store.state.a.d }}<br />
    c:{{ $store.state.b.d }} <br />
    getD:{{ $store.getters.getD }}<br />
    get moduleA:{{ $store.getters.getD }}<br />
    <button @click="$store.commit('changeAge', 5)">同步更新root</button>
    <button @click="$store.commit('a/changeAge', 5)">同步更新a</button>
    <button @click="$store.commit('moduleA/changeAge', 5)">
      同步更新a下的modules A
    </button>
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
