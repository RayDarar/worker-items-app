<template>
  <table id="table">
    <thead>
      <base-table-headers :headers="headers"></base-table-headers>
    </thead>
    <tbody></tbody>
  </table>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

import BaseTableHeaders from "./BaseTableHeaders.vue";
import BaseTableRow from "./BaseTableRow.vue";
import { TableHeader } from "@/types";

@Component({
  components: {
    BaseTableHeaders,
    BaseTableRow,
  },
})
export default class BaseTable extends Vue {
  @Prop({ required: true })
  headers: TableHeader[];
}
</script>

<style lang="scss" scoped>
#table {
  width: 100%;
}
</style>
