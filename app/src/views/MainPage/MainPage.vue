<template>
  <div id="main-page">
    <div class="wrapper">
      <base-table :headers="headers" :items="items"></base-table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { TableHeader } from "@/types";

const workers = [
  {
    id: 1,
    fullName: "Steven Underwood",
    itemsCount: 5,
    priceSum: 14808,
  },
  {
    id: 2,
    fullName: "Mabelle Simon",
    itemsCount: 5,
    priceSum: 77136,
  },
  {
    id: 3,
    fullName: "Fred Curtis",
    itemsCount: 2,
    priceSum: 40339,
  },
];
const headersRaw: TableHeader[] = [
  {
    label: "ФИО",
    width: "30%",
    key: "fullName",
  },
  {
    label: "Кол-во",
    width: "15%",
    key: "itemsCount",
  },
  {
    label: "Общая стоимость",
    width: "35%",
    key: "priceSum",
  },
];

@Component({})
export default class MainPage extends Vue {
  get items() {
    return workers;
  }

  get headers() {
    return headersRaw;
  }
}
</script>

<style lang="scss" scoped>
#main-page {
  height: 100%;
  padding: 2em 1em;
  @extend .centered;
}

.wrapper {
  width: 60%;
  height: 100%;
}
</style>
