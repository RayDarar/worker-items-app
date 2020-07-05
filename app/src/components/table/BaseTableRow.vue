<template>
  <tr
    id="table-row"
    :class="{
      'table-row_clicked': isSelected,
    }"
  >
    <td class="table-data" v-for="header in headers" :key="header.key">
      {{ item[header.key] }}
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

import { TableHeader, TableRow } from "@/types";

@Component({})
export default class BaseTableRow extends Vue {
  @Prop({ required: true })
  item: TableRow;

  @Prop({ required: true })
  headers: TableHeader[];

  @Prop({ default: -1 })
  selectionId: number;

  get isSelected() {
    return this.item.id === this.selectionId;
  }
}
</script>

<style lang="scss" scoped>
#table-row {
  transition: background-color 0.3s ease;
  &:hover {
    background-color: $accentGrayLight;
  }
  cursor: pointer;
}

.table-row_clicked {
  background-color: $accentGrayDark;
}

.table-data {
  padding: 1em;
  border-bottom: 1px solid $accentGrayLight;
  font-family: $fontText;

  text-align: left;
}
</style>
