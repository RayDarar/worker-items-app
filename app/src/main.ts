import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import BaseButton from "@/components/BaseButton.vue";
import BaseTable from "@/components/table/BaseTable.vue";
import AlertBox from "@/components/AlertBox.vue";
import ConfirmBox from "@/components/ConfirmBox.vue";

Vue.component("base-button", BaseButton);
Vue.component("base-table", BaseTable);
Vue.component("alert-box", AlertBox);
Vue.component("confirm-box", ConfirmBox);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
