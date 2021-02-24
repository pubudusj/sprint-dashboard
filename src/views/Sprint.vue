<template>
  <div class="card mb-4">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Sprint {{ sprint.title }}</h3>
        </div>
        <div v-if="sprint.isCurrent" class="col">
          <badge type="info">Current Sprint</badge>
        </div>
        <div v-if="sprint.archived" class="col">
          <badge type="danger">Archived</badge>
        </div>
        <div class="col text-right">
          <h5 class="mb-0">Start - {{ sprint.startAt }} </h5>
        </div>
        <div class="col text-right">
          <h5 class="mb-0">End - {{ sprint.endAt }} </h5>
        </div>
        <div class="col text-right">
          <router-link :to="{ name: 'edit sprint', params: { id: sprint.id }}" >
            <base-button v-if="!sprint.archived" size="sm" type="primary">Edit</base-button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <base-table thead-classes="thead-light"
                  :data="tableData">
        <template slot="columns">
          <th>Title</th>
          <th>Type</th>
          <th>Asignee</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Points</th>
          <th></th>
        </template>

        <template slot-scope="{row}">
          <th scope="row">
            {{row.title}}
          </th>
          <td>
            {{row.type}}
          </td>
          <td>
            {{row.asignee}}
          </td>
          <td>
            {{row.priority}}
          </td>
          <td>
            {{row.status}}
          </td>
          <td>
            {{row.points}}
          </td>
          <td>
            <base-button size="sm" outline type="info">View</base-button>
          </td>
        </template>
      </base-table>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'sprint',
    props: ["sprint"],
    data() {
      return {
        tableData: [
          {
            page: '/argon/',
            visitors: '4,569',
            unique: '340',
            bounceRate: '46,53%',
            bounceRateDirection: 'up'
          },
          {
            page: '/argon/index.html',
            visitors: '3,985',
            unique: '319',
            bounceRate: '46,53%',
            bounceRateDirection: 'down'
          },
          {
            page: '/argon/charts.html',
            visitors: '3,513',
            unique: '294',
            bounceRate: '36,49%',
            bounceRateDirection: 'down'
          },
          {
            page: '/argon/tables.html',
            visitors: '2,050',
            unique: '147',
            bounceRate: '50,87%',
            bounceRateDirection: 'up'
          },
          {
            page: '/argon/profile.html',
            visitors: '1,795',
            unique: '190',
            bounceRate: '46,53%',
            bounceRateDirection: 'down'
          }
        ]
      }
    }
  }
</script>
<style>
</style>
