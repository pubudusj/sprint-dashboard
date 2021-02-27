<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-6">
      <div class="container-fluid d-flex">
        <div class="row"></div>
      </div>
    </base-header>
    <div class="container-fluid mt--7">
      <div class="card mb-4">
        <div v-if="!noSprint" class="card-header border-0">
          <div class="row align-items-center">
            <div class="col">
              <h3 class="mb-0">Current Sprint - {{ this.sprint.title }}</h3>
              <div class="text-sm">
                <b>Goal: </b>{{ this.sprint.description }}
              </div>
            </div>
            <div class="col text-right">
              <h5 class="mb-0"></h5>
            </div>
            <div class="col text-right">
              <h5 class="mb-0"></h5>
            </div>
            <div class="text-right">
              <badge type="default" class="sprint-points text-small">{{
                sprint.startAt ? "From: " + formatTime(sprint.startAt) : ""
              }}</badge>
              <badge type="default" class="sprint-points text-small">{{
                sprint.endAt ? "To: " + formatTime(sprint.endAt) : ""
              }}</badge>
            </div>
            <div class="text-right">
              <badge type="primary" class="sprint-points"
                >Total Points: {{ sprintTotalPoints }}
              </badge>
              <span> </span>
              <router-link
                v-if="isLoginUserAdmin && !sprint.archived"
                :to="{ name: 'edit sprint', params: { id: sprint.id } }"
              >
                <base-button size="sm" type="primary">Edit Sprint</base-button>
              </router-link>
              <base-button v-on:click="closeSprint"  v-if="isLoginUserAdmin && !sprint.archived" size="sm" type="danger">Close Sprint</base-button>
            </div>
          </div>
        </div>

        <div v-if="noSprint" class="card-header border-0">
          <base-alert type="danger">
            <strong>No active sprint found.</strong>
          </base-alert>
        </div>
      </div>
      <div v-if="!noSprint" class="">
        <div class="row">
          <div class="col stage-column">
            <div class="col-header">
              <div class="text-left col-lg-10">
                <h3 class="stage-title" dark color="blue">To Do</h3>
              </div>
              <div class="task-count text-right col-lg-2" title="story points">
                <badge>{{ storyPoints("todo") }}</badge>
              </div>
            </div>
            <div class="row task-card-wrapper">
              <draggable
                draggable=".task-card"
                :list="todoTickets"
                :group="{ name: 'tasks' }"
                @change="changeToDo"
              >
                <div
                  v-for="ticket in todoTickets"
                  :key="ticket.id"
                  class="task-card"
                  cols="12"
                >
                  <TaskCard :task="ticket.ticket"></TaskCard>
                </div>
              </draggable>
            </div>
          </div>
          <div class="col stage-column">
            <div class="col-header">
              <div class="text-left col-lg-10">
                <h3 class="stage-title" dark color="blue">In Progress</h3>
              </div>
              <div class="task-count text-right col-lg-2" title="story points">
                <badge>{{ storyPoints("inprogress") }}</badge>
              </div>
            </div>
            <div class="row task-card-wrapper">
              <draggable
                draggable=".task-card"
                :list="inProgressTickets"
                :group="{ name: 'tasks' }"
                @change="changeInProgress"
              >
                <div
                  v-for="ticket in inProgressTickets"
                  :key="ticket.id"
                  class="task-card"
                  cols="12"
                >
                  <TaskCard :task="ticket.ticket"></TaskCard>
                </div>
              </draggable>
            </div>
          </div>
          <div class="col stage-column">
            <div min-width="275" max-width="275">
              <div class="col-header">
                <div class="text-left col-lg-10">
                  <h3 class="stage-title" dark color="blue">Review</h3>
                </div>
                <div
                  class="task-count text-right col-lg-2"
                  title="story points"
                >
                  <badge>{{ storyPoints("review") }}</badge>
                </div>
              </div>
              <div>
                <div class="row task-card-wrapper">
                  <draggable
                    draggable=".task-card"
                    :list="reviewTickets"
                    :group="{ name: 'tasks' }"
                    @change="changeReview"
                  >
                    <div
                      v-for="ticket in reviewTickets"
                      :key="ticket.id"
                      class="task-card"
                      cols="12"
                    >
                      <TaskCard :task="ticket.ticket"></TaskCard>
                    </div>
                  </draggable>
                </div>
              </div>
            </div>
          </div>
          <div class="col stage-column">
            <div min-width="275" max-width="275">
              <div class="col-header">
                <div class="text-left col-lg-10">
                  <h3 class="stage-title" dark color="blue">Testing</h3>
                </div>
                <div
                  class="task-count text-right col-lg-2"
                  title="story points"
                >
                  <badge>{{ storyPoints("test") }}</badge>
                </div>
              </div>
              <div>
                <div class="row task-card-wrapper">
                  <draggable
                    draggable=".task-card"
                    :list="testTickets"
                    :group="{ name: 'tasks' }"
                    @change="changeTest"
                  >
                    <div
                      v-for="ticket in testTickets"
                      :key="ticket.id"
                      class="task-card"
                      cols="12"
                    >
                      <TaskCard :task="ticket.ticket"></TaskCard>
                    </div>
                  </draggable>
                </div>
              </div>
            </div>
          </div>
          <div class="col stage-column">
            <div min-width="275" max-width="275">
              <div class="col-header">
                <div class="text-left col-lg-10">
                  <h3 class="stage-title" dark color="blue">Done</h3>
                </div>
                <div
                  class="task-count text-right col-lg-2"
                  title="story points"
                >
                  <badge>{{ storyPoints("done") }}</badge>
                </div>
              </div>
              <div>
                <div class="row task-card-wrapper">
                  <draggable
                    draggable=".task-card"
                    :list="doneTickets"
                    :group="{ name: 'tasks' }"
                    @change="changeDone"
                  >
                    <div
                      v-for="ticket in doneTickets"
                      :key="ticket.id"
                      class="task-card"
                      cols="12"
                    >
                      <TaskCard :task="ticket.ticket"></TaskCard>
                    </div>
                  </draggable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TaskCard from "./TaskCard.vue";
