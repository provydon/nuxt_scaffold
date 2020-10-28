<template>
  <div class="brand-container">
    This is the Terms Of Use Page.
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
      title: "Terms Of Use - " + this.siteName
    };
  }
};
</script>
