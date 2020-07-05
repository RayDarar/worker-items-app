<template>
  <transition name="fade">
    <div
      id="alert-box"
      :class="{
        success: isError,
        error: !isError,
      }"
      v-show="isVisible"
    >
      {{ text }}
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class AlertBox extends Vue {
  isVisible = false;
  isError = false;
  text = "";

  public alert(text: string, time = 1000, error = false) {
    this.text = text;
    this.isVisible = true;
    this.isError = error;
    setTimeout(() => {
      this.isVisible = false;
    }, time);
  }
}
</script>

<style lang="scss" scoped>
#alert-box {
  padding: 1em;
  font: {
    size: 1.2rem;
    family: $fontText;
  }
  border-radius: 5px;
  color: white;

  position: fixed;
  left: 5%;
  top: calc(3% + 80px);
}

.error {
  background-color: green;
}

.success {
  background-color: darkred;
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
