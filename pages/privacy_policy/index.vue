<template>
  <div class="brand-container">
    This is the Privacy Policy page.
  </div>
</template>


<script>
export default {
  middleware: ["check-auth"],
  data() {
    return {
      siteName: null
    };
  },
  mounted() {
    this.siteName = process.env.APP_NAME;
    if (this.$store.getters["auth/isAuthenticated"]) {
      this.$store
        .dispatch("user/getData")
        .then(result => {
          var user = this.$store.getters["user/data"];
          this.$colorMode.preference = user.theme;
        })
        .catch(err => {});
    } else {
      this.$colorMode.preference = "nuetral";
    }
  },
  head() {
    return {
      title: "Privacy Policy - " + this.siteName
    };
  }
};
</script>
