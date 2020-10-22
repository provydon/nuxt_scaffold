<template>
  <div class="admin-auth-page flex flex-col h-screen">
    <div class="auth-container">
      <h3 class="text-center">Login</h3>
      <form @submit.prevent="onSubmit">
        <div class="input-control">
          <input type="email" name="email" id="email" v-model="email" />
        </div>
        <div class="input-control">
          <input
            type="password"
            name="password"
            id="password"
            v-model="password"
          />
        </div>
        <button type="submit" class="btn-auth">Login</button>
        <nuxt-link to="register" tag="button" class="btn-auth inverted"
          >Switch to Signup</nuxt-link
        >
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      isLogin: true,
      email: null,
      password: null
    };
  },
  methods: {
    onSubmit() {
      this.$toast.show("Logging in...");
      this.$store
        .dispatch("auth/authtenticateUser", {
          email: this.email,
          password: this.password,
          isLogin: this.isLogin
        })
        .then(result => {
          if (this.$store.getters["auth/isAuthenticated"]) {
            this.$router.push("/home");
          }
        })
        .catch(err => {});
    }
  },
  head() {
    return {
      title:
        this.$router.history.current.name.charAt(0).toUpperCase() +
        this.$router.history.current.name.slice(1)
    };
  }
};
</script>
