<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div v-if="!showVerificationForm" class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Login below to manage your sprints</small>
          </div>
          <div v-if="alertText">
            <base-alert type="danger">{{ alertText }}</base-alert>
          </div>
          <form role="form">
            <base-input
              class="input-group-alternative mb-3"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model="model.email"
            >
            </base-input>

            <base-input
              class="input-group-alternative"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="model.password"
            >
            </base-input>
            <div class="text-center">
              <base-button type="primary" class="my-4" v-on:click="signIn"
                >Sign in</base-button
              >
            </div>
          </form>
        </div>
      </div>

      <!-- verification form -->
      <div v-if="showVerificationForm" class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4 text-red">
            <small>Your account is not yet verified. Please verify it below to continue.</small>
          </div>
          <div v-if="changePasswordMessage">
            <base-alert :type="changePasswordMessage.type">{{ changePasswordMessage.message }}</base-alert>
          </div>
          <form role="form">
            <base-input
              class="input-group-alternative mb-3"
              placeholder="Current Password"
              type="password"
              addon-left-icon="ni ni-email-83"
              v-model="changePassword.currentPassword"
            >
            </base-input>
            <base-input
              class="input-group-alternative"
              placeholder="New Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="changePassword.newPassword"
            >
            </base-input>
            <base-input
              class="input-group-alternative"
              placeholder="Confirm New Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="changePassword.newPasswordConfirmation"
            >
            </base-input>
            <div class="text-center">
              <base-button type="primary" class="my-4" v-on:click="updatePassword"
                >Submit</base-button
              >
            </div>
          </form>
        </div>
      </div>
      <!-- end of verification form -->
      
      <div class="row mt-3">
        <div class="col-sm"></div>
        <div class="col-sm">
          <router-link to="forgot-password"><small>Forgot password?</small></router-link>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
import router from "./../router";
import api from "./../api/api";

export default {
  name: "login",
  data() {
    return {
      alertText: null,
      showVerificationForm: false,
      model: {
        email: "",
        password: "",
      },
      changePasswordMessage: null,
      changePasswordUser: null,
      changePassword: {
        currentPassword: "",
        newPassword: "",
        newPasswordConfirmation: "",
      },
    };
  },
  methods: {
    async signIn() {
      if (this.model.email.trim() == "" || this.model.password.trim() == "") {
        this.alertText = "Username and password required."
      } else {
        try {
          const { email, password } = this.model
          let signin = await Auth.signIn(email.trim(), password.trim())
          if (signin.challengeName === "NEW_PASSWORD_REQUIRED") {
            this.changePasswordUser = signin
            this.showVerificationForm = true
          } else {
            this.$store.dispatch('fetchLoginUser')
            this.$store.dispatch('fetchAllSprints')
            this.$store.dispatch('fetchAllUserProfiles')
            router.push({ name: "dashboard" })
          }
        } catch (e) {
            console.log(e)
          this.alertText = "Invalid username or password."
        }
      }
    },
    async updatePassword() {
      this.changePasswordMessage = null;

      if (!this.validateChangePasswordForm()) {
        this.changePasswordMessage = {
          message: "Validation failed.",
          type: "danger",
        };
      } else {
      api
        .completeNewPassword(
          this.changePasswordUser,
          this.changePassword.newPassword
        )
        .then(() => {
          this.changePasswordMessage = {
            message: "Password updated successfully. Redirecting...",
            type: "success",
          };
          this.changePassword = {
            currentPassword: "",
            newPassword: "",
            newPasswordConfirmation: "",
          };
          this.$store.dispatch('fetchAllUserProfiles')
          this.$store.dispatch('fetchAllSprints')
          this.$store.dispatch('fetchLoginUser').then(() => {
              router.push({ name: "dashboard" })
          })
        })
        .catch((e) => {
          console.log(e);
          this.changePasswordMessage = {
            message: "Failed to update password.",
            type: "danger",
          };
        });
      }
    },
    validateChangePasswordForm() {
      return (
        this.changePassword.currentPassword.trim().length > 0 &&
        this.changePassword.newPassword.trim().length > 8 &&
        this.changePassword.newPassword.trim() ===
          this.changePassword.newPasswordConfirmation.trim()
      );
    },
  },
};
</script>
<style></style>
