<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div v-if="!showVerificationForm" class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Reset your password below</small>
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
            <div class="text-center">
              <base-button type="primary" class="my-4" v-on:click="submitForgotPassword"
                >Submit</base-button
              >
            </div>
          </form>
        </div>
      </div>

      <!-- verification form -->
      <div v-if="showVerificationForm" class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4 text-blue">
            <small>Please submit new password with the code received via email.</small>
          </div>
          <div v-if="verifyPasswordMessage">
            <base-alert :type="verifyPasswordMessage.type">{{ verifyPasswordMessage.message }}</base-alert>
          </div>
          <form role="form">
            <base-input
              class="input-group-alternative mb-3"
              placeholder="Email"
              readonly=true
              addon-left-icon="ni ni-email-83"
              v-model="verifyPassword.email"
            >
            </base-input>
            <base-input
              class="input-group-alternative"
              placeholder="Verification Code"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="verifyPassword.code"
            >
            </base-input>
            <base-input
              class="input-group-alternative"
              placeholder="New Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="verifyPassword.newPassword"
            >
            </base-input>
            <base-input
              class="input-group-alternative"
              placeholder="Confirm New Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="verifyPassword.newPasswordConfirmation"
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
    </div>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
import router from "./../router";

export default {
  name: "forgotPassword",
  data() {
    return {
      alertText: null,
      showVerificationForm: false,
      model: {
        email: "",
      },
      verifyPasswordMessage: null,
      verifyPasswordUser: null,
      verifyPassword: {
        email: "",
        code: "",
        newPassword: "",
        newPasswordConfirmation: "",
      }
    };
  },
  methods: {
    async submitForgotPassword() {
      if (!this.model.email.trim()) {
        this.alertText = "Email required."
      } else {
        try {
          const { email } = this.model
          await Auth.forgotPassword(email.trim())
          this.showVerificationForm=true
          this.verifyPassword.email = this.model.email
        } catch {
            this.alertText = "Failed to send password reset code. Please try again."
        }
      }
    },
    async updatePassword() {
      this.verifyPasswordMessage = null;
      if (!this.validateverifyPasswordForm()) {
        this.verifyPasswordMessage = {
          message: "Validation failed.",
          type: "danger",
        };
      } else {
      Auth
        .forgotPasswordSubmit(
          this.verifyPassword.email.trim(),
          this.verifyPassword.code.trim(),
          this.verifyPassword.newPassword.trim()
        )
        .then(() => {
          this.verifyPasswordMessage = {
            message: "Password updated successfully. Redirecting...",
            type: "success",
          };
          this.verifyPassword = {
            currentPassword: "",
            newPassword: "",
            newPasswordConfirmation: "",
          };
          router.push({ name: "login" })
        })
        .catch(() => {
          this.verifyPasswordMessage = {
            message: "Failed to reset password.",
            type: "danger",
          }
          });
        }
      },
    validateverifyPasswordForm() {
      return (
        this.verifyPassword.email.trim().length > 0 &&
        this.verifyPassword.code.trim().length > 0 &&
        this.verifyPassword.newPassword.trim().length > 8 &&
        this.verifyPassword.newPassword.trim() ===
          this.verifyPassword.newPasswordConfirmation.trim()
      );
    },
  }
};
</script>
<style></style>
