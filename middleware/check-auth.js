export default function(context) {
  context.store
    .dispatch("auth/initAuth", context.req)
    .then(result => {
      context.store
        .dispatch("user/getData")
        .then(result => {})
        .catch(err => {});
    })
    .catch(err => {});
}
