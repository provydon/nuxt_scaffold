<template>
  <div class="brand-container">
    <div class="auth-container">
      <h3 class="text-center">Login</h3>
      <form @submit.prevent="onSubmit">
        <div class="input-control">
          <input
            type="text"
            name="emailOrUsername"
            id="emailOrUsername"
            v-model="emailOrUsername"
          />
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
        <button type="submit" class="btn btn-auth" id="sendBtn">Login</button>
        <nuxt-link to="register" tag="button" class="btn-auth inverted"
          >Switch to Signup</nuxt-link
        >
      </form>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["home"],
  name: "Login",
  data() {
    return {
      isLogin: true,
      emailOrUsername: null,
      password: null,
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
      this.resMessage = "Logging in...";
      this.resSuccess = null;
      this.resFail = null;
      document.getElementById("sendBtn").disabled = true;
      this.$store
        .dispatch("auth/authtenticateUser", {
          email: this.validateEmail(this.emailOrUsername)
            ? this.emailOrUsername
            : null,
          username: this.validateEmail(this.emailOrUsername)
            ? null
            : this.emailOrUsername,
          password: this.password,
          isLogin: this.isLogin
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
                let user = vm.$store.getters["user/data"];
                if (user.theme) {
                  vm.$colorMode.preference = user.theme;
                } else {
                  vm.$colorMode.preference = "";
                }
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
    },
    validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
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
