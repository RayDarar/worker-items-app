<template>
  <table id="table">
    <thead>
      <base-table-headers :headers="headers"></base-table-headers>
    </thead>
    <tbody>
      <base-table-row
        v-for="item in parsedItems"
        :key="item.id"
        :item="item"
        :headers="headers"
        :selection-id="selectedId"
        @click.native="updateSelection(item.id)"
      ></base-table-row>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

import BaseTableHeaders from "./BaseTableHeaders.vue";
import BaseTableRow from "./BaseTableRow.vue";
import { TableHeader, TableRow } from "@/types";

@Component({
  components: {
    BaseTableHeaders,
    BaseTableRow,
  },
})
export default class BaseTable extends Vue {
  @Prop({ required: true })
  headers: TableHeader[];

  @Prop({ required: true })
  items: TableRow[];

  selectedId = -1;
  public updateSelection(id: number) {
    this.selectedId = id;
  }

  get parsedItems() {
    return this.items;
  }
}
</script>

<style lang="scss" scoped>
#table {
  width: 100%;
}
</style>
