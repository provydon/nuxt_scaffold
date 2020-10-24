export default function(context) {
  if (context.store.getters["auth/isAuthenticated"]) {
    if (context.route.name == "register" || context.route.name == "login") {
      context.redirect("/home");
    }
  }
}
