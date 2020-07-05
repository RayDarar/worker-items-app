<template>
  <button id="button" @click="clicked">
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { ButtonSize } from "@/types";

@Component({})
export default class BaseButton extends Vue {
  @Prop({
    default: ButtonSize.MEDIUM,
  })
  size: ButtonSize;

  public clicked(e: Event) {
    this.$emit("click", e);
  }

  public mounted() {
    this.$el.classList.add(this.size);
  }
}
</script>

<style lang="scss" scoped>
#button {
  background-color: $accentBrownLight;
  color: $textColorLight;
  cursor: pointer;

  padding: 0.7em 1em;
  border-radius: 5px;

  transition: background-color 0.3s ease;
  &:hover {
    background-color: $accentBrownDark;
  }
}

.small {
  font-size: 0.8rem;
}

.medium {
  font-size: 1rem;
}

.big {
  font-size: 1.2rem;
}
</style>
