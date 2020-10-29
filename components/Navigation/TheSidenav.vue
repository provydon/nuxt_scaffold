<template>
  <div class="sidenav-container">
    <div v-if="show" class="sidenav-backdrop" @click="$emit('close')"></div>
    <transition name="slide-side">
      <div v-if="show" class="sidenav">
        <div class="logo">
          <nuxt-link to="/">{{ siteName }}</nuxt-link>
        </div>
        <ul class="nav-list" @click="$emit('close')">
          <li class="nav-item" v-if="isLoggedIn">
            <nuxt-link to="#" v-if="user" class="nav-item-account">
              <img :src="user.image" />
              <div>{{ user.name }}</div>
            </nuxt-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <nuxt-link to="/home">Account Settings</nuxt-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <button @click="logout()" class="logout">
              Sign Out
            </button>
          </li>
          <li class="nav-item">
            <nuxt-link to="/login" v-if="!isLoggedIn">Login</nuxt-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <nuxt-link to="/register">Register</nuxt-link>
          </li>
          <li class="nav-item line">
            <hr class="" />
          </li>
          <li class="nav-item">
            <nuxt-link to="/">Home</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/contact">Contact Us</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/privacy_policy">Privacy Policy</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/terms_of_use">Terms Of Use</nuxt-link>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      siteName: null
    };
  },
  name: "TheSidenav",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/isAuthenticated"];
    },
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
  mounted() {
    this.siteName = process.env.APP_NAME;
  }
};
</script>

<style scoped>
.slide-side-enter-active,
.slide-side-leave-active {
  transition: all 0.3s ease-out;
}
.slide-side-enter,
.slide-side-leave-to {
  transform: translateX(+100%);
}
</style>
