<template>
  <div class="admin-auth-page flex mt-20 justify-center">
    <div class="auth-container">
      <h3 class="text-center">Register</h3>
      <form @submit.prevent="onSubmit">
        <div class="input-control">
          <input type="name" name="name" id="name" v-model="name" />
        </div>
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
        <button type="submit" class="btn-auth">Signup</button>
        <nuxt-link to="login" tag="button" class="btn-auth inverted"
          >Switch to Login</nuxt-link
        >
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminAuthPage",
  data() {
    return {
      isLogin: false,
      email: null,
      password: null,
      name: null
    };
  },
  methods: {
    onSubmit() {
      this.$toast.show("Signing Up...");
      this.$store
        .dispatch("auth/authtenticateUser", {
          email: this.email,
          password: this.password,
          isLogin: this.isLogin,
          name: this.name
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

<style scoped>
.admin-auth-page {
  padding: 20px;
}

.auth-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 2px #ccc;
  width: 300px;
  margin: auto;
  padding: 10px;
  box-sizing: border-box;
}
</style>
