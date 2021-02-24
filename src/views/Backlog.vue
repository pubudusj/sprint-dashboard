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
          <sprint
            v-for="(row, index) in activeSprints"
            :key="index"
            :sprint="row"
          ></sprint>
          <div v-if="activeSprints.length == 0" class="card-header border-0">
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
        </div>
      </div>
      <!--End tables-->
    </div>
  </div>
</template>
<script>
// Tables
import Sprint from "./Sprint";

export default {
  data() {
    return {
      sprints: [],
    };
  },
  components: {
    Sprint,
  },
  computed: {
    activeSprints() {
      return this.sprints
        .filter((sprint) => sprint.archived === false)
        .sort((a, b) =>
          a.isCurrent === true && b.isCurrent === false ? -1 : 1
        );
    },
  },
  created() {
    this.$store.dispatch("fetchAllSprints").then((data) => {
      this.sprints = data;
    });
  },
};
</script>
<style></style>
