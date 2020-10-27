<template>
  <div class="header-container">
    <header class="the-header">
      <div class="logo">
        <nuxt-link to="/">{{ siteName }}</nuxt-link>
      </div>
      <div class="spacer"></div>
      <TheSideNavToggle @toggle="$emit('side-nav-toggle')" />
      <div class="navigation-items">
        <ul class="nav-list items-center">
          <li class="nav-item">
            <nuxt-link to="/" exact>Home</nuxt-link>
          </li>
          <li class="nav-item"><nuxt-link to="/about">About Us</nuxt-link></li>
          <li class="nav-item">
            <nuxt-link to="/contact">Contact Us</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/privacy_policy">Privacy Policy</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/terms_of_use">Terms Of Use</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/login" v-if="!isLoggedIn">Login</nuxt-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <nuxt-link to="/register">Register</nuxt-link>
          </li>
          <li
            class="nav-item"
            @click="accDropdown = !accDropdown"
            v-if="isLoggedIn"
          >
            <nuxt-link to="#" v-if="user">
              <img :src="user.image" class="h-8 inline-block rounded-full" />
              <span>{{ user.name }}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </header>

    <!-- Account Dropdown -->
    <div
      v-if="accDropdown"
      class="mt-2 py-2 w-48 bg-white rounded-lg shadow-xl absolute dropdown"
    >
      <button
        @click="navigate('/')"
        class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 w-full text-left"
      >
        Account Settings
      </button>
      <button
        @click="logout()"
        class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 w-full text-left"
      >
        Sign Out
      </button>
    </div>
    <!-- End Account Dropdown -->
  </div>
</template>

<script>
import TheSideNavToggle from "@/components/Navigation/TheSideNavToggle";

export default {
  name: "TheHeader",
  data() {
    return {
      siteName: null,
      accDropdown: false
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/isAuthenticated"];
    },
    user() {
      return this.$store.getters["user/data"];
    }
  },
  components: {
    TheSideNavToggle
  },
  methods: {
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.accDropdown = false;
      }
    },
    navigate(path) {
      this.accDropdown = false;
      this.$router.push(path);
    },
    logout() {
      this.$store
        .dispatch("auth/logout")
        .then(result => {
          this.accDropdown = false;
          this.$router.push("/login");
        })
        .catch(err => {});
    }
  },
  mounted() {
    document.addEventListener("click", this.close);
    this.siteName = process.env.APP_NAME;
  },
  beforeDestroy() {
    document.removeEventListener("click", this.close);
  }
};
</script>

<style scoped>
.header-container {
  height: 60px;
}

.the-header {
  width: 100%;
  position: fixed;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: black;
  z-index: 100;
  box-sizing: border-box;
  padding: 0 20px;
}

.logo {
  margin: 0 10px;
  font-size: 1.3rem;
}

.logo a {
  text-decoration: none;
  color: white;
}

.spacer {
  flex: 1;
}

.navigation-items {
  display: none;
}

@media (min-width: 768px) {
  .navigation-items {
    display: block;
  }
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.nav-item {
  margin: 0 10px;
}

.nav-item a {
  text-decoration: none;
  color: white;
}

.nav-item a:hover,
.nav-item a:active,
.nav-item a.nuxt-link-active {
  color: red;
}
</style>
