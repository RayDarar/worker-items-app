<template>
  <div id="not-found">
    <span class="label">Не Найдено</span>
    <base-button class="buton" @click="goBack">Назад</base-button>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
#not-found {
  @extend .column-container;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  font: {
    size: 2.5rem;
    family: $fontTitle;
  }
}
.label {
  margin-bottom: 0.5em;
}
</style>
