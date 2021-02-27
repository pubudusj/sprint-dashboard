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
                  <h3 class="mb-0">Create New Ticket</h3>
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
                    <div class="col-lg-4">
                      <label class="form-control-label select-label">Type *</label>
                      <base-dropdown>
                        <template v-slot:title>
                          <base-button type="secondary" class="dropdown-toggle">
                            <i :class="typeIcon(ticket.type.id)"></i> {{ ticket.type.title }}
                          </base-button>
                        </template>
                          <div v-for="type in typesList" v-on:click="assignType(type)" :key="type.id" class="dropdown-item"><i :class="typeIcon(type.id)"></i>{{ type.title }}</div>
                      </base-dropdown>
                    </div>
                    <div class="col-lg-4">
                      <label class="form-control-label select-label">Priority *</label>
                      <base-dropdown>
                        <template v-slot:title>
                          <base-button type="secondary" class="dropdown-toggle">
                            <badge :type="priorityIcon(ticket.priority.id)">{{ ticket.priority.title }}</badge>
                          </base-button>
                        </template>
                        <div v-for="priority in prioritiesList" v-on:click="assignPriority(priority)" :key="priority.id" class="dropdown-item"><badge :type="priorityIcon(priority.id)">{{ priority.title }}</badge></div>
                      </base-dropdown>
                    </div>
                    <div class="col-lg-4">
                      <label class="form-control-label select-label">Assignee</label>
                      <base-dropdown>
                        <template v-slot:title>
                          <base-button type="secondary" class="dropdown-toggle">
                            {{ ticket.assignee ? ticket.assignee.firstname + ' ' + ticket.assignee.lastname : '' }}
                          </base-button>
                        </template>
                        <!-- {{ assigneeList }} -->
                        <div v-for="assignee in assigneeList" v-on:click="assignAssignee(assignee)" :key="assignee.id" class="dropdown-item">{{ assignee.firstname + ' ' + assignee.lastname }}</div>
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
                    <div class="col-lg-4">
                      <label class="form-control-label select-label">Sprint</label>
                      <base-dropdown>
                        <template v-slot:title>
                          <base-button type="secondary" class="dropdown-toggle">
                            {{ ticket.sprint.title }}
                          </base-button>
                        </template>
                        <div v-for="sprint in sprintsList" v-on:click="assignSprint(sprint)" :key="sprint.id" class="dropdown-item">{{ sprint.title }}</div>
                      </base-dropdown>
                    </div>
                  </div>
                  <button v-on:click="createTicket" class="btn btn-info">
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
  name: "create-ticket",
  data() {
    return {
      ticket: {
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
    async createTicket() {
      this.message = null;

      if (!this.validateForm()) {
        this.message = {
          message: "Validation failed.",
          type: "danger",
        };
      } else {
        let ticketToSave = {
          title: this.ticket.title,
          description: this.ticket.description,
          type: this.ticket.type.id,
          priority: this.ticket.priority.id,
          points: this.ticket.points ? this.ticket.points : 0,
        }

        let sprintId = this.ticket.sprint.id
        if (sprintId !== null) {
          ticketToSave.status = 'todo'
        } else {
          ticketToSave.status = 'backlog'
        }

        if (this.ticket.assignee.id !== null) {
          ticketToSave.ticketAssigneeId = this.ticket.assignee.id;
        }
        ticketToSave.ticketReportById = this.user.id;

        api
          .createTicket(ticketToSave)
          .then((data) => {
            if (sprintId !== null) {
              api.addTicketToSprint({
                sprintId: sprintId,
                ticketId: data.data.createTicket.id
              })
            }

            this.message = {
              message: "Ticket created successfully.",
              type: "success",
            };
            this.ticket = {
              title: "",
              startAt: "",
              endAt: "",
              description: "",
            };
            setTimeout(() => this.$router.push('/backlog'), 500)
          })
          .catch((e) => {
            console.log(e);
            this.message = {
              message: "Failed to create new ticket.",
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
      this.ticket.type = type
    },
    assignPriority(priority) {
      this.ticket.priority = priority
    },
    assignAssignee(assignee) {
      this.ticket.assignee = assignee
    },
    assignSprint(sprint) {
      this.ticket.sprint = sprint
    }
  },
  computed: {
    user() {
      return this.$store.getters.loginUser;
    },
    prioritiesList: function() {
      let self = this
      let priorities = this.$store.getters.ticketPrioritiesList
      self.ticket.priority = priorities[0]
      return priorities
    },
    typesList: function() {
      let self = this
      let types = this.$store.getters.ticketTypesList
      self.ticket.type = types[0]
      return types
    },
    assigneeList: function() {
      let assignees = [{
        id: null,
        firstname: 'No assignee',
        lastname: '',
      }].concat(this.$store.getters.ticketAssignees)
      let self = this
      self.ticket.assignee = assignees[0]
      return assignees
    },
    sprintsList: function() {
      let sprints = [{
        id: null,
        title: 'None',
      }].concat(this.$store.getters.getAllSprints)
      let self = this
      self.ticket.sprint = sprints[0]
      return sprints.filter((x) => x.archived == false)
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