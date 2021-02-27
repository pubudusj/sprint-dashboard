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
            icon: 'fa fa-tv text-primary',
            path: '/dashboard'
          }"
        />
        <sidebar-item :link="{name: 'Current Sprint', icon: 'fa fa-columns text-primary', path: '/current-sprint'}"/>
        <sidebar-item :link="{name: 'Backlog', icon: 'fa fa-tasks text-red', path: '/backlog'}"/>
        <sidebar-item :link="{name: 'Past Sprints', icon: 'fa fa-tasks text-default', path: '/archived'}"/>
        <sidebar-item :link="{name: 'Create Ticket', icon: 'fa fa-plus-square text-green', path: '/create-ticket'}"/>
        <div v-if="userIsAdmin" class="dropdown-divider"></div>
        <sidebar-item v-if="userIsAdmin" :link="{name: 'Create Sprint', icon: 'fa fa-folder-plus text-primary', path: '/create-sprint'}"/>
        <sidebar-item v-if="userIsAdmin" :link="{name: 'Create User', icon: 'fa fa-user-plus text-purple', path: '/create-user'}"/>
        <sidebar-item v-if="userIsAdmin" :link="{name: 'Manage Users', icon: 'fa fa-user-cog text-red', path: '/users'}"/>
        <div class="dropdown-divider"></div>
        <sidebar-item :link="{name: 'My Profile', icon: 'ni ni-single-02 text-yellow', path: '/profile'}"/>

      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" class="main" origin="center top" mode="out-in">
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
.main {
  min-height: 700px;
}
</style>
