<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon"
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'ni ni-tv-2 text-primary',
            path: '/dashboard'
          }"
        />
        <sidebar-item :link="{name: 'Backlog', icon: 'ni ni-circle-08 text-pink', path: '/backlog'}"/>
        <sidebar-item :link="{name: 'Create Ticket', icon: 'ni ni-circle-08 text-pink', path: '/create-ticket'}"/>

        <!-- <sidebar-item :link="{name: 'Icons', icon: 'ni ni-planet text-blue', path: '/icons'}"/>
        <sidebar-item :link="{name: 'Maps', icon: 'ni ni-pin-3 text-orange', path: '/maps'}"/> -->
        <div v-if="userIsAdmin" class="dropdown-divider"></div>
        <sidebar-item v-if="userIsAdmin" :link="{name: 'Create Sprint', icon: 'ni ni-circle-08 text-pink', path: '/create-sprint'}"/>
        <sidebar-item v-if="userIsAdmin" :link="{name: 'Create User', icon: 'ni ni-circle-08 text-pink', path: '/create-user'}"/>
        <sidebar-item v-if="userIsAdmin" :link="{name: 'Manage Users', icon: 'ni ni-circle-08 text-pink', path: '/users'}"/>
        <!-- <sidebar-item :link="{name: 'Tables', icon: 'ni ni-bullet-list-67 text-red', path: '/tables'}"/>
        <sidebar-item :link="{name: 'Login', icon: 'ni ni-key-25 text-info', path: '/login'}"/> -->
        <div class="dropdown-divider"></div>
        <sidebar-item :link="{name: 'My Profile', icon: 'ni ni-single-02 text-yellow', path: '/profile'}"/>

      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
      };
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    },
    computed: {
      userIsAdmin() {
        return this.$store.getters.isLoginUserAdmin;
      }
    },
  };
</script>
<style lang="scss">
</style>
