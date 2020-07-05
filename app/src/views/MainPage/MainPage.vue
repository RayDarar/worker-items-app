<template>
  <div id="main-page">
    <div class="wrapper">
      <base-table
        :items="workers"
        :headers="headers"
        sortable
        @double-click="editWorker"
      ></base-table>
      <div class="inner-wrapper">
        <base-button class="button" @click="addWorker">Добавить</base-button>
        <main-page-nav
          class="nav"
          @page-change="updatePage"
          :pages="pagesCount"
        ></main-page-nav>
      </div>
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
  currentPage = 1;
  get pagesCount() {
    const pages = this.workersCount / 10;
    return pages < 1 ? 1 : pages;
  }
  async updatePage(page: number) {
    const response = await workersApi.getPage(page);
    this.workers = response.data;
  }
  addWorker() {
    this.$router.push("/form/new");
  }
  editWorker(id: number) {
    this.$router.push("/form/" + id);
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

    await this.updatePage(1);
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
.inner-wrapper {
  @extend .row-container;
  align-items: center;
  justify-content: space-between;

  .button {
    margin: 1em;
  }
}
</style>
