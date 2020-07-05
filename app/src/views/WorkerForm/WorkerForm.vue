<template>
  <div id="worker-form">
    <div class="info-wrapper">
      <label class="info-item label" for="first-name">Имя</label>
      <input
        class="info-item"
        type="text"
        id="first-name"
        v-model="worker.firstName"
        placeholder="Введите имя"
      />
      <label class="info-item label" for="last-name">Фамилия</label>
      <input
        class="info-item"
        type="text"
        id="last-name"
        v-model="worker.lastName"
        placeholder="Введите фамилию"
      />
      <label class="info-item label" for="middle-name">Отчество</label>
      <input
        class="info-item"
        type="text"
        id="middle-name"
        v-model="worker.middleName"
        placeholder="Введите отчество"
      />
    </div>
    <base-table
      class="items"
      :items="existingItems"
      :headers="headers"
      :context-items="contextItems"
      @delete-item="markDeletion"
      @key-change="markUpdate"
      editable
    ></base-table>
    <div class="button-wrappers">
      <base-button class="button" @click="save">Сохранить</base-button>
      <base-button class="button" @click="cancel">Отмена</base-button>
      <base-button class="button" @click="markAddition">Добавить ценность</base-button>
    </div>
    <alert-box ref="box"></alert-box>
    <confirm-box ref="confirm"></confirm-box>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { workersApi } from "@/api";
import { TableHeader, ContextItem, Worker, WorkerItem } from "@/types";
import AlertBox from "@/components/AlertBox.vue";
import ConfirmBox from "@/components/ConfirmBox.vue";

const ALERT_TIME = 1000;

@Component({})
export default class WorkerForm extends Vue {
  isNew = false;
  worker: Worker = {
    id: -1,
    firstName: "",
    lastName: "",
    middleName: "",
    items: [],
    status: "new",
  };
  headers: TableHeader[] = [
    {
      label: "Наименование",
      width: "50%",
      key: "name",
      type: "text",
    },
    {
      label: "Цена",
      width: "50%",
      key: "price",
      type: "number",
    },
  ];
  contextItems: ContextItem[] = [
    {
      event: "delete-item",
      label: "Удалить",
    },
  ];

  async created() {
    const id = this.$route.params.worker_id;
    if (id == "new") return (this.isNew = true);

    const result = await workersApi.getWorker(id);
    this.worker = result.data;
    this.worker.status = "update";
  }

  get existingItems() {
    return this.worker.items.filter((item) => item.status != "delete");
  }

  markDeletion(id: number) {
    const item = this.worker.items.find((item: any) => item.id == id);

    if (item && item.status == "new") {
      this.worker.items = this.worker.items.filter((item: any) => item.id != id);
    } else if (item) Vue.set(item, "status", "delete");
  }
  markAddition() {
    const last = this.worker.items[this.worker.items.length - 1];
    const tempId = last?.id ? last.id + 1 : 1;
    this.worker.items.push({
      id: tempId,
      name: "Наименование",
      price: 0,
      status: "new",
    });
  }
  markUpdate(payload: any) {
    const item = this.worker.items.find(
      (item: any) => item.id == payload.id
    ) as WorkerItem & { [index: string]: any };

    item[payload.key] = payload.value;

    if (item.status != "new") item.status = "update";
  }

  async save() {
    const answer = await this.question("Вы уверены?");
    if (!answer) return;

    delete this.worker.status;
    if (this.isNew) {
      delete this.worker.id;
      this.worker.items.forEach((item) => {
        delete item.id;
        delete item.status;
      });
      const result = await workersApi.createWorker(this.worker);
      if (result.status == 201) {
        this.triggerMessage("Успешно");
        setTimeout(() => this.$router.push("/"), ALERT_TIME);
      } else this.triggerMessage("Ошибка", true);
    } else {
      delete this.worker.items;
      const result = await workersApi.updateWorker(this.worker);

      if (result.status == 202) {
        this.triggerMessage("Успешно");
        setTimeout(() => this.$router.push("/"), ALERT_TIME);
      } else this.triggerMessage("Ошибка", true);
    }
  }

  async cancel() {
    const answer = await this.question("Вы уверены?");
    if (answer) this.$router.push("/");
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
#worker-form {
  width: 60%;
  height: 100%;
  padding: 2em;

  margin: {
    top: 1em;
    left: auto;
    right: auto;
  }
}

.info-wrapper {
  display: grid;
  grid-template-columns: 1fr 5fr;

  .label {
    justify-self: flex-end;
  }

  .info-item {
    padding: 1em;
    font: {
      size: 1.1rem;
      family: $fontText;
    }
  }
}
.items,
.button-wrappers {
  margin-top: 1em;
}

.button-wrappers {
  @extend .row-container;

  .button {
    margin: 1em;
  }
}
</style>
