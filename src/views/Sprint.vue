<template>
  <div class="card mb-4">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">{{ sprint.title }}</h3>
          <div class="text-sm"><b>Goal: </b>{{ sprint.description }}</div>
        </div>
        <div v-if="sprint.isCurrent" class="col">
          <badge type="info">Current Sprint</badge>
        </div>
        <div v-if="sprint.archived" class="col">
          <badge type="danger">Archived</badge>
        </div>
        <div class="col text-right">
          <h5 class="mb-0">
            {{ sprint.startAt ? "From -" + sprint.startAt : "" }}
          </h5>
        </div>
        <div class="col text-right">
          <h5 class="mb-0">{{ sprint.endAt ? "To -" + sprint.endAt : "" }}</h5>
        </div>
        <div class="col text-right">
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
          <th>Title</th>
          <th>Type</th>
          <th>Assignee</th>
          <th>Priority</th>
          <th>Stage</th>
          <th>Points</th>
          <th></th>
        </template>

        <template slot-scope="{ row }">
          <th scope="row">
            {{ row.ticket.title }}
          </th>
          <td>
            {{ getTypeTitle(row.ticket.type) }}
          </td>
          <td>
            {{ row.ticket.assignee | getFullName }}
          </td>
          <td>
            {{ getPriorityTitle(row.ticket.priority) }}
          </td>
          <td>
            {{ getStageTitle(row.ticket.status) }}
          </td>
          <td>
            {{ row.ticket.points == 0 ? "" : row.ticket.points }}
          </td>
          <td>
            <base-dropdown menuClasses="sprint-move">
              <template v-slot:title>
                <base-button size="sm" type="secondary" class="dropdown-toggle">
                  Move To
                </base-button>
              </template>
              <div
                v-on:click="moveTicket(row.ticket.id, row.id, 'backlog')"
                class="dropdown-item"
              >
                Backlog
              </div>
              <div
                v-on:click="moveTicket(row.ticket.id, row.id, sp.id)"
                v-for="sp in activeSprintsList"
                :key="sp.id"
                class="dropdown-item"
              >
                {{ sp.title }}
              </div>
            </base-dropdown>
            <router-link
              :to="{ name: 'edit ticket', params: { id: row.ticket.id } }"
            >
              <base-button size="sm" type="primary"
                ><i class="fa fa-edit"></i
              ></base-button>
            </router-link>
          </td>
        </template>
      </base-table>
    </div>
  </div>
</template>
<script>
import api from "./../api/api";
import { Hub } from "aws-amplify";

export default {
  name: "sprint",
  props: ["sprint", "activeSprints"],
  computed: {
    isLoginUserAdmin() {
      return this.$store.getters.isLoginUserAdmin;
    },
    activeSprintsList() {
      return this.activeSprints.filter((x) => x.id != this.sprint.id);
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
    getStageTitle() {
      return (stage) =>
        this.ticketStages.find((x) => x.id == stage)
          ? this.ticketStages.find((x) => x.id == stage).title
          : "";
    },
    getPriorityTitle() {
      return (stage) => this.ticketPriorities.find((x) => x.id == stage).title;
    },
    getTypeTitle() {
      return (stage) => this.ticketTypes.find((x) => x.id == stage).title;
    },
  },
  filters: {
    getFullName: function(data) {
      return data ? data.firstname + " " + data.lastname : "-";
    },
  },
  methods: {
    moveTicket(ticketId, relationId, to) {
      api
        .removeTicketFromSprint({
          id: relationId,
        })
        .then(function() {
          if (to == "backlog") {
            api
              .updateTicket({
                id: ticketId,
                status: "backlog",
              })
              .then(() => {
                Hub.dispatch("SprintsChannel", {
                  event: "ticketMoved",
                  data: {},
                  message: "",
                });
              });
          } else {
            api
              .addTicketToSprint({
                sprintId: to,
                ticketId: ticketId,
              })
              .then(function() {
                api
                  .updateTicket({
                    id: ticketId,
                    status: "todo",
                  })
                  .then(() => {
                    Hub.dispatch("SprintsChannel", {
                      event: "ticketMoved",
                      data: {},
                      message: "",
                    });
                  });
              });
          }
        })
        .catch((e) => {
          console.log(e);
        });
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
