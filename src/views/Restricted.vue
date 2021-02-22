<template>
  <div>
    <base-header
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style="min-height: 300px; background-size: cover; background-position: center top;"
    >
      <!-- Mask -->
      <span class="mask bg-gradient-success opacity-8"></span>
      <!-- Header container -->
      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg-7 col-md-10">
            <h1 class="display-2 text-white">Sorry, you don't have sufficient permissions to visit previous page.</h1>
          </div>
        </div>
      </div>
    </base-header>
  </div>
</template>

<script>
export default {
  name: "user-profile",
};
</script>
<style></style>
