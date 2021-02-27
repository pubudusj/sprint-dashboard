<template>
  <div class="grid">
    <stats-card
      :title="task.title"
      type="gradient-red"
      class="mb-4 mb-xl-0 title-width"
    >
      <template slot="footer">
        <span
          :class="taskTypeIcon.text + ' mr-2'"
          :title="getTypeTitle(task.type)"
          ><i :class="taskTypeIcon.icon"></i>
        </span>
        <span class="mr-2" title="Prioriry"
          ><badge :type="priorityIcon">{{
            getPriorityTitle(task.priority)
          }}</badge></span
        >
        <span class="mr-2" title="Story Points"
          ><badge type="primary">{{ task.points }}</badge></span
        >
        <span
          class="mr-2"
          :title="
            task.assignee
              ? task.assignee.firstname + ' ' + task.assignee.lastname
              : '--'
          "
          ><badge type="default"
            ><i class="fa fa-user"></i> {{ assigneeInitials }}</badge
          ></span
        >
        <span class="mr-2">
          <router-link :to="{ name: 'edit ticket', params: { id: task.id } }">
            <base-button size="sm" type="primary"
              ><i class="fa fa-edit"></i
            ></base-button>
          </router-link>
        </span>
      </template>
    </stats-card>
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
      let icon = "fa fa-check-square";
      let text = "text-primary";

      if (this.task.type == "bug") {
        icon = "fa fa-bug text-danger";
        text = "text-danger";
      } else if (this.task.type == "task") {
        icon = "fa fa-check text-primary";
        text = "text-primary";
      } else if (this.task.type == "story") {
        icon = "fa fa-bookmark text-success";
        text = "text-success";
      }

      return {
        icon: icon,
        text: text,
      };
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
    ticketPriorities() {
      return this.$store.getters.ticketPrioritiesList;
    },
    ticketTypes() {
      return this.$store.getters.ticketTypesList;
    },
    getPriorityTitle() {
      return (stage) => this.ticketPriorities.find((x) => x.id == stage).title;
    },
    getTypeTitle() {
      return (stage) =>
        this.ticketTypes.find((x) => x.id == stage)
          ? this.ticketTypes.find((x) => x.id == stage).title
          : "";
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
.grid {
  cursor: pointer;
}
.title-width {
    max-width: 245px;
}
</style>
