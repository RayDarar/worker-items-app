<template>
  <div id="app">
    <app-header class="header"></app-header>
    <router-view class="content"></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import AppHeader from "./views/AppHeader.vue";

@Component({
  components: {
    AppHeader,
  },
})
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
  @extend .column-container;
}
</style>
