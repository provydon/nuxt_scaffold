<template>
  <div class="card">
    <div class="auth-container">
      <h3 class="text-center">User Profile</h3>
      <img
        :src="userProfile.image"
        class="h-20 my-3 inline-block rounded-full"
      />
      <p v-if="userProfile.name">
        {{ capitalizeFirstLetter(userProfile.name) }}
      </p>
      <p>@{{ userProfile.username }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userProfile"],
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
};
</script>
