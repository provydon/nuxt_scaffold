<template>
  <div class="brand-container">
      <profile :userProfile="userProfile"></profile>
  </div>
</template>

<script>
import Profile from "@/components/UI/Profile";
export default {
  middleware: ["check-auth"],
  data() {
    return {
      siteName: null
    };
  },
  asyncData(context) {
    return context.app.$axios
      .$get("/user/" + context.params.username)
      .then(result => {
        return {
          userProfile: result.data
        };
      })
      .catch(err => {
        // console.log(err);
        const e = new Error("User or Page not found");
        e.code = "ENOENT"; // Triggers a 404
        throw e;
      });
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  },
  head() {
    return {
      title:
        this.capitalizeFirstLetter(this.userProfile.name) +
        " @" +
        this.userProfile.username +
        " - " +
        this.siteName
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
  }
};
</script>
