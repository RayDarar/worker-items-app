<template>
  <header id="header"></header>
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
}
</style>
