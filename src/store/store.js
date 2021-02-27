import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import api from "./../api/api";

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.localStorage,
    }),
  ],
  state: {
    loginUser: {},
    allUsers: [],
    adminUsers: [],
    allUserProfiles: [],
    allSprints: [],
    allBackendTickets: [],
    ticketTypesList: [
      { title: "Bug", id: "bug" },
      { title: "Story", id: "story" },
      { title: "Task", id: "task" },
    ],
    ticketPrioritiesList: [
      { title: "Highest", id: "highest" },
      { title: "High", id: "high" },
      { title: "Medium", id: "medium" },
      { title: "Low", id: "low" },
      { title: "Lowest", id: "lowest" },
    ],
    ticketStagesList: [
      { title: "ToDo", id: "todo" },
      { title: "In Progress", id: "inprogress" },
      { title: "Review", id: "review" },
      { title: "Test", id: "test" },
      { title: "Done", id: "done" },
    ],
  },
  mutations: {
    setLoginUser(state, data) {
      state["loginUser"] = data;
    },
    setAllUsers(state, data) {
      state["allUsers"] = data;
    },
    setAllAdminUsers(state, data) {
      state["adminUsers"] = data;
    },
    setAllUserProfiles(state, data) {
      state["allUserProfiles"] = data;
    },
    setAllSprints(state, data) {
      state["allSprints"] = data;
    },
    setAllBackendTickets(state, data) {
      state["allBackendTickets"] = data;
    },
  },
  actions: {
    async fetchLoginUser({ commit }) {
      let loginuser = {};
      commit("setLoginUser", loginuser);
      await api.fetchLoginUser().then((user) => {
        loginuser = {
          id: user.attributes.sub,
          email: user.attributes.email,
          name: user.attributes.email,
          groups: user.signInUserSession.accessToken.payload["cognito:groups"],
          firstName: "",
          lastName: "",
          department: "",
          designation: "",
        };
      });
      try {
        await api.getUserById(loginuser.id).then((data) => {
          let profile = data.data.getUser;
          if (profile !== null) {
            loginuser.firstName = profile.firstname;
            loginuser.lastName = profile.lastname;
            loginuser.department = profile.department;
            loginuser.designation = profile.designation;
            loginuser.name = profile.firstname + " " + profile.lastname;
          }
        });
      } catch (e) {
        console.log(e);
      }
      commit("setLoginUser", loginuser);
      return loginuser;
    },

    async fetchAllUsers({ commit }) {
      let users = [];
      await api.getAllUsers().then((data) => {
        try {
          data["Users"].forEach((element) => {
            users.push({
              id: element.Attributes.find((x) => x.Name === "sub").Value,
              email: element.Attributes.find((x) => x.Name === "email").Value,
              status: element.UserStatus,
            });
          });
        } catch (e) {
          console.log(e);
        }
        commit("setAllUsers", users);
      });

      return users;
    },

    async fetchAllAdminUsers({ commit }) {
      let users = [];
      await api.getAllAdminUsers().then((data) => {
        try {
          data["Users"].forEach((element) => {
            users.push({
              id: element.Attributes.find((x) => x.Name === "sub").Value,
              email: element.Attributes.find((x) => x.Name === "email").Value,
              status: element.UserStatus,
            });
          });
        } catch (e) {
          console.log(e);
        }
        commit("setAllAdminUsers", users);
      });

      return users;
    },

    async fetchAllUserProfiles({ commit }) {
      let users = [];
      await api.getAllUserProfiles().then((data) => {
        try {
          users = data.data.listUsers.items;
          commit("setAllUserProfiles", users);
        } catch (e) {
          console.log(e);
        }
      });

      return users;
    },

    async fetchAllSprints({ commit }) {
      let sprints = [];
      await api.getAllSprints().then((data) => {
        try {
          sprints = data.data.listSprints.items;
        } catch (e) {
          console.log(e);
        }
        commit("setAllSprints", sprints);
      });

      return sprints;
    },

    async fetchTicketsForBacklog({ commit }) {
      let tickets = [];
      await api.getBacklogTickets().then((data) => {
        try {
          tickets = data.data.listTickets.items;
        } catch (e) {
          console.log(e);
        }
        commit("setAllBackendTickets", tickets);
      });

      return tickets;
    },
  },
  getters: {
    loginUser: (state) => state.loginUser,
    isLoginUserAdmin: (state) => {
      return (
        state.loginUser.groups && state.loginUser.groups.includes("Admins")
      );
    },
    getSprintById(state) {
      return function(id) {
        return state.allSprints && state.allSprints.find((x) => x.id === id);
      };
    },
    getAllSprints(state) {
      return state.allSprints;
    },
    getTicketById(state) {
      return function(id) {
        return state.allSprints && state.allSprints.find((x) => x.id === id);
      };
    },
    ticketPrioritiesList: (state) => state.ticketPrioritiesList,
    ticketTypesList: (state) => state.ticketTypesList,
    ticketStagesList: (state) => state.ticketStagesList,
    ticketAssignees: (state) => {
      return state.allUserProfiles.sort((a, b) => a.firstname - b.firstname);
    },
    currentSprint: (state) => state.allSprints && state.allSprints.find((x) => x.isCurrent == true)
  },
});
