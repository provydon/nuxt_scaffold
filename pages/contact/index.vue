<template>
  <div class="admin-auth-page flex mt-20 justify-center">
    <div class="auth-container">
      <h3 class="text-center">Contact Us</h3>
      <form @submit.prevent="onSubmit">
        <div class="input-control">
          <input
            type="name"
            name="name"
            id="name"
            v-model="name"
            placeholder="Fullname"
          />
        </div>
        <div class="input-control">
          <input
            type="email"
            name="email"
            id="email"
            v-model="email"
            placeholder="E-Mail"
          />
        </div>
        <div class="input-control">
          <input
            type="text"
            name="subject"
            id="subject"
            v-model="subject"
            placeholder="Subject"
          />
        </div>
        <div class="input-control">
          <textarea
            rows="3"
            type="text"
            name="message"
            id="message"
            v-model="message"
            placeholder="Message"
          ></textarea>
        </div>
        <div class="input-control text-center">
          <span>{{ mailMessage }}</span>
          <i class="fas fa-spinner fa-spin" v-if="mailSpin"></i>
          <span class="text-success font-bold f-18">{{ mailSuccess }}</span>
          <span class="text-danger font-bold f-18">{{ mailFail }}</span>
        </div>
        <div class="input-control text-center">
          <button type="submit" class="btn btn-auth" id="sendBtn">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactUs",
  data() {
    return {
      siteName: null,
      email: null,
      name: null,
      subject: null,
      message: null,

      // Response Variables
      mailSpin: false,
      mailSuccess: null,
      mailFail: null,
      mailMessage: null
    };
  },
  methods: {
    onSubmit() {
      this.mailSpin = true;
      this.mailMessage = "Sending...";
      this.mailSuccess = null;
      this.mailFail = null;
      document.getElementById("sendBtn").disabled = true;
      return this.$axios
        .$post("/send-mail", {
          email: this.email,
          name: this.name,
          subject: this.subject,
          message: this.message
        })
        .then(result => {
          this.mailMessage = result.message;
          this.$toast.success(result.message);
          document.getElementById("sendBtn").disabled = false;
          let vm = this;
          setTimeout(
            function() {
              vm.mailMessage = null;
            },
            3000,
            vm
          );
        })
        .catch(err => {
          this.mailSpin = false;
          this.mailMessage = "Error";
          this.mailSuccess = null;
          this.mailFail = err.response.data.message;
          this.$toast.error(err.response.data.message);
        });
      return;
    }
  },
  head() {
    return {
      title: "Contact Us - " + this.siteName
    };
  },
  mounted() {
    this.siteName = process.env.APP_NAME;
  }
};
</script>
