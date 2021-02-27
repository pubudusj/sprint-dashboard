<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">My Tickets in current sprint</h3>
        </div>
        <div class="col text-right">
          <router-link :to="{ name: 'current sprint'}" class="btn btn-sm btn-primary">See all</router-link>
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <base-table thead-classes="thead-light"
                  :data="tickets">
        <template slot="columns">
          <th>Title</th>
          <th>Type</th>
          <th>Priority</th>
          <th>Points</th>
          <th></th>
        </template>

        <template slot-scope="{row}">
          <th scope="row">
            {{row.ticket.title}}
          </th>
          <td>
            {{ getTypeTitle(row.ticket.type) }}
          </td>
          <td>
            {{ getPriorityTitle(row.ticket.priority) }}
          </td>
          <td>
            {{row.ticket.points}}
          </td>
          <td>
            <router-link :to="{ name: 'edit ticket', params: { id: row.ticket.id } }">
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
  export default {
    name: 'my-tickets',
    props: ["tickets"],
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
    }
  }
</script>
<style>
</style>
