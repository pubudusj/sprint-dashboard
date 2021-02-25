/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createSprint = /* GraphQL */ `
  mutation CreateSprint(
    $input: CreateSprintInput!
    $condition: ModelSprintConditionInput
  ) {
    createSprint(input: $input, condition: $condition) {
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
export const updateSprint = /* GraphQL */ `
  mutation UpdateSprint(
    $input: UpdateSprintInput!
    $condition: ModelSprintConditionInput
  ) {
    updateSprint(input: $input, condition: $condition) {
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
export const deleteSprint = /* GraphQL */ `
  mutation DeleteSprint(
    $input: DeleteSprintInput!
    $condition: ModelSprintConditionInput
  ) {
    deleteSprint(input: $input, condition: $condition) {
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
export const createTicket = /* GraphQL */ `
  mutation CreateTicket(
    $input: CreateTicketInput!
    $condition: ModelTicketConditionInput
  ) {
    createTicket(input: $input, condition: $condition) {
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
export const updateTicket = /* GraphQL */ `
  mutation UpdateTicket(
    $input: UpdateTicketInput!
    $condition: ModelTicketConditionInput
  ) {
    updateTicket(input: $input, condition: $condition) {
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
export const deleteTicket = /* GraphQL */ `
  mutation DeleteTicket(
    $input: DeleteTicketInput!
    $condition: ModelTicketConditionInput
  ) {
    deleteTicket(input: $input, condition: $condition) {
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
export const createSprintTickets = /* GraphQL */ `
  mutation CreateSprintTickets(
    $input: CreateSprintTicketsInput!
    $condition: ModelSprintTicketsConditionInput
  ) {
    createSprintTickets(input: $input, condition: $condition) {
      id
      sprintId
      ticketId
      ticket {
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
      sprint {
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
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateSprintTickets = /* GraphQL */ `
  mutation UpdateSprintTickets(
    $input: UpdateSprintTicketsInput!
    $condition: ModelSprintTicketsConditionInput
  ) {
    updateSprintTickets(input: $input, condition: $condition) {
      id
      sprintId
      ticketId
      ticket {
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
      sprint {
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
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteSprintTickets = /* GraphQL */ `
  mutation DeleteSprintTickets(
    $input: DeleteSprintTicketsInput!
    $condition: ModelSprintTicketsConditionInput
  ) {
    deleteSprintTickets(input: $input, condition: $condition) {
      id
      sprintId
      ticketId
      ticket {
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
      sprint {
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
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
