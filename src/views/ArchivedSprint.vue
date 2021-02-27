<template>
  <div class="card mb-4">
    <div class="card-header border-1">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">{{ sprint.title }}<span v-if="sprint.isCurrent" class="col">
          <router-link :to="{name: 'current sprint'}"><badge type="info">Current Sprint</badge></router-link>
        </span></h3>
          <div class="text-sm text-muted"><b>Goal: </b>{{ sprint.description }}</div>
        </div>
        
        <div v-if="sprint.archived" class="col">
          <badge type="danger">Archived</badge>
        </div>
        <div class="col text-right">
          <badge type="default" class="sprint-points text-small"
            >{{ sprint.startAt ? "From: " + formatTime(sprint.startAt) : "" }}</badge
          >
          <badge type="default" class="sprint-points text-small"
            >{{ sprint.endAt ? "To: " + formatTime(sprint.endAt) : "" }}</badge
          >
          <badge type="primary" class="sprint-points"
            >Total Points: {{ sprintPoints }}</badge
          >
          <router-link
            v-if="isLoginUserAdmin"
            :to="{ name: 'edit sprint', params: { id: sprint.id } }"
          >
            <base-button v-if="!sprint.archived" size="sm" type="warning"
              >Edit Sprint</base-button
            >
          </router-link>
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <base-table thead-classes="thead-light" :data="tickets">
        <template slot="columns">
          <th width="30%">Title</th>
          <th>Type</th>
          <th width="20%">Assignee</th>
          <th>Priority</th>
          <th>Points</th>
          <th></th>
        </template>

        <template slot-scope="{ row }">
          <th scope="row" :title="row.ticket.title">
            {{ row.ticket.title | shorten }}
          </th>
          <td>
            <span
              :class="taskTypeIcon(row.ticket.type).text + ' mr-2'"
              :title="getTypeTitle(row.ticket.type)"
              ><i :class="taskTypeIcon(row.ticket.type).icon"></i>
              {{ getTypeTitle(row.ticket.type) }}
            </span>
          </td>
          <td>
            {{ row.ticket.assignee | getFullName }}
          </td>
          <td>
            <badge :type="priorityIcon(row.ticket.priority)">{{
              getPriorityTitle(row.ticket.priority)
            }}</badge>
          </td>
          <td>
            {{ row.ticket.points == 0 ? "-" : row.ticket.points }}
          </td>
        </template>
      </base-table>
    </div>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  name: "archived-sprint",
  props: ["sprint", "archivedSprints"],
  computed: {
    isLoginUserAdmin() {
      return this.$store.getters.isLoginUserAdmin;
    },
    archivedSprintsList() {
      return this.archivedSprints.filter((x) => x.id != this.sprint.id);
    },
    sprintPoints() {
      return this.sprint.tickets.items.reduce(
        (r, d) => r + parseInt(d.ticket.points),
        0
      );
    },
    tickets() {
      return this.sprint.tickets.items;
    },
    ticketStages() {
      return this.$store.getters.ticketStagesList;
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
      return (stage) => this.ticketTypes.find((x) => x.id == stage).title;
    },
    taskTypeIcon: () => {
      return (type) => {
        let icon = "fa fa-check-square";
        let text = "text-primary";

        if (type == "bug") {
          icon = "fa fa-bug text-danger";
          text = "text-danger";
        } else if (type == "task") {
          icon = "fa fa-check text-primary";
          text = "text-primary";
        } else if (type == "story") {
          icon = "fa fa-bookmark text-success";
          text = "text-success";
        }

        return {
          icon: icon,
          text: text,
        };
      };
    },
    priorityIcon: () => {
      return (priority) => {
        var color = null;
        if (priority == "highest") {
          color = "danger";
        } else if (priority == "high") {
          color = "warning";
        } else if (priority == "medium") {
          color = "info";
        } else if (priority == "low") {
          color = "primary";
        } else if (priority == "lowest") {
          color = "success";
        }

        return color;
      };
    },
  },
  filters: {
    getFullName: function(data) {
      return data ? data.firstname + " " + data.lastname : "-";
    },
    shorten: function (data) {
      return data.length > 50 ? data.substr(0, 50) + '...' : data
    }
  },
  methods: {
    formatTime(timestamp) {
      try {
        
      let date = new Date(timestamp * 1000);
      return moment(date).format("YYYY-MM-DD");
      }
      catch{
        return timestamp;
      }
    },
  },
};
</script>
<style lang="scss">
.sprint-points {
  margin-right: 20px;
  padding: 10px;
  font-size: 11px;
}
.sprint-move {
  position: inherit;
}
.dropdown-item {
  cursor: pointer;
}
</style>
