<template>
  <base-nav
    class="navbar-top navbar-dark"
    id="navbar-main"
    :show-toggle-button="false"
    expand
  >
    <form
      class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto"
    >
    </form>
    <ul class="navbar-nav align-items-center d-none d-md-flex">
      <li class="nav-item dropdown">
        <base-dropdown class="nav-link pr-0">
          <div class="media align-items-center usericon" slot="title">
            <span class="avatar avatar-sm rounded-circle">
              <i class="ni ni-single-02"></i>
            </span>
            <div class="media-body ml-2 d-none d-lg-block">
              <span class="mb-0 text-sm  font-weight-bold">{{
                loginUser.name
              }}</span>
            </div>
          </div>

          <template>
            <div class=" dropdown-header noti-title">
              <h6 class="text-overflow m-0">Welcome!</h6>
            </div>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-single-02"></i>
              <span>My profile</span>
            </router-link>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-settings-gear-65"></i>
              <span>Settings</span>
            </router-link>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-calendar-grid-58"></i>
              <span>Activity</span>
            </router-link>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-support-16"></i>
              <span>Support</span>
            </router-link>
            <div class="dropdown-divider"></div>
            <router-link to="/logout" class="dropdown-item">
              <i class="ni ni-user-run"></i>
              <span>Logout</span>
            </router-link>
          </template>
        </base-dropdown>
      </li>
    </ul>
  </base-nav>
</template>

<script>
export default {
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchQuery: "",
    };
  },
  computed: {
    loginUser: function() {
      return this.$store.getters.loginUser;
    },
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>

<style scoped>
  .usericon:hover {
    cursor: pointer;
  }
</style>