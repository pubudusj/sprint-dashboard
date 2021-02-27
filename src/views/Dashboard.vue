<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-6">
    <div class="container-fluid d-flex">
        <div class="row">
          <h3 class="display-4 text-white">Welcome {{ user.name }}</h3>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <!--Tables-->
      <div class="row">
        <div class="col-xl-4 mb-5 mb-xl-0">
          <stats-card
            title="Current Sprint"
            type="gradient-red"
            :sub-title="currentSprint ? currentSprint.title : 'No Active Sprint'"
            icon="ni ni-chart-bar-32"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-success mr-2"
                ><i class="fa fa-hand-point-right"></i> {{ this.currentSprint ? this.currentSprint.tickets.items.length : 0 }}</span
              >
              <span class="text-nowrap mr-4">Tasks</span>

              <span class="text-success mr-2"
                ><i class="fa fa-hand-point-right"></i> {{ sprintTotalPoints }}</span
              >
              <span class="text-nowrap">Total points</span>
            </template>
          </stats-card>
          <div class="divider"></div>
          <stats-card
            title="My Tickets in current sprint"
            type="gradient-info"
            :sub-title="myTickets.length + ' tickets'"
            icon="ni ni-chart-pie-35"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-success mr-2"
                ><i class="fa fa-arrow-up"></i> {{ myTicketsPoints }}</span
              >
              <span class="text-nowrap">Points</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-8">
          <my-tickets :tickets="myTickets" :noSprint="!currentSprint"></my-tickets>
        </div>
      </div>
      <!--End tables-->
    </div>
  </div>
</template>
<script>
import MyTickets from "./Dashboard/MyTickets";

export default {
  data() {
    return {
      currentSprint: null,
    }
  },
  components: {
    MyTickets
  },
  computed: {
    user() { 
      return this.$store.getters.loginUser 
    },
    sprintTotalPoints() {
      let points = this.currentSprint && this.currentSprint.tickets.items.reduce((r, d) => r + parseInt(d.ticket.points), 0);
      
      return points ? points : '-';
    },
    myTickets() {
      let user = this.user
      let myTickets = this.currentSprint && this.currentSprint.tickets.items.filter((r) => r.ticket.assignee ? r.ticket.assignee.id == user.id : false);
      
      return myTickets ? myTickets : [];
    },
    myTicketsPoints() {
      let points = this.myTickets && this.myTickets.reduce((r, d) => r + parseInt(d.ticket.points), 0);
      
      return points ? points : '-';
    }
  },
  methods: {
    fetchData() {
      this.$store.dispatch("fetchAllSprints").then((data) => {
        this.currentSprint = data.filter((x) => x.isCurrent == true)
        this.currentSprint = this.currentSprint ? this.currentSprint[0]: null
      });
    },
  },
  created() {
    this.fetchData()
  }
};
</script>
<style scoped>
.divider {
  margin: 20px;
}
</style>
