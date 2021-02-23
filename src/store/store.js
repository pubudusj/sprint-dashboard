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
    }

  },
  getters: {
    loginUser: (state) => state.loginUser,
    isLoginUserAdmin: (state) => {
      return state.loginUser.groups && state.loginUser.groups.includes("Admins");
    },
  },
});
