<template>
  <div class="sidenav-container">
    <div v-if="show" class="sidenav-backdrop" @click="$emit('close')"></div>
    <transition name="slide-side">
      <div v-if="show" class="sidenav overflow-y-scroll h-screen">
        <ul class="nav-list" @click="$emit('close')">
          <div class="logo font-bold">
            <nuxt-link to="/">{{ siteName }}</nuxt-link>
          </div>
          <li class="nav-item" v-if="isLoggedIn">
            <nuxt-link to="#" v-if="user" class="flex flex-col items-center">
              <img :src="user.image" class="w-1/3 flex-1" />
              <div>{{ user.name }}</div>
            </nuxt-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <nuxt-link to="/">Account Settings</nuxt-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <button
              @click="logout()"
              class="block text-gray-800 hover:bg-indigo-500 w-full text-left"
            >
              Sign Out
            </button>
          </li>
          <li class="nav-item">
            <nuxt-link to="/login" v-if="!isLoggedIn">Login</nuxt-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <nuxt-link to="/register">Register</nuxt-link>
          </li>
          <li class="nav-item">
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
.sidenav-container {
  height: 100%;
  width: 100%;
}

.sidenav-backdrop {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
}

.sidenav {
  height: 100%;
  width: 300px;
  background-color: white;
  z-index: 10000;
  position: fixed;
  top: 0;
  right: 0;
  box-sizing: border-box;
  padding: 30px;
}

.slide-side-enter-active,
.slide-side-leave-active {
  transition: all 0.3s ease-out;
}
.slide-side-enter,
.slide-side-leave-to {
  transform: translateX(+100%);
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin: 20px 0;
}

.nav-item a {
  text-decoration: none;
  color: black;
  /* font-size: 1.5rem; */
}

.nav-item a:hover,
.nav-item a:active {
  color: red;
}

.m-0 {
  margin: 0 !important;
}
</style>
