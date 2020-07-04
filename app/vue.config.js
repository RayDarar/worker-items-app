module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "~@/sass/_colors.scss";
          @import "~@/sass/_containers.scss";
          @import "~@/sass/_material.scss";
        `,
      },
    },
  },
};
