<template>
  <table id="table">
    <thead>
      <base-table-headers
        :sortable="sortable"
        :headers="headers"
        @sort="setSortingKey"
      ></base-table-headers>
    </thead>
    <tbody>
      <base-table-row
        v-for="item in parsedItems"
        :key="item.id"
        :item="item"
        :headers="headers"
        :selection-id="selectedId"
        :editable="editable"
        @click.native="updateSelection(item.id)"
        @dblclick.native="emitDoubleClick(item.id)"
        @contextmenu.native.prevent="openContextMenu($event, item.id)"
        @key-change="$emit('key-change', $event)"
      ></base-table-row>
      <ul
        v-show="context.visible"
        class="context-menu"
        :style="{ left: context.x, top: context.y }"
      >
        <li
          @click="emitContextEvent(item.event)"
          class="context-menu__item"
          v-for="item in contextItems"
          :key="item.event"
        >
          {{ item.label }}
        </li>
      </ul>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

import BaseTableHeaders from "./BaseTableHeaders.vue";
import BaseTableRow from "./BaseTableRow.vue";
import { TableHeader, TableRow, ContextItem } from "@/types";

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

  public emitDoubleClick(id: number) {
    this.$emit("double-click", id);
  }

  @Prop()
  contextItems: ContextItem[];
  context = {
    visible: false,
    x: "0px",
    y: "0px",
    id: -1,
  };
  public openContextMenu(e: MouseEvent, id: number) {
    this.context.visible = true;
    this.context.x = e.x + "px";
    this.context.y = e.y + "px";
    this.context.id = id;
  }
  public closeContextMenu() {
    this.context.visible = false;
  }
  public emitContextEvent(event: string) {
    this.$emit(event, this.context.id);
  }

  created() {
    document.addEventListener("click", this.closeContextMenu);
  }

  beforeDestroy() {
    document.removeEventListener("click", this.closeContextMenu);
  }

  @Prop({ type: Boolean, default: false })
  editable: boolean;

  @Prop({ type: Boolean, default: false })
  sortable: boolean;
}
</script>

<style lang="scss" scoped>
#table {
  width: 100%;
  position: relative;
}
.context-menu {
  $radius: 5px;

  @extend .column-container;
  @include material-shadow(black);
  background-color: white;
  list-style: none;
  border-radius: $radius;

  position: fixed;
  transition: all 0.3s;

  &__item {
    padding: 1em;
    cursor: pointer;
    border-radius: $radius;
    transition: background-color 0.3s;

    &:hover {
      background-color: $accentGrayLight;
    }
  }
}
</style>
