<template>
  <div id="main-page">
    <div class="wrapper">
      <base-button>Click on me</base-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class MainPage extends Vue {}
</script>

<style lang="scss" scoped>
#main-page {
  height: 100%;
  padding: 2em 1em;
  @extend .centered;
}

.wrapper {
  width: 80%;
  height: 100%;
}
</style>
