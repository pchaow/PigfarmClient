<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    showSpinner: function() {
      this.$store.dispatch("spinner/toggle", true);
    },
    hideSpinner: function() {
      this.$store.dispatch("spinner/toggle", false);
    }
  },
  created() {
    this.$on("before-request", this.showSpinner);
    this.$on("request-error", this.hideSpinner);
    this.$on("after-response", this.hideSpinner);
    this.$on("response-error", this.hideSpinner);

    axios.interceptors.request.use(
      conf => {
        this.$emit("before-request");
        return conf;
      },
      error => {
        this.$emit("request-error");
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      response => {
        this.$emit("after-response");
        return response;
      },
      error => {
        this.$emit("response-error");
        if (error.response.status === 401) {
          this.$router.push({name : "Login"})
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );
  },
  beforeDestroy() {
    this.$off("before-request", this.showSpinner);
    this.$off("request-error", this.hideSpinner);
    this.$off("after-response", this.hideSpinner);
    this.$off("response-error", this.hideSpinner);
  }
};
</script>

<style lang="scss">
@import "../node_modules/vuetify/dist/vuetify.css";
@import "../node_modules/material-design-icons-iconfont/dist/material-design-icons.css";
@import "../node_modules/@mdi/font/css/materialdesignicons.min.css";
@import "../node_modules/vue-loading-overlay/dist/vue-loading.min.css";
@import "./assets/css/custom.css";
</style>
