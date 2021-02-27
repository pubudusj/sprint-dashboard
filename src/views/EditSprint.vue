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
                  <h3 class="mb-0">Edit Sprint</h3>
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
                  <div class="row">
                    <div class="col-lg-6" v-if="!currentSprint || (currentSprint && currentSprint.id == sprint.id)">
                      <base-checkbox
                        :value="sprint.isCurrent"
                        class="mb-3"
                        v-model="sprint.isCurrent"
                        ><b>Set as current ?</b>
                        {{ sprint.isCurrent ? "Yes" : "No" }}</base-checkbox
                      >
                    </div>
                    <div class="col-lg-6">
                      <base-checkbox
                        :value="sprint.archived"
                        class="mb-3"
                        v-model="sprint.archived"
                        ><b>Set as archived ?</b>
                        {{ sprint.archived ? "Yes" : "No" }}</base-checkbox
                      >
                      <span class="text-sm text-warning mb-3">* All tickets will be moved to backlog</span>
                    </div>
                  </div>
                  <button v-on:click="updateSprint" class="btn btn-info">
                    Update
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
      message: null,
    };
  },
  methods: {
    async updateSprint() {
      this.message = null;

      if (!this.validateCreateUserForm()) {
        this.message = {
          message: "Validation failed.",
          type: "danger",
        };
      } else {
        let updateSprint = {
          isCurrent: this.sprint.isCurrent,
          archived: this.sprint.archived,
          startAt: parseInt(this.sprint.startAt),
          endAt: parseInt(this.sprint.endAt),
          id: this.sprint.id,
          title: this.sprint.title,
          description: this.sprint.description,
        };

        api
          .updateSprint(updateSprint)
          .then(() => {
            this.message = {
              message: "Sprint updated successfully.",
              type: "success",
            };
          })
          .catch((e) => {
            console.log(e);
            this.message = {
              message: "Failed to update sprint.",
              type: "danger",
            };
          });
      }
    },
    validateCreateUserForm() {
      return (
        this.sprint.title.trim() != "" &&
        this.sprint.description.trim() != "" &&
        this.sprint.startAt != "" &&
        this.sprint.endAt != ""
      );
    },
  },
  computed: {
    sprint() {
      return this.$store.getters.getSprintById(this.$route.params.id);
    },
    currentSprint() {
      return this.$store.getters.currentSprint
    }
  },
};
</script>
<style></style>
