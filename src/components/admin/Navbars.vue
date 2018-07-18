<template>
  <v-toolbar color="indigo" dark fixed app
             :clipped-left="$vuetify.breakpoint.lgAndUp"
             fixed
  >
    <v-toolbar-side-icon @click.stop="toggleDrawer()"></v-toolbar-side-icon>
    <v-toolbar-title class="headline">สระบุรีฟาร์ม</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-title class="title">{{currentUser ? currentUser.name : ''}}</v-toolbar-title>
  </v-toolbar>
</template>
<script>


  export default {
    data() {
      return {
        currentUser: null
      }
    },
    methods: {
      logout: function () {
        this.$router.push('/login');
      },
      load: function () {
        if (localStorage.getItem('user')) {
          this.currentUser = JSON.parse(localStorage.user);
        }
      },
      toggleDrawer: function () {
        this.$store.dispatch("menu/toggle");
      }
    },
    mounted() {
      console.log("Navbar Mounted");
      this.load();
      console.log(this.currentUser);

    }
  }
</script>
