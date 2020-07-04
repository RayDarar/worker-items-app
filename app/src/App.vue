<template>
  <div id="app">
    <header class="header"></header>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class App extends Vue {}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
  box-sizing: border-box;
}

#app {
  width: 100vw;
  height: 100vh;
}
</style>
