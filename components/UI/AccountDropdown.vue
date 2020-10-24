<template>
  <div
      v-if="dropdown"
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
</template>

<script>
export default {
  props: ["dropdown"],
  methods: {
    logout() {
      this.$store
        .dispatch("auth/logout")
        .then(result => {
          this.$router.push("/login");
        })
        .catch(err => {});
    },
    omo(){
      console.log('omo');
    }
  }
};
</script>
