<template>
  <nav id="navigation">
    <ul class="wrapper">
      <li
        class="item"
        :class="{ item_selected: selected == n }"
        v-for="n in array"
        :key="n"
        @click="selectPage(n)"
      >
        {{ n }}
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component({})
export default class MainPageNav extends Vue {
  @Prop({ required: true })
  count: number;
  get array() {
    const pagesRaw = Math.ceil(this.count / 10);
    const pages = pagesRaw < 1 ? 1 : pagesRaw;
    
    return Array.from({ length: pages }, (_, i) => i + 1);
  }

  selected = 1;
  selectPage(page: number) {
    this.selected = page;
    this.$emit("page-change", page);
  }
}
</script>

<style lang="scss" scoped>
#navigation {
  @extend .row-container;
  justify-content: center;
}

.wrapper {
  @extend .row-container;
  list-style-type: none;

  .item {
    font: {
      size: 1.2rem;
      family: $fontText;
    }
    cursor: pointer;
    margin: 0.5em;

    &_selected {
      font-weight: bold;
    }
  }
}
</style>
