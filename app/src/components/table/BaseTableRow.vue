<template>
  <tr
    id="table-row"
    :class="{
      'table-row_clicked': isSelected,
    }"
  >
    <td class="table-data" v-for="header in headers" :key="header.key">
      <input
        class="input"
        :type="header.type"
        v-model="copyItem[header.key]"
        @change="emitChange(header.key)"
        :disabled="!editable"
      />
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

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

  @Prop({ type: Boolean, required: true })
  editable: boolean;

  copyItem: TableRow = { id: -1 };
  created() {
    Object.assign(this.copyItem, this.item);
  }

  @Watch("item", { deep: true })
  watchItem(oldValue: TableRow, newValue: TableRow) {
    this.copyItem = newValue;
  }

  emitChange(key: string) {
    let value = this.copyItem[key];

    if (typeof this.item[key] == "number") value = parseFloat(value);
    this.$emit("key-change", {
      key,
      id: this.item.id,
      value,
    });
  }
}
</script>

<style lang="scss" scoped>
#table-row {
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.table-row_clicked {
  background-color: $accentGrayLight;
}

.table-data {
  border-bottom: 1px solid $accentGrayLight;

  text-align: left;

  .input {
    background-color: transparent;
    font-family: $fontText;
    padding: 1em;
    cursor: pointer;

    &:disabled {
      color: black;
    }
  }
}
</style>
