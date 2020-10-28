<template>
  <div class="mt-10">
    <button class="btn brand-btn mr-2" @click="changeMode('light')">
      Light
    </button>
    <button class="btn brand-btn mr-2" @click="changeMode('dark')">
      Dark
    </button>
    <button class="btn brand-btn" @click="changeMode('')">
      Nuetral
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    changeMode(mode) {
      this.$colorMode.preference = mode;
      return this.$axios
        .$post(
          "/me/mode",
          {
            mode: mode
          },
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters["user/getToken"] //the token is a variable which holds the token
            }
          }
        )
        .then(result => {
          this.$store.dispatch("user/getData");
        })
        .catch(err => {});
    }
  }
};
</script>
