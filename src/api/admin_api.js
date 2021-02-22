import { Auth, API } from "aws-amplify";

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
    return await API.post(apiName, path, data);
  },

  async addUserToGroup(userEmail, group) {
    let apiName = "AdminQueries";
    let path = "/addUserToGroup";
    let data = {
      body: {
        username: userEmail,
        groupname: group
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    };
    return await API.post(apiName, path, data);
  },
};
