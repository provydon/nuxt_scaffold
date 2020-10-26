<template>
  <div class="mt-10 text-center">
    You're Logged In <span v-if="user">{{ user.name }}</span>
    <button class="btn btn-red ml-4" @click="logout()">Logout</button>
    <account></account>
  </div>
</template>

<script>
import Account from '@/components/UI/Account'
export default {
  data() {
    return {
      siteName: null
    };
  },
  components:{
    Account
  },
  middleware: ["check-auth", "auth"],
  asyncData(context) {
    return context.store
      .dispatch("user/getData")
      .then(result => {})
      .catch(err => {});
  },
  computed: {
    user() {
      return this.$store.getters["user/data"];
    }
  },
  methods: {
    logout() {
      this.$store
        .dispatch("auth/logout")
        .then(result => {
          this.$router.push("/login");
        })
        .catch(err => {});
    }
  },
  head() {
    return {
      title:
        this.$router.history.current.name.charAt(0).toUpperCase() +
        this.$router.history.current.name.slice(1) +
        " - " +
        this.siteName
    };
  },
  mounted() {
    this.siteName = process.env.APP_NAME;
  }
};
</script>
