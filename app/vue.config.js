module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "~@/sass/_colors.scss";
        `,
      },
    },
  },
};
