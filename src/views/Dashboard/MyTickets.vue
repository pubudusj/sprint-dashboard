<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">My Tickets in current sprint</h3>
        </div>
        <div class="col text-right">
          <router-link
            :to="{ name: 'current sprint' }"
            class="btn btn-sm btn-primary"
            >See all</router-link
          >
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <base-table
        thead-classes="thead-light"
        :noDataMessage="nodataMessage"
        :data="tickets"
      >
        <template slot="columns">
          <th>Title</th>
          <th>Type</th>
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
            <span
              :class="taskTypeIcon(row.ticket.type).text + ' mr-2'"
              :title="getTypeTitle(row.ticket.type)"
              ><i :class="taskTypeIcon(row.ticket.type).icon"></i>
              {{ getTypeTitle(row.ticket.type) }}
            </span>
          </td>
          <td>
            <badge :type="priorityIcon(row.ticket.priority)">{{
              getPriorityTitle(row.ticket.priority)
            }}</badge>
          </td>
          <td>
            {{ getStageTitle(row.ticket.status) }}
          </td>
          <td>
            {{ row.ticket.points }}
          </td>
          <td>
            <router-link
              :to="{ name: 'edit ticket', params: { id: row.ticket.id } }"
            >
              <base-button size="sm" type="primary"
                ><i class="fa fa-edit"></i
              ></base-button>
            </router-link>
          </td>
        </template>
        <template slot-scope>
          <th>No tickets assigned for you in current sprint.</th>
        </template>
      </base-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "my-tickets",
  props: ["tickets", "noSprint"],
  computed: {
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
    nodataMessage() {
      return this.noSprint == true
        ? "No active sprint."
        : this.tickets && this.tickets.length == 0
        ? "No tickets assigned to you in the current sprint."
        : null;
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
    ticketStages() {
      return this.$store.getters.ticketStagesList;
    },
    getStageTitle() {
      return (stage) =>
        this.ticketStages.find((x) => x.id == stage)
          ? this.ticketStages.find((x) => x.id == stage).title
          : "";
    },
  },
};
</script>
<style></style>
