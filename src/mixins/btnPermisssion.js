export default {
  computed: {
    isHasp() {
      return function(a) {
        return !this.$store.state.user.userInfo.roles.points.includes(a)
      }
    }
  }
}
