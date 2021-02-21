<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
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
      <div class="row mt-3">
        <div class="col-sm"></div>
        <div class="col-sm">
          <a href="#" class="text-light"><small>Forgot password?</small></a>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
import router from "./../router";

export default {
  name: "login",
  data() {
    return {
      alertText: null,
      model: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async signIn() {
      if (this.model.email == "" || this.model.password == "") {
        this.alertText = "Username and password required.";
      } else {
        try {
          const { email, password } = this.model;
          await Auth.signIn(email, password);
          this.$store.dispatch('fetchLoginUser')
          router.push({ name: "dashboard" });
        } catch (e) {
            console.log(e)
          this.alertText = "Invalid username or password.";
        }
      }
    },
  },
};
</script>
<style></style>
