<template>
  <table id="table">
    <thead></thead>
    <tbody></tbody>
  </table>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component({})
export default class BaseTable extends Vue {
  @Prop({ required: true })
  headers: object[];
}
</script>

<style lang="scss" scoped>
#table {
  width: 100%;
}
</style>
