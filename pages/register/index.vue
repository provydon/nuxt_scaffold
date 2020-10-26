<template>
  <div class="admin-auth-page flex mt-20 justify-center">
    <div class="auth-container">
      <h3 class="text-center">Register</h3>
      <form @submit.prevent="onSubmit">
        <div class="input-control">
          <input type="name" name="name" id="name" v-model="name" />
        </div>
        <div class="input-control">
          <input type="name" name="username" id="username" v-model="username" />
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
        <div class="input-control text-center">
          <span>{{ resMessage }}</span>
          <i class="fas fa-spinner fa-spin" v-if="resSpin"></i>
          <span class="text-green-700 font-bold f-18">{{ resSuccess }}</span>
          <span class="text-red-700 font-bold f-18">{{ resFail }}</span>
        </div>
        <button type="submit" class="btn btn-auth" id="sendBtn">Signup</button>
        <nuxt-link to="login" tag="button" class="btn-auth inverted"
          >Switch to Login</nuxt-link
        >
      </form>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["home"],
  name: "AdminAuthPage",
  data() {
    return {
      isLogin: false,
      email: null,
      username: null,
      password: null,
      name: null,
      siteName: null,

      // Response Variables
      resSpin: false,
      resSuccess: null,
      resFail: null,
      resMessage: null
    };
  },
  methods: {
    onSubmit() {
      this.resSpin = true;
      this.resMessage = "Signing Up...";
      this.resSuccess = null;
      this.resFail = null;
      document.getElementById("sendBtn").disabled = true;
      this.$store
        .dispatch("auth/authtenticateUser", {
          email: this.email,
          username: this.username,
          password: this.password,
          isLogin: this.isLogin,
          name: this.name
        })
        .then(result => {
          this.resMessage = null;
          this.resSuccess = result.message;
          this.$toast.success(result.message);
          let vm = this;
          setTimeout(
            function() {
              vm.resMessage = null;
              document.getElementById("sendBtn").disabled = false;
              if (vm.$store.getters["auth/isAuthenticated"]) {
                vm.$router.push("/home");
              }
            },
            2000,
            vm
          );
        })
        .catch(err => {
          document.getElementById("sendBtn").disabled = false;
          this.resSpin = true;
          this.resMessage = null;
          this.resSuccess = null;
          this.resFail = err;
        });
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
