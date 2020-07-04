import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import BaseButton from "@/components/BaseButton.vue";
import BaseTable from "@/components/table/BaseTable.vue";

Vue.component("base-button", BaseButton);
Vue.component("base-table", BaseTable);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
