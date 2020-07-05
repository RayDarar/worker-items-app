<template>
  <div id="main-page">
    <div class="wrapper">
      <base-table :items="workers" :headers="headers" sortable></base-table>
      <main-page-nav :pages="workersCount"></main-page-nav>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { workersApi } from "@/api";
import { TableRowItem, TableHeader } from "@/types";
import MainPageNav from "./MainPageNav.vue";

@Component({
  components: {
    MainPageNav,
  },
})
export default class MainPage extends Vue {
  workersCount = 0;
  get pagesCount() {
    const pages = this.workersCount / 10;
    return pages < 1 ? 1 : pages;
  }

  workers: TableRowItem[] = [];
  headers: TableHeader[] = [
    {
      label: "ФИО",
      width: "20%",
      key: "fullName",
      type: "text",
    },
    {
      label: "Кол-во",
      width: "10%",
      key: "itemsCount",
      type: "number",
    },
    {
      label: "Общая стоимость",
      width: "30%",
      key: "priceSum",
      type: "number",
    },
  ];

  async created() {
    const response = await workersApi.getCount();
    this.workersCount = response.data.result;
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
