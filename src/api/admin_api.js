import { Auth, API } from "aws-amplify"

export default {
  async createUser(userEmail) {
    let apiName = "AdminQueries";
    let path = "/createUser";
    let data = {
      body: {
        username: userEmail,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    };
    return await API.post(apiName, path, data)
  },

  async addUserToGroup(userEmail, group) {
    let apiName = "AdminQueries";
    let path = "/addUserToGroup";
    let data = {
      body: {
        username: userEmail,
        groupname: group,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    };
    return await API.post(apiName, path, data)
  },

  async getUserGroups(userEmail) {
    let apiName = "AdminQueries";
    let path = "/listGroupsForUser";
    let data = {
      body: {
        username: userEmail,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    };
    return await API.get(apiName, path, data)
  },

  async getAllUsers() {
    let apiName = "AdminQueries";
    let path = "/listUsers";
    let data = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    };
    return await API.get(apiName, path, data)
  },

  async getAllUsersByGroup(group) {
    let apiName = "AdminQueries";
    let path = "/listUsersInGroup";
    let data = {
      queryStringParameters: {
        groupname: group,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    };
    return await API.get(apiName, path, data)
  },
};
