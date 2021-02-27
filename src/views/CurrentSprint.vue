<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-6">
      <div class="container-fluid d-flex">
        <div class="row"></div>
      </div>
    </base-header>
    <div class="container-fluid mt--7">
      <div class="card mb-4">
        <div class="card-header border-0">
          <div class="row align-items-center">
            <div class="col">
              <h3 class="mb-0">Current Spint - {{ this.sprint.title }}</h3>
            </div>
            <div class="col text-right">
              <h5 class="mb-0"></h5>
            </div>
            <div class="col text-right">
              <h5 class="mb-0"></h5>
            </div>
            <div class="col text-right">
              <badge type="primary" class="sprint-points"
                >Total Points: {{ sprintTotalPoints }}
              </badge>
              <span> </span>
              <base-button v-if="!sprint.archived" size="sm" type="warning"
              >Edit Sprint</base-button>
            </div>
          </div>
        </div>
      </div>
      <div class="">
        <div class="row">
          <div class="col stage-column">
            <div class="col-header">
              <div class="text-left col-lg-10">
                <h3 dark color="blue">To Do</h3>
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
                <h3 dark color="blue">In Progress</h3>
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
                  <h3 dark color="blue">Review</h3>
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
                  <h3 dark color="blue">Test</h3>
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
                  <h3 dark color="blue">Done</h3>
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

export default {
  data() {
    return {
      sprint: "",
      tickets: [],
    };
  },
  components: {
    TaskCard,
    Badge,
    draggable,
  },
  computed: {
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
    fetchData() {
      this.$store.dispatch("fetchAllSprints").then((data) => {
        this.sprint = data.filter((x) => x.isCurrent == true);
        if (this.sprint[0]) {
          this.sprint = this.sprint[0];
          this.tickets = this.sprint.tickets.items;
        }
      });
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
          this.fetchData();
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
</style>
