/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateSprint = /* GraphQL */ `
  subscription OnCreateSprint {
    onCreateSprint {
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
export const onUpdateSprint = /* GraphQL */ `
  subscription OnUpdateSprint {
    onUpdateSprint {
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
export const onDeleteSprint = /* GraphQL */ `
  subscription OnDeleteSprint {
    onDeleteSprint {
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
export const onCreateTicket = /* GraphQL */ `
  subscription OnCreateTicket {
    onCreateTicket {
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
export const onUpdateTicket = /* GraphQL */ `
  subscription OnUpdateTicket {
    onUpdateTicket {
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
export const onDeleteTicket = /* GraphQL */ `
  subscription OnDeleteTicket {
    onDeleteTicket {
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
export const onCreateSprintTickets = /* GraphQL */ `
  subscription OnCreateSprintTickets {
    onCreateSprintTickets {
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
export const onUpdateSprintTickets = /* GraphQL */ `
  subscription OnUpdateSprintTickets {
    onUpdateSprintTickets {
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
export const onDeleteSprintTickets = /* GraphQL */ `
  subscription OnDeleteSprintTickets {
    onDeleteSprintTickets {
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
