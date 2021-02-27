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
          <div v-if="archivedSprints.length == 0" class="card-header border-0 no-active-sprints">
            <div class="row align-items-center">
              <div class="col">
                <h4 class="mb-0">
                  No archive sprints available.
                </h4>
              </div>
            </div>
          </div>
          <archived-sprint
            v-for="(row, index) in archivedSprints"
            :key="index"
            :sprint="row"
            :archivedSprints="archivedSprints"
          ></archived-sprint>
        </div>
      </div>
      <!--End tables-->
    </div>
  </div>
</template>
<script>
import ArchivedSprint from "./ArchivedSprint";

export default {
  data() {
    return {
      sprints: [],
      bkTickets: [],
    };
  },
  components: {
    ArchivedSprint,
  },
  computed: {
    archivedSprints() {
      return this.sprints
        .filter((sprint) => sprint.archived === true);
    },
  },
  methods: {
    fetchData() {
      this.$store.dispatch("fetchAllSprints").then((data) => {
        this.sprints = data;
      });
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
<style scoped>
.no-active-sprints {
  margin-bottom: 20px;
  border-radius: 10px;
}
</style>
