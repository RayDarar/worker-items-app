<template>
  <tr id="headers">
    <th
      class="header"
      v-for="header in headers"
      :key="header.key"
      :style="{ width: header.width }"
    >
      <div class="wrapper">
        <span class="label">{{ header.label }}</span>
        <img
          @click.stop="emitSort(header.key)"
          class="icon"
          src="@/assets/sorting-arrow.png"
        />
      </div>
    </th>
  </tr>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { TableHeader } from "@/types";

@Component({})
export default class BaseTableHeaders extends Vue {
  @Prop({ required: true })
  headers: TableHeader[];

  public emitSort(key: string) {
    this.$emit("sort", key);
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 1em;
  border-bottom: 1px solid $accentGrayLight;

  .wrapper {
    @extend .row-container;
    justify-content: flex-start;
    align-items: center;

    .label {
      font: {
        size: 1.2rem;
        family: $fontTitle;
      }
    }
    .icon {
      width: 22px;
      margin-left: 1em;
      cursor: pointer;
    }
  }
}
</style>
