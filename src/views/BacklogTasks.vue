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
          <th width="30%">Title</th>
          <th>Type</th>
          <th width="20%">Assignee</th>
          <th>Priority</th>
          <th>Points</th>
          <th></th>
        </template>

        <template slot-scope="{ row }">
          <th scope="row">
            {{ row.title | shorten }}
          </th>
          <td>
            <span
              :class="taskTypeIcon(row.type).text + ' mr-2'"
              :title="getTypeTitle(row.type)"
              ><i :class="taskTypeIcon(row.type).icon"></i>
              {{ getTypeTitle(row.type) }}
            </span>
          </td>
          <td>
            {{ row.assignee | getFullName }}
          </td>
          <td>
            <badge :type="priorityIcon(row.priority)">{{
              getPriorityTitle(row.priority)
            }}</badge>
          </td>
          <td>
            {{ row.points == 0 ? "-" : row.points }}
          </td>
          <td>
            <base-dropdown menuClasses="sprint-move" v-if="activeSprintsList.length > 0">
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
