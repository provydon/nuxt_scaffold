<template>
  <div>
    This is the Privacy Policy page.
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
      title: "Privacy Policy - " + this.siteName
    };
  }
};
</script>
