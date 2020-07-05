<template>
  <table id="table">
    <thead>
      <base-table-headers :headers="headers" @sort="setSortingKey"></base-table-headers>
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

  @Prop({
    required: true,
    validator: (items) => items.every((item: TableRow) => item.id),
  })
  items: TableRow[];

  selectedId = -1;
  public updateSelection(id: number) {
    this.selectedId = id;
  }

  sortKey = {
    key: "",
    reverse: false,
  };
  public setSortingKey(key: string) {
    this.sortKey.reverse = this.sortKey.key == key && !this.sortKey.reverse;
    this.sortKey.key = key;
  }

  get parsedItems() {
    const item = this.items[0];
    const key = this.sortKey.key;
    if (item && key in item) {
      return this.items.sort((a, b) => {
        const order = this.sortKey.reverse ? 1 : -1;
        if (a[key] < b[key]) return order;
        else if (a[key] > b[key]) return order * -1;
        return 0;
      });
    }
    return this.items;
  }
}
</script>

<style lang="scss" scoped>
#table {
  width: 100%;
}
</style>
