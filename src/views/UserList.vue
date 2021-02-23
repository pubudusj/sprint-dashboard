<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
    </base-header>
    <div class="container-fluid mt--7">
      <div class="card shadow">
        <div class="card-header border-0">
          <div class="row align-items-center">
            <div class="col">
              <h3 class="mb-0">{{ titlePrefix }} Users</h3>
            </div>
            <div v-if="!onlyActive" class="col text-right">
              <base-button v-on:click="toggleActive" type="primary" size="sm"
                >Active Users</base-button
              >
            </div>
            <div v-if="onlyActive" class="col text-right">
              <base-button v-on:click="toggleActive" type="primary" size="sm"
                >All Users</base-button
              >
            </div>
          </div>
        </div>
        <div class="table-responsive">
            <table class="table tablesorter">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Is Admin</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(row, index) in users" :key="index">
                    <th scope="row">
                        <div class="media align-items-center">
                        <div class="media-body">
                            <span class="name mb-0 text-sm">{{ getProfile(row) ? getProfile(row).firstname + ' ' +  getProfile(row).lastname : '-' }}</span>
                        </div>
                        </div>
                    </th>
                    <td>
                  <span class="status">{{ row.email }}</span>
                    </td>
                    <td>
                  <span class="status">{{ getProfile(row) ? getProfile(row).department : ''}}</span>
                    </td>
                    <td>
                        <span class="status">
                            <badge :type="isActive(row.status) ? 'success' : 'warning'">{{ isActive(row.status) ? 'Active' : 'Inactive' }}</badge>
                        </span>
                    </td>
                    <td>
                        <span class="status">
                            <badge v-if="isAdmin(row)" type='success'>Yes</badge>
                        </span>
                    </td>
                    <td class="text-right">
                        <base-button
                        v-if="eligibleForAdmin(row)"
                        size="sm"
                        type="primary"
                        v-on:click="makeAdmin(row)"
                        >Make Admin</base-button
                        >
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from './../api/api'

export default {
  name: "userlist",
  data() {
    return {
      allUsers: null,
      userProfiles: null,
      users: null,
      onlyActive: false,
      titlePrefix: "All",
      confirmModal: true,
      adminUsers: null,
    };
  },
  created() {
    this.$store.dispatch("fetchAllUsers").then((data) => {
      this.allUsers = data;
      this.users = data;
    });
    this.$store.dispatch("fetchAllAdminUsers").then((data) => {
        this.adminUsers = data
    });
    this.$store.dispatch("fetchAllUserProfiles").then((data) => {
        this.userProfiles = data
    });
  },
  methods: {
    toggleActive() {
      this.onlyActive = !this.onlyActive;
      this.titlePrefix = this.onlyActive ? "Active" : "All";
      if (this.onlyActive) {
        this.users = this.allUsers.filter(
          (user) => user.status === "CONFIRMED"
        );
      } else {
        this.users = this.allUsers;
      }
    },
    isAdmin: function(user) {
        return this.adminUsers && this.adminUsers.some(x =>  x.id === user.id)
    },
    eligibleForAdmin: function(user) {
        return this.adminUsers && user.status === "CONFIRMED" && 
            !this.adminUsers.some(x => x.id === user.id)
    },
    getProfile: function(user) {
      return this.userProfiles.filter(x => x.id === user.id)[0]
    },
    makeAdmin: function(user) {
        let conf = confirm('Do you want to make this user an admin?')
        if (conf) {
            api.makeUserAdmin(user.email).then(() => {
                this.$store.dispatch("fetchAllUsers").then((data) => {
                    this.allUsers = data;
                    this.users = data;
                    })
                this.$store.dispatch("fetchAllAdminUsers").then((data) => {
                        this.adminUsers = data
                    });
                
            }).catch({

            })
        }
        return;
    },
    isActive: (status) => {
      return status === "CONFIRMED"
    },
  },
};
</script>
<style></style>
