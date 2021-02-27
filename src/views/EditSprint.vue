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
                        label="Sprint Name *"
                        input-classes="form-control-alternative"
                        v-model="sprint.title"
                      />
                    </div>
                    <div class="col-lg-8">
                      <base-input
                        alternative=""
                        label="Sprint Goal *"
                        input-classes="form-control-alternative"
                        v-model="sprint.description"
                      />
                    </div>
                  </div>
                  <div class="row date-row">
                    <div class="col-lg-6">*
                    <template>
                      <v-md-date-range-picker
                        @change="handleDateChange"
                        :start-date="datePickerStartDate"
                        :end-date="datePickerEndDate"
                      ></v-md-date-range-picker>
                    </template>
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="col-lg-6"
                      v-if="
                        !currentSprint ||
                          (currentSprint && currentSprint.id == sprint.id)
                      "
                    >
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
                      <span class="text-sm text-warning mb-3"
                        >* All tickets will be moved to backlog</span
                      >
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
import { Hub } from "aws-amplify";
import Vue from 'vue';
import VMdDateRangePicker from "v-md-date-range-picker";
import moment from 'moment'

Vue.use(VMdDateRangePicker);

export default {
  name: "create-user",
  data() {
    return {
      message: null,
    };
  },
  methods: {
    handleDateChange (values) {
      this.sprint.startAt = values[0].unix()
      this.sprint.endAt = values[1].unix()
    },
    async updateSprint() {
      this.message = null;

      if (!this.validateCreateUserForm()) {
        this.message = {
          message: "Validation failed.",
          type: "danger",
        };
      } else {
        let updateSprint = {
          isCurrent:
            this.sprint.archived == true ? false : this.sprint.isCurrent,
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
            if (
              this.sprint.archived == true &&
              this.sprint.tickets.items.length > 0
            ) {
              this.sprint.tickets.items.forEach(function(ticket) {
                if (ticket.ticket.status != "done") {
                  api
                    .removeTicketFromSprint({
                      id: ticket.id,
                    })
                    .then(function() {
                      api
                        .updateTicket({
                          id: ticket.ticket.id,
                          status: "backlog",
                        })
                        .then(() => {
                          Hub.dispatch("SprintsChannel", {
                            event: "ticketMoved",
                            data: {},
                            message: "",
                          });
                        });
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                }
              });
            }

            this.message = {
              message: "Sprint updated successfully.",
              type: "success",
            };
            setTimeout(() => this.$router.push("/backlog"), 500);
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
    datePickerStartDate() {
      try {
          let date = new Date(this.sprint.startAt * 1000);
          return moment(date).format("YYYY-MM-DD");
      } catch {
        return moment().format("YYYY-MM-DD");
      }
    },
    datePickerEndDate() {
      try {
          let date = new Date(this.sprint.endAt * 1000);
          return moment(date).format("YYYY-MM-DD");
      } catch {
        return moment().format("YYYY-MM-DD");
      }
    },
    sprint() {
      return this.$store.getters.getSprintById(this.$route.params.id);
    },
    currentSprint() {
      return this.$store.getters.currentSprint;
    },
  },
};
</script>
<style scoped>
.activator-wrapper {
  color: red !important;
}
.date-row {
  margin: 30px 0;
}
</style>