<template>
  <v-navigation-drawer
    fixed
    :clipped="$vuetify.breakpoint.mdAndUp"
    app
    :value="drawer" @input="updateDrawer">
    <v-list>
      <v-list-tile :to="{name:'home'}" exact>
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile exact>
        <v-list-tile-action>
          <v-icon>mdi-chart-bar</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Example Chart</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-divider/>
    <v-list>
      <v-list-tile :to="{name:'user-home'}" exact>
        <v-list-tile-action>
          <v-icon>mdi-account</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>การจัดการผู้ใช้</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="{name:'role-home'}" exact>
        <v-list-tile-action>
          <v-icon>mdi-account-group</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>การจัดการสิทธิ์</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile :to="{name:'choice-home'}" exact>
        <v-list-tile-action>
          <v-icon>mdi-view-list</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>การจัดการตัวเลือก</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile :to="{name:'report-home'}" exact>
        <v-list-tile-action>
          <v-icon>mdi-settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>ตั้งค่าเป้าหมาย</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="{name:'report-quater-show'}" exact>
        <v-list-tile-action>
          <v-icon>mdi-file-document-box-multiple</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>ดูรายงาน</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-divider/>
    <v-list>
      <v-list-tile :to="{name:'pig-home'}" exact>
        <v-list-tile-action>
          <v-icon>mdi-account</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>ค้นหาสุกร</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

    </v-list>
    <v-divider/>
    <v-list>

      <v-list-tile @click="logout" color="" exact>
        <v-list-tile-action>
          <v-icon color="red">mdi-logout</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title style="color:red;">ออกจากระบบ</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

  </v-navigation-drawer>

</template>

<script>

  import {mapState, mapActions} from "vuex"

  export default {
    components: {},
    data: () => ({}),
    computed: {
      ...mapState({
        drawer: state => state.menu.visible,
      }),

    },
    methods: {
      updateDrawer: function (bool) {
        this.$store.dispatch('menu/toggle', bool)
      },
      logout: async function () {
        await this.$store.dispatch('login/logout');
        this.$router.push("/login")
      }
    },
    mounted() {
      console.log('Menu mounted.')
      console.log('drawer', this.drawer)
    },


  }
</script>
