<template>
  <div>
    <div class="card" v-if="!edit && user">
      <div class="auth-container">
        <p class="text-right">
          <button class="text-blue-600" @click="editUser()">
            <fa icon="edit" /> edit
          </button>
        </p>
        <h3 class="text-center">User Account</h3>
        <img :src="user.image" class="h-20 my-3 inline-block rounded-full" />
        <p v-if="user.name">{{ capitalizeFirstLetter(user.name) }}</p>
        <p>@{{ user.username }}</p>
      </div>
    </div>
    <div class="admin-auth-page flex justify-center" v-else>
      <div class="auth-container">
        <h3 class="text-center">Edit User Account</h3>
        <form @submit.prevent="updateUser" class="text-left">
          <div class="input-control mb-5">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" v-model="name" />
          </div>
          <div class="input-control mb-5">
            <label for="image">Profile Pic</label>
            <div class="text-center">
              <img
                :src="user.image"
                class="h-20 my-1 inline-block"
                id="profilePic"
              />
            </div>
            <input
              type="file"
              name="image"
              id="file"
              class="custom-file-input"
              @change="readURL()"
            />
          </div>
          <div class="input-control text-center">
            <span>{{ resMessage }}</span>
            <i class="fas fa-spinner fa-spin" v-if="resSpin"></i>
            <span class="text-green-700 font-bold f-18">{{ resSuccess }}</span>
            <span class="text-red-700 font-bold f-18">{{ resFail }}</span>
          </div>
          <div class="flex justify-center">
            <button type="submit" class="btn btn-auth" id="sendBtn">
              Save
            </button>
            <button
              type="button"
              class="btn-auth inverted"
              @click="edit = false"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    <color-mode></color-mode>
  </div>
</template>

<script>
export default {
  data() {
    return {
      resSpin: false,
      resSuccess: null,
      resFail: null,
      resMessage: null,
      edit: false,
      name: null,
      image: null
    };
  },
  computed: {
    user() {
      return this.$store.getters["user/data"];
    }
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    readURL() {
      var input = document.querySelector("#file");
      if (input.files && input.files[0]) {
        // Check if file is an image
        if (
          input.files[0].type != "image/png" &&
          input.files[0].type != "image/jpg" &&
          input.files[0].type != "image/jpeg" &&
          input.files[0].type != "image/gif"
        ) {
          return;
        }

        // Show Image
        var reader = new FileReader();
        reader.onload = function(e) {
          document
            .getElementById("profilePic")
            .setAttribute("src", e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
        this.setImage();
      }
    },
    setImage() {
      var imagefile = document.querySelector("#file");
      if (imagefile) {
        this.image = imagefile.files[0];
      }
    },
    editUser() {
      this.edit = true;
      this.name = this.user.name;
    },
    updateUser() {
      this.resSpin = true;
      this.resMessage = "updating in...";
      this.resSuccess = null;
      this.resFail = null;
      document.getElementById("sendBtn").disabled = true;

      var formData = new FormData();

      if (this.image) {
        formData.append("image", this.image);
      }

      formData.append("name", this.name);

      this.$axios
        .$post("me/update", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + this.$store.getters["user/getToken"]
          }
        })
        .then(result => {
          this.resMessage = null;
          this.resSuccess = result.message;
          this.$toast.success(result.message);
          let vm = this;
          this.$store
            .dispatch("user/getData")
            .then(result => {
              setTimeout(
                function() {
                  vm.resMessage = null;
                  vm.resSuccess = null;
                  vm.resFail = null;
                  vm.resSpin = false;
                  vm.image = null;
                  document.getElementById("sendBtn").disabled = false;
                  vm.edit = false;
                },
                2000,
                vm
              );
            })
            .catch(err => {});
        })
        .catch(err => {
          document.getElementById("sendBtn").disabled = false;
          this.resSpin = true;
          this.resMessage = null;
          this.resSuccess = null;
          if (err.response.data.errors) {
            if (err.response.data.errors.name) {
              this.$toast.error(err.response.data.errors.name);
              // throw err.response.data.errors.name[0];
              this.resFail = err.response.data.errors.name[0];
            }
            if (err.response.data.errors.image) {
              this.$toast.error(err.response.data.errors.image);
              // throw err.response.data.errors.image[0];
              this.resFail = err.response.data.errors.image[0];
            }
          } else {
            // throw err.response.data.message;
            this.resFail = err.response.data.message;
          }
        });
    }
  }
};
</script>
