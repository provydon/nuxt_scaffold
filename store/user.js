export const state = () => ({
  data: {}
});

export const mutations = {
  setData(state, data) {
    state.data = data;
  },
  editData(state, editedData) {
    state.data = editedData;
  }
};

export const actions = {
  getData(vuexContext) {
    return this.$axios
      .$get("/me", {
        headers: {
          Authorization: "Bearer " + vuexContext.getters.getToken, //the token is a variable which holds the token
        }
      })
      .then(result => {
        vuexContext.commit("setData", result.data);
      })
      .catch(err => {
        console.log(err);
        // this.$toast.error(err.response.data.message);
      });
  }
};

export const getters = {
  data(state) {
    return state.data;
  },
  getToken(state, getters, rootState) {
    return rootState.auth.token; // Here I assume university is the another  module
  }
};
