<template>
  <transition name="fade">
    <div id="confirm-box" v-show="isVisible">
      <p class="text">
        {{ text }}
      </p>
      <div class="wrapper">
        <base-button @click="answer(true)">Да</base-button>
        <base-button @click="answer(false)">Нет</base-button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class ConfirmBox extends Vue {
  isVisible = false;
  text = "";
  task = {};

  public async question(text: string): Promise<boolean> {
    this.isVisible = true;
    this.text = text;
    return new Promise((resolve) => {
      this.task = resolve;
    });
  }

  public answer(res: boolean) {
    this.isVisible = false;
    (this.task as any)(res);
  }
}
</script>

<style lang="scss" scoped>
#confirm-box {
  padding: 1em;
  font: {
    size: 1.2rem;
    family: $fontText;
  }
  border-radius: 5px;
  color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
