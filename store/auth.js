import Cookie from "js-cookie";
export const state = () => ({
  token: null
});

export const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  clearToken(state) {
    state.token = null;
  }
};

export const actions = {
  initAuth(vuexContext, req) {
    let token;

    if (req) {
      if (!req.headers.cookie) {
        return;
      }

      let jwtCookie;

      // Get Token
      jwtCookie = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith("jwt="));

      if (!jwtCookie) {
        return;
      }
      token = jwtCookie.split("=")[1];
    } else {
      token = localStorage.getItem("token");
    }

    vuexContext.commit("setToken", token);
  },
  authtenticateUser(vuexContext, authData) {
    let authUrl = "/register";
    if (authData.isLogin) {
      authUrl = "/login";
    }
    return this.$axios
      .$post(authUrl, {
        email: authData.email,
        password: authData.password,
        name: authData.name
      })
      .then(result => {
        vuexContext.commit("setToken", result.token);
        localStorage.setItem("token", result.token);
        Cookie.set("jwt", result.token);
        return result
      })
      .catch(err => {
        this.$toast.error(err.response.data.message);
        if (err.response.data.errors) {
          if (err.response.data.errors.email) {
            this.$toast.error(err.response.data.errors.email);
             throw err.response.data.errors.email[0]
          }
          if (err.response.data.errors.password) {
            this.$toast.error(err.response.data.errors.password);
            throw err.response.data.errors.password[0]
          }
          if (err.response.data.errors.name) {
            this.$toast.error(err.response.data.errors.name);
            throw err.response.data.errors.name[0]
          }
        }else{
          throw err.response.data.message
        }
      });
  },
  logout(vuexContext) {
    vuexContext.commit("clearToken");
    Cookie.remove("jwt");
    if (process.client) {
      localStorage.removeItem("token");
    }
  }
};

export const getters = {
  isAuthenticated(state) {
    return state.token != null;
  }
};
