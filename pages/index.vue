<template>
  <div class="brand-container">
    <div class="container pt-32">
      <div>
        <Logo />
        <h1 class="title">
          {{ siteName }}
        </h1>
      </div>
    </div>
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
  }
};
</script>

