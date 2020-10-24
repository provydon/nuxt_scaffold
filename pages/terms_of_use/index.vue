<template>
  <div>
    This is the Terms Of Use Page.
  </div>
</template>

<script>
export default {
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
