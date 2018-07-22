<template>
  <div class="hello">

  </div>
</template>

<script>
  import Base from "@/components/Base"

  export default {
    name: 'HelloWorld',
    extends: Base,
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted() {
      this.$router.push('/admin')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
