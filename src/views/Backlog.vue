<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-6">
    <div class="container-fluid d-flex">
        <div class="row">
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <!--Tables-->
      <div class="row">
        <div class="col-xl-12 mb-5 mb-xl-0">
          <sprint
            :sprint=sprint
          ></sprint>
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
  data(){
    return {
      sprint: {
        title: 'new sprint'
      }
    }
  },
  components: {
    Sprint
  },
  computed: {
    user() { 
      return this.$store.getters.loginUser 
    }
  },
};
</script>
<style></style>
