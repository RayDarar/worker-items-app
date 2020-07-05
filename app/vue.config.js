module.exports = {
  outputDir: "../service/public",
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "~@/sass/_colors.scss";
          @import "~@/sass/_containers.scss";
          @import "~@/sass/_material.scss";
          @import "~@/sass/_fonts.scss";
        `,
      },
    },
  },
};
