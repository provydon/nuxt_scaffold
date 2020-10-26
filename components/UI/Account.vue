<template>
   <div class="admin-auth-page flex mt-20 justify-center">
    <div class="auth-container">
      <h3 class="text-center">User Account</h3>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters["user/data"];
    }
  },
}
</script>
