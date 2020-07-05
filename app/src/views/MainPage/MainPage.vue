<template>
  <div id="main-page">
    <div class="wrapper">
      <base-table
        :items="workers"
        :headers="headers"
        :context-items="contextItems"
        @delete-worker="deleteWorker"
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
    <alert-box ref="box"></alert-box>
    <confirm-box ref="confirm"></confirm-box>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { workersApi } from "@/api";
import { TableRowItem, TableHeader, ContextItem } from "@/types";
import MainPageNav from "./MainPageNav.vue";
import ConfirmBox from "@/components/ConfirmBox.vue";
import AlertBox from "@/components/AlertBox.vue";

const ALERT_TIME = 1000;

@Component({
  components: {
    MainPageNav,
  },
})
export default class MainPage extends Vue {
  workersCount = 0;
  get pagesCount() {
    const pages = Math.ceil(this.workersCount / 10);
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
  contextItems: ContextItem[] = [
    {
      event: "delete-worker",
      label: "Удалить",
    },
  ];

  async created() {
    const response = await workersApi.getCount();
    this.workersCount = response.data.result;

    await this.updatePage(1);
  }

  async deleteWorker(id: number) {
    const answer = await this.question("Вы уверены?");
    if (answer) {
      const response = await workersApi.deleteWorker(id);
      if (response.status == 202) {
        this.workers = this.workers.filter((worker) => worker.id != id);
        this.triggerMessage("Успешно");
      } else this.triggerMessage("Ошибка", true);
    }
  }

  async question(text: string): Promise<boolean> {
    const confirm = this.$refs.confirm as ConfirmBox;
    return confirm.question(text);
  }

  triggerMessage(message: string, error = false) {
    const box = this.$refs.box as AlertBox;
    box.alert(message, ALERT_TIME, error);
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
