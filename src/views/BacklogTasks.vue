<template>
  <div class="card mb-4">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Backlog</h3>
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
          <th>Points</th>
          <th></th>
        </template>

        <template slot-scope="{ row }">
          <th scope="row">
            {{ row.title }}
          </th>
          <td>
            {{ getTypeTitle(row.type) }}
          </td>
          <td>
            {{ row.assignee | getFullName }}
          </td>
          <td>
            {{ getPriorityTitle(row.priority) }}
          </td>
          <td>
            {{ row.points == 0 ? "" : row.points }}
          </td>
          <td>
            <base-dropdown menuClasses="sprint-move">
              <template v-slot:title>
                <base-button size="sm" type="secondary" class="dropdown-toggle">
                  Move To
                </base-button>
              </template>
              <div
                v-on:click="moveTicket(row.id, sp.id)"
                v-for="sp in activeSprintsList"
                :key="sp.id"
                class="dropdown-item"
              >
                {{ sp.title }}
              </div>
            </base-dropdown>
            <router-link :to="{ name: 'edit ticket', params: { id: row.id } }">
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
  name: "backlog-tasks",
  props: ["tickets", "activeSprints"],
  computed: {
    activeSprintsList() {
      return this.activeSprints;
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
    getFullName: function(data) {
      return data ? data.firstname + " " + data.lastname : "-";
    },
  },
  methods: {
    moveTicket(ticketId, to) {
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
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
<style></style>
//TODO: update page when moved // Move to backlog when sprint detetes //
