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
                  <h3 class="mb-0">Create New Sprint</h3>
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
                    <div class="col-lg-4">
                      <base-input
                        alternative=""
                        label="Sprint Name"
                        input-classes="form-control-alternative"
                        v-model="sprint.title"
                      />
                    </div>
                    <div class="col-lg-8">
                      <base-input
                        alternative=""
                        label="Sprint Goal"
                        input-classes="form-control-alternative"
                        v-model="sprint.description"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <base-input
                        alternative=""
                        label="Start Date"
                        input-classes="form-control-alternative"
                        v-model="sprint.startAt"
                      />
                    </div>
                    <div class="col-lg-6">
                      <base-input
                        alternative=""
                        label="End Date"
                        input-classes="form-control-alternative"
                        v-model="sprint.endAt"
                      />
                    </div>
                  </div>
                  <button v-on:click="createSprint" class="btn btn-info">
                    Create
                  </button>
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
      sprint: {
        title: "",
        startAt: "",
        endAt: "",
        description: "",
      },
      message: null,
    };
  },
  methods: {
    async createSprint() {
      this.message = null;

      if (!this.validateCreateUserForm()) {
        this.message = {
          message: "Validation failed.",
          type: "danger",
        };
      } else {
        this.sprint.isCurrent = false;
        this.sprint.archived = false;
        this.sprint.startAt = parseInt(this.sprint.startAt);
        this.sprint.endAt = parseInt(this.sprint.endAt);
        this.sprint.sprintCreatedById = this.user.id
        console.log(this.sprint)
        api
          .createSprint(this.sprint)
          .then(() => {
            this.message = {
              message: "Sprint created successfully.",
              type: "success",
            };
            this.sprint = {
              title: "",
              startAt: "",
              endAt: "",
              description: "",
            };
          })
          .catch((e) => {
            console.log(e);
            this.message = {
              message: "Failed to create new sprint.",
              type: "danger",
            };
          });
      }
    },
    validateCreateUserForm() {
      return (
        this.sprint.title.trim() != "" &&
        this.sprint.description.trim() != "" &&
        this.sprint.startAt.trim() != "" &&
        this.sprint.endAt.trim() != ""
      );
    },
  },
  computed: {
    user() { return this.$store.getters.loginUser }
  },
};
</script>
<style></style>
