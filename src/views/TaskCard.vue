<template>
  <div class="grid">
    <article>
      <div class="text">
        <h3 class="dtask-title">
          <b>{{ task.title }}</b>
        </h3>
        <badge class="badge-text" type="default">{{ task.points }}</badge>
        <badge class="badge-text" :type="priorityIcon">{{
          task.priority
        }}</badge>
        <badge class="badge-text" :type="taskTypeIcon.color">{{
          task.type
        }}</badge>
        <badge
          class="badge-text"
          :title="
            task.assignee
              ? task.assignee.firstname + ' ' + task.assignee.lastname
              : '--'
          "
          >{{ assigneeInitials }}</badge
        >
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "TaskCard",
  props: ["task"],
  methods: {
    openUpdateForm: function() {
      this.$emit("open-update-form", this.task);
    },
  },
  computed: {
    taskTypeIcon() {
      var icon = {
        icon: "mdi-bookmark-check",
        color: "primary",
      };

      if (this.task.type == "bug") {
        icon = { icon: "mdi-bug", color: "danger" };
      } else if (this.task.type == "task") {
        icon = { icon: "mdi-clipboard-check", color: "primary" };
      } else if (this.task.type == "story") {
        icon = { icon: "mdi-bookmark-check", color: "success" };
      }

      return icon;
    },
    priorityIcon() {
      var color = null;
      if (this.task.priority == "highest") {
        color = "danger";
      } else if (this.task.priority == "high") {
        color = "warning";
      } else if (this.task.priority == "medium") {
        color = "info";
      } else if (this.task.priority == "low") {
        color = "primary";
      } else if (this.task.priority == "lowest") {
        color = "success";
      }

      return color;
    },
    assigneeInitials() {
      return this.task.assignee
        ? this.$options.filters.initials(this.task.assignee)
        : "--";
    },
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    initials: function(assignee) {
      let initials = "";
      assignee.firstname
        ? (initials += assignee.firstname.charAt(0).toUpperCase())
        : "";
      assignee.lastname
        ? (initials += assignee.lastname.charAt(0).toUpperCase())
        : "";

      return initials;
    },
  },
};
</script>

<style scoped>
.dtask-title {
  padding: 10px 0 0 10px;
  font-size: 16px;
}

.task-info {
  display: flex;
}

.bug-type {
  width: 40%;
  float: left;
}

.priority {
  width: 20%;
  float: left;
}

.assignee {
  width: 20%;
  float: left;
}

.assignee .v-avatar {
  color: rgb(255, 255, 255);
  background-color: rgb(144, 170, 241);
  font-size: 12px;
  font-weight: bold;
}

.story-points {
  width: 20%;
  display: flex;
}

.story-points .v-avatar {
  color: rgb(17, 17, 2);
  background-color: rgb(185, 185, 182);
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
  width: 250px;
}
.grid > article {
  border: 1px solid #ccc;
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  height: 120px;
}
.text {
  padding: 0 20px 20px;
}
.text > button {
  background: gray;
  border: 0;
  color: white;
  padding: 10px;
  width: 100%;
}
.badge-text {
  font-size: 10px;
  padding: 10px;
}
</style>
