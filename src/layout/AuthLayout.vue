<template>
    <div class="main-content bg-default">
        <!-- Header -->
        <div class="header bg-gradient-success py-7 py-lg-8">
            <div class="container">
                <div class="header-body text-center mb-7">
                    <div class="row justify-content-center">
                        <div class="col-lg-5 col-md-6">
                            <h1 class="text-white">Welcome To MySprintDashboard</h1>
                            <p class="text-lead text-white">Manage your sprints convenient way!</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="separator separator-bottom separator-skew zindex-100">
                <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
                     xmlns="http://www.w3.org/2000/svg">
                    <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
                </svg>
            </div>
        </div>
        <!-- Page content -->
        <div class="container mt--8 pb-5">
            <slide-y-up-transition mode="out-in" origin="center top">
                <router-view></router-view>
            </slide-y-up-transition>
        </div>
        <footer class="py-5">
            <div class="container">
                <div class="row align-items-center justify-content-xl-between">
                    <div class="col-xl-3">
                        <div class="copyright text-center text-xl-left text-muted">
                            &copy; {{year}} Developed By <a href="https://linkedin.com/in/pubudusj" class="font-weight-bold ml-1"
                                               target="_blank">Pubudu</a>
                        </div>
                    </div>
                    <div class="col-xl-3">
                        <div class="copyright text-center text-xl-left text-muted">
                            Theme By <a href="https://www.creative-tim.com" class="font-weight-bold ml-1"
                                               target="_blank">Creative Tim</a>
                        </div>
                    </div>
                    <div class="col-xl-2">
                        <ul class="nav nav-footer justify-content-center justify-content-xl-end">
                            <li class="nav-item">
                                <a href="https://github.com/pubudusj" class="nav-link" target="_blank">Github</a>
                            </li>
                            <li class="nav-item">
                                <a href="https://pubudu.dev" class="nav-link" target="_blank">About
                                    Me</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>
<script>
  import { SlideYUpTransition } from 'vue2-transitions'

  export default {
    name: 'auth-layout',
    components: {
      SlideYUpTransition
    },
    data() {
      return {
        year: new Date().getFullYear(),
        showMenu: true
      }
    }
  }
</script>
<style>
</style>
