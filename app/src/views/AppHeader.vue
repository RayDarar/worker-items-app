<template>
  <header id="header">
    <h1 class="title">Учет Материальных Ценностей</h1>
  </header>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class AppHeader extends Vue {}
</script>

<style lang="scss" scoped>
#header {
  height: 80px;
  background-color: $accentColor;
  @extend .centered;
  @include material-shadow($accentColor);
}

.title {
  color: $textColorLight;
  font-family: $fontTitle;
}
</style>
