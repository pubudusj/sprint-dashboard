/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      firstname
      lastname
      department
      designation
      verified
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstname
        lastname
        department
        designation
        verified
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSprint = /* GraphQL */ `
  query GetSprint($id: ID!) {
    getSprint(id: $id) {
      id
      title
      description
      startAt
      endAt
      isCurrent
      archived
      createdBy {
        id
        firstname
        lastname
        department
        designation
        verified
        createdAt
        updatedAt
      }
      tickets {
        items {
          id
          sprintId
          ticketId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listSprints = /* GraphQL */ `
  query ListSprints(
    $filter: ModelSprintFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSprints(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        startAt
        endAt
        isCurrent
        archived
        createdBy {
          id
          firstname
          lastname
          department
          designation
          verified
          createdAt
          updatedAt
        }
        tickets {
          items {
            id
            sprintId
            ticketId
            createdAt
            updatedAt
            ticket {
              assignee {
                verified
                updatedAt
                lastname
                id
                firstname
                designation
                department
                createdAt
              }
              title
              type
              status
              priority
              points
              id
              description
              createdAt
              updatedAt
              reportBy {
                createdAt
                department
                designation
                firstname
                verified
                updatedAt
                lastname
                id
              }
            }
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTicket = /* GraphQL */ `
  query GetTicket($id: ID!) {
    getTicket(id: $id) {
      id
      title
      description
      points
      priority
      type
      status
      reportBy {
        id
        firstname
        lastname
        department
        designation
        verified
        createdAt
        updatedAt
      }
      assignee {
        id
        firstname
        lastname
        department
        designation
        verified
        createdAt
        updatedAt
      }
      sprints {
        items {
          id
          sprintId
          ticketId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listTickets = /* GraphQL */ `
  query ListTickets(
    $filter: ModelTicketFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTickets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        points
        priority
        type
        status
        reportBy {
          id
          firstname
          lastname
          department
          designation
          verified
          createdAt
          updatedAt
        }
        assignee {
          id
          firstname
          lastname
          department
          designation
          verified
          createdAt
          updatedAt
        }
        sprints {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
