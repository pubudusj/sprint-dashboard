<template>
    <div>
        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                     style="min-height: 300px; background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span class="mask bg-gradient-success opacity-8"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-lg-7 col-md-10">
                        <h1 class="display-2 text-white">Hello {{ user.name }}</h1>
                    </div>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Change Password</h3>
                                </div>
                            </div>
                        </div>
                        <div v-if="changePasswordMessage">
                            <base-alert :type="changePasswordMessage.type">{{ changePasswordMessage.message }}</base-alert>
                        </div>
                        <template>
                            <form @submit.prevent>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <base-input alternative=""
                                                        label="Current Password"
                                                        input-classes="form-control-alternative"
                                                        v-model="changePassword.currentPassword"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <base-input alternative=""
                                                        label="New Password"
                                                        placeholder="Minimum 6 characters"
                                                        input-classes="form-control-alternative"
                                                        v-model="changePassword.newPassword"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        
                                        <div class="col-lg-12">
                                            <base-input alternative=""
                                                        label="Repeat New Password"
                                                        input-classes="form-control-alternative"
                                                        v-model="changePassword.newPasswordConfirmation"
                                            />
                                        </div>
                                    </div>
                                    <a href="#" v-on:click="updatePassword" class="btn btn-info">Submit</a>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>

                <div class="col-xl-8 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">My account</h3>
                                </div>
                            </div>
                        </div>
                        <template>
                            <form @submit.prevent>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Email address"
                                                        placeholder="jesse@example.com"
                                                        input-classes="form-control-alternative"
                                                        readonly="true"
                                                        v-model="user.email"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="First name"
                                                        input-classes="form-control-alternative"
                                                        v-model="user.firstName"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Last name"
                                                        input-classes="form-control-alternative"
                                                        v-model="user.lastName"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Department"
                                                        input-classes="form-control-alternative"
                                                        v-model="user.department"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Designation"
                                                        input-classes="form-control-alternative"
                                                        v-model="user.designation"
                                            />
                                        </div>
                                    </div>
                                    <a href="#" v-on:click="updateProfile" class="btn btn-info">Update</a>
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
import api from './../api/api'

  export default {
    name: 'user-profile',
    data() {
      return {
        user: {
          name: '',
          email: '',
          firstName: '',
          lastName: '',
          department: '',
          designation: '',
        },
        changePassword: {
            currentPassword: '',
            newPassword: '',
            newPasswordConfirmation: '',
        },
        profileMessage: null,
        changePasswordMessage: null,
      }
    },
    methods: {
        async updateProfile() {

        },
        async updatePassword() {
            this.changePasswordMessage = null

            if (! this.validateChangePasswordForm()) {
                this.changePasswordMessage = {
                    message: 'Validation failed.',
                    type: 'danger',
                }
            }

            const currentUser = await api.fetchLoginUser();
            api.updatePassword(currentUser, this.changePassword.currentPassword, this.changePassword.newPassword).then(() => {
                this.changePasswordMessage = {
                    message: 'Password updated successfully.',
                    type: 'success',
                }
                this.changePassword = {
                    currentPassword: '',
                    newPassword: '',
                    newPasswordConfirmation: '',
                }
            }).catch(() => {
                this.changePasswordMessage = {
                    message: 'Failed to update password.',
                    type: 'danger',
                }
            });
        },
        validateChangePasswordForm() {
            return (
                this.changePassword.currentPassword.length > 0 &&
                this.changePassword.newPassword.length > 6 &&
                this.changePassword.newPassword === this.changePassword.newPasswordConfirmation
            );
        }
    },
    created() {
        this.user = this.$store.getters.loginUser;
    },
  };
</script>
<style></style>
