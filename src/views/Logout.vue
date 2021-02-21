<template>
<div></div>
</template>
<script>
import { Auth } from "aws-amplify";
import router from "./../router";

export default {
  name: "logout",
  beforeCreate() {
      Auth.signOut().then(() => {
        router.push({ name: "login" });
      }).catch((e) => {
          console.log(e)
          router.push({ name: "dashboard" });
      })
  }
};
</script>
<style></style>
