<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-6">
      <div class="container-fluid d-flex">
        <div class="row"></div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <!--Tables-->
      <div class="row">
        <div class="col-xl-12 mb-5 mb-xl-0">
          <div v-if="activeSprints.length == 0" class="card-header border-0 no-active-sprints">
            <div class="row align-items-center">
              <div class="col">
                <h4 class="mb-0">
                  No sprints available. Please create one
                  <router-link :to="{ name: 'create sprint' }">
                    here
                  </router-link>
                </h4>
              </div>
            </div>
          </div>
          <sprint
            v-for="(row, index) in activeSprints"
            :key="index"
            :sprint="row"
            :activeSprints="activeSprints"
          ></sprint>
          <backlog-tasks
            :tickets="backlogTickets"
            :activeSprints="activeSprints"
          ></backlog-tasks>
        </div>
      </div>
      <!--End tables-->
    </div>
  </div>
</template>
<script>
import BacklogTasks from "./BacklogTasks.vue";
import Sprint from "./Sprint";
import { Hub } from "aws-amplify";

export default {
  data() {
    return {
      sprints: [],
      bkTickets: [],
    };
  },
  components: {
    Sprint,
    BacklogTasks,
  },
  computed: {
    backlogTickets() {
      return this.bkTickets;
    },
    activeSprints() {
      return this.sprints
        .filter((sprint) => sprint.archived === false)
        .sort((a, b) =>
          a.isCurrent === true && b.isCurrent === false ? -1 : 1
        );
    },
  },
  methods: {
    fetchData() {
      this.$store.dispatch("fetchAllSprints").then((data) => {
        this.sprints = data;
      });
    },
    fetchBacklogTickets() {
      this.$store.dispatch("fetchTicketsForBacklog").then((data) => {
        this.bkTickets = data;
      });
    },
  },
  created() {
    this.fetchData();
    this.fetchBacklogTickets();

    Hub.listen("SprintsChannel", (data) => {
      if (data.payload.event == "ticketMoved") {
        this.fetchData();
        this.fetchBacklogTickets();
      }
    });
  },
};
</script>
<style scoped>
.no-active-sprints {
  margin-bottom: 20px;
  border-radius: 10px;
}
</style>
