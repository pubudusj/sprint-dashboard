<template>
  <div>
    <base-header
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style="min-height: 200px; background-size: cover; background-position: center top;"
    >
      <!-- Mask -->
      <span class="mask bg-gradient-success opacity-8"></span>
      <!-- Header container -->
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-12 order-xl-1">
          <card shadow type="secondary">
            <div slot="header" class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">Create New User</h3>
                </div>
              </div>
            </div>
            <div v-if="message">
              <base-alert :type="message.type">{{
                message.message
              }}</base-alert>
            </div>
            <template>
              <form @submit.prevent>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-6">
                      <base-input
                        alternative=""
                        label="Email address *"
                        input-classes="form-control-alternative"
                        v-model="user.email"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <base-input
                        alternative=""
                        label="First name *"
                        input-classes="form-control-alternative"
                        v-model="user.firstName"
                      />
                    </div>
                    <div class="col-lg-6">
                      <base-input
                        alternative=""
                        label="Last name"
                        input-classes="form-control-alternative"
                        v-model="user.lastName"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <base-input
                        alternative=""
                        label="Department"
                        input-classes="form-control-alternative"
                        v-model="user.department"
                      />
                    </div>
                    <div class="col-lg-6">
                      <base-input
                        alternative=""
                        label="Designation"
                        input-classes="form-control-alternative"
                        v-model="user.designation"
                      />
                    </div>
                  </div>
                  <button v-on:click="createUser" class="btn btn-info">Create</button>
                </div>
              </form>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "./../api/api";

export default {
  name: "create-user",
  data() {
    return {
      user: {
        email: "",
        firstName: "",
        lastName: "",
        department: "",
        designation: "",
      },
      message: null,
    };
  },
  methods: {
    async createUser() {
      this.message = null

      if (!this.validateCreateUserForm()) {
        this.message = {
          message: "Validation failed.",
          type: "danger",
        };
      } else {
      api
        .createNewUser(this.user)
        .then((data) => {
          api.addUserToUsersGroup(this.user)
          api.createUserProfile({
            firstname: this.user.firstName,
            lastname: this.user.lastName,
            designation: this.user.designation,
            department: this.user.department,
            id: data.message.find((x) => x.Name === "sub").Value
          })
          this.message = {
            message: "User created successfully.",
            type: "success",
          };
          this.user = {
                email: "",
                firstName: "",
                lastName: "",
                department: "",
                designation: "",
            }
        })
        .catch((e) => {
          console.log(e);
          this.message = {
            message: "Failed to create new user.",
            type: "danger",
          };
        });
      }
    },
    validateCreateUserForm() {
      return this.user.email != "" && this.user.firstName !=""
    },
  }
};
</script>
<style></style>
