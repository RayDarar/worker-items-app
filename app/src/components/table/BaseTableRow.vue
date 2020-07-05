<template>
  <tr id="table-row">
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
}
</script>

<style lang="scss" scoped>
#table-row {
  transition: background-color 0.3s ease;
  &:hover {
    background-color: $accentGrayLight;
  }
}

.table-data {
  padding: 1em;
  border-bottom: 1px solid $accentGrayLight;
  font-family: $fontText;

  text-align: left;
}
</style>
