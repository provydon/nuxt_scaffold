<template>
  <div class="brand-container">
    This is the About page.
  </div>
</template>

<script>
export default {
  middleware: ["check-auth"],
  data() {
    return {
      siteName: null
    };
  },
  mounted() {
    this.siteName = process.env.APP_NAME;
  },
  head() {
    return {
      title: "About Us - " + this.siteName
    };
  }
};
</script>
