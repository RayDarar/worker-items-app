<template>
  <transition name="fade">
    <div id="confirm-box" v-show="isVisible">
      <div class="wrapper">
        <p class="text">
          {{ text }}
        </p>
        <div class="button-wrapper">
          <base-button class="button" @click="answer(true)">Да</base-button>
          <base-button class="button" @click="answer(false)">Нет</base-button>
        </div>
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

  &::before {
    content: "";
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    background-color: rgba($color: #000000, $alpha: 0.3);
  }
}

.wrapper {
  border-radius: 5px;
  background-color: white;

  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 1em;

  * {
    margin: 0.5em;
  }
}

.text {
  text-align: center;
}

.button-wrapper {
  margin-top: 1em;
  @extend .row-container;

  justify-content: space-evenly;
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
