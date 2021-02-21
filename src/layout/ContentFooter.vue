<template>
  <footer class="footer px-4">
    <div class="row align-items-center justify-content-lg-between">
      <div class="col-lg-6">
        <div class="copyright text-center text-lg-left text-muted">
          © {{year}} Design By<a href="https://www.creative-tim.com" class="font-weight-bold ml-1" target="_blank">Creative Tim</a> &
          <a href="https://www.binarcode.com" class="font-weight-bold ml-1" target="_blank">Binar Code</a>
        </div>
      </div>
      <div class="col-lg-6">
        <ul class="copyright nav nav-footer justify-content-center justify-content-lg-end">
          <li class="nav-item">
            <a href="https://linkedin.com/in/pubudusj" class="font-weight-bold ml-1" target="_blank">About Me</a>
            |
            <a href="https://github.com/pubudusj" class="font-weight-bold ml-1" target="_blank">Github</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