import Badge from "../components/Badge.vue";
import draggable from "vuedraggable";
import api from "./../api/api";
import moment from "moment";

export default {
  data() {
    return {
      sprint: null,
      tickets: [],
      noCurrentSprint: false,
    };
  },
  components: {
    TaskCard,
    Badge,
    draggable,
  },
  computed: {
    noSprint() {
      return this.noCurrentSprint;
    },
    isLoginUserAdmin() {
      return this.$store.getters.isLoginUserAdmin;
    },
    sprintTotalPoints() {
      return this.tickets.reduce((r, d) => r + parseInt(d.ticket.points), 0);
    },
    todoTickets() {
      return this.getTicketsByStage("todo");
    },
    inProgressTickets() {
      return this.getTicketsByStage("inprogress");
    },
    reviewTickets() {
      return this.getTicketsByStage("review");
    },
    testTickets() {
      return this.getTicketsByStage("test");
    },
    doneTickets() {
      return this.getTicketsByStage("done");
    },
    storyPoints() {
      return (stage) =>
        this.getTicketsByStage(stage).reduce(
          (r, d) => r + parseInt(d.ticket.points),
          0
        );
    },
  },
  methods: {
    closeSprint() {
      console.log(this.sprint)
      let conf = confirm('Please confirm if you need to close the sprint.');
      if (conf) {
        api.updateSprint({
          id: this.sprint.id,
          archived: true,
          isCurrent: false,
        }).then(() => {
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
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                }
              });
              setTimeout(() => this.$router.push("/backlog"), 500);
        }).catch((e) => {
          console.log(e)
        })
      }
    },
    formatTime(timestamp) {
      try {
        let date = new Date(timestamp * 1000);
        return moment(date).format("YYYY-MM-DD");
      } catch {
        return timestamp;
      }
    },
    fetchData() {
      let currentSprint = this.$store.getters.currentSprint;
      if (currentSprint) {
        this.sprint = currentSprint;
        this.tickets = this.sprint.tickets.items;
      } else {
        this.noCurrentSprint = true;
      }
    },
    getTicketsByStage(stage) {
      return this.tickets.filter((x) => x.ticket.status == stage);
    },
    changeToDo: function(event) {
      if ("added" in event) {
        this.changeStage("todo", event.added.element);
      }
    },
    changeInProgress: function(event) {
      if ("added" in event) {
        this.changeStage("inprogress", event.added.element);
      }
    },
    changeReview: function(event) {
      if ("added" in event) {
        this.changeStage("review", event.added.element);
      }
    },
    changeTest: function(event) {
      if ("added" in event) {
        this.changeStage("test", event.added.element);
      }
    },
    changeDone: function(event) {
      if ("added" in event) {
        this.changeStage("done", event.added.element);
      }
    },
    changeStage: function(stage, task) {
      api
        .updateTicket({
          id: task.ticket.id,
          status: stage,
        })
        .then(() => {
          this.$store.dispatch('fetchAllSprints').then(() => {
            this.fetchData();
          })
        });
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
<style scoped>
.col-header {
  width: 100%;
  display: inline-flex;
  margin-bottom: 10px;
}
.stage-column {
  margin: 0 5px;
  display: block;
  padding: 10px;
  background-color: rgba(155, 155, 155, 0.123);
  border-radius: 10px;
  min-height: 600px;
}
.task-card {
  margin-bottom: 5px;
}
.task-card-wrapper {
  margin: 0 0 15px 0;
  min-width: 240px;
}
.sprint-points {
  margin-right: 25px;
}
.stage-title {
  font-variant-caps: all-small-caps;
  font-size: 20px;
}
</style>
