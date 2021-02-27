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
                  <h3 class="mb-0">Edit Ticket</h3>
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
                    <div class="col-lg-12">
                      <base-input
                        alternative=""
                        label="Title *"
                        input-classes="form-control-alternative"
                        v-model="ticket.title"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <label class="form-control-label">Description</label>
                      <textarea
                        label="Description"
                        rows="3"
                        class="form-control"
                        v-model="ticket.description"
                      ></textarea>
                      <label class="form-control-label"></label>
                    </div>
                  </div>
                  <div class="row" style="margin-bottom: 20px">
                    <div class="col-lg-3">
                      <label class="form-control-label select-label"
                        >Type *</label
                      >
                      <base-dropdown>
                        <template v-slot:title>
                          <base-button type="secondary" class="dropdown-toggle">
                            <i :class="typeIcon(ticket.type.id)"></i> {{ ticket.type.title }}
                          </base-button>
                        </template>
                        <div
                          v-for="type in typesList"
                          v-on:click="assignType(type)"
                          :key="type.id"
                          class="dropdown-item"
                        >
                          <i :class="typeIcon(type.id)"></i>{{ type.title }}
                        </div>
                      </base-dropdown>
                    </div>
                    <div class="col-lg-4">
                      <label class="form-control-label select-label"
                        >Priority *</label
                      >
                      <base-dropdown>
                        <template v-slot:title>
                          <base-button type="secondary" class="dropdown-toggle">
                            <badge :type="priorityIcon(ticket.priority.id)">{{ ticket.priority.title }}</badge>
                          </base-button>
                        </template>
                        <div
                          v-for="priority in prioritiesList"
                          v-on:click="assignPriority(priority)"
                          :key="priority.id"
                          class="dropdown-item"
                        >
                          <badge :type="priorityIcon(priority.id)">{{ priority.title }}</badge>
                        </div>
                      </base-dropdown>
                    </div>
                    <div class="col-lg-5">
                      <label class="form-control-label select-label"
                        >Assignee</label
                      >
                      <base-dropdown>
                        <template v-slot:title>
                          <base-button type="secondary" class="dropdown-toggle">
                            {{
                              ticket.assignee
                                ? ticket.assignee.firstname +
                                  " " +
                                  ticket.assignee.lastname
                                : ""
                            }}
                          </base-button>
                        </template>
                        <!-- {{ assigneeList }} -->
                        <div
                          v-for="assignee in assigneeList"
                          v-on:click="assignAssignee(assignee)"
                          :key="assignee.id"
                          class="dropdown-item"
                        >
                          {{ assignee.firstname + " " + assignee.lastname }}
                        </div>
                      </base-dropdown>
                    </div>
                    <label class="form-control-label"></label>
                  </div>
                  <div class="row">
                    <div class="col-lg-4">
                      <base-input
                        alternative=""
                        label="Story Points"
                        type="number"
                        input-classes="form-control-alternative"
                        v-model="ticket.points"
                      />
                    </div>
                  </div>
                  <button v-on:click="updateTicket" class="btn btn-info">
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
  name: "create-ticket",
  data() {
    return {
      ticket: {
        id: "",
        title: "",
        description: "",
        type: "",
        priority: "",
        points: "",
        assignee: {},
      },
      message: null,
    };
  },
  methods: {
    async updateTicket() {
      this.message = null;

      if (!this.validateForm()) {
        this.message = {
          message: "Validation failed.",
          type: "danger",
        };
      } else {
        let ticketToSave = {
          id: this.ticket.id,
          title: this.ticket.title,
          description: this.ticket.description,
          type: this.ticket.type.id,
          priority: this.ticket.priority.id,
          points: this.ticket.points,
        };
        if (this.ticket.assignee.id !== null) {
          ticketToSave.ticketAssigneeId = this.ticket.assignee.id;
        } else {
          ticketToSave.ticketAssigneeId = null;
        }

        api
          .updateTicket(ticketToSave)
          .then(() => {
            this.message = {
              message: "Ticket updated successfully.",
              type: "success",
            };
            setTimeout(() => this.$router.push('/backlog'), 500)
          })
          .catch((e) => {
            console.log(e);
            this.message = {
              message: "Failed to update ticket.",
              type: "danger",
            };
          });
      }
    },
    validateForm() {
      return (
        this.ticket.title.trim() != "" &&
        this.ticket.type != "" &&
        this.ticket.priority != ""
      );
    },
    assignType(type) {
      this.ticket.type = type;
    },
    assignPriority(priority) {
      this.ticket.priority = priority;
    },
    assignAssignee(assignee) {
      this.ticket.assignee = assignee;
    },
  },
  created() {
    api.getTicketById(this.$route.params.id).then((data) => {
      let tk = data.data.getTicket;
      this.ticket = {
        id: this.$route.params.id,
        title: tk.title,
        description: tk.description,
        type: this.typesList.find((type) => type.id == tk.type),
        priority: this.prioritiesList.find(
          (priority) => priority.id == tk.priority
        ),
        points: tk.points,
        assignee: tk.assignee
          ? this.assigneeList.find((assignee) => assignee.id == tk.assignee.id)
          : {
              id: null,
              firstname: "No assignee",
              lastname: "",
            },
      };
    });
  },
  computed: {
    user() {
      return this.$store.getters.loginUser;
    },
    prioritiesList: function() {
      return this.$store.getters.ticketPrioritiesList;
    },
    typesList: function() {
      return this.$store.getters.ticketTypesList;
    },
    assigneeList: function() {
      let assignees = [
        {
          id: null,
          firstname: "No assignee",
          lastname: "",
        },
      ].concat(this.$store.getters.ticketAssignees);
      return assignees;
    },
    typeIcon: function() {
      return (type) => {
        if (type === 'bug') {
          return 'fa fa-bug text-danger';
        }else if (type === 'task') {
          return 'fa fa-check text-primary';
        } else if (type === 'story') {
          return 'fa fa-bookmark text-success';
        }
      }
    },
    priorityIcon: function() {
      return (priority) => {
          if (priority === 'highest') {
          return 'danger';
        }else if (priority === 'high') {
          return 'warning';
        } else if (priority === 'medium') {
          return 'info';
        } else if (priority === 'low') {
          return 'primary';
        } else if (priority === 'lowest') {
          return 'success';
        }
      }
    }
  },
};
</script>
<style scoped>
.select-label {
  margin-right: 20px;
}
</style>
