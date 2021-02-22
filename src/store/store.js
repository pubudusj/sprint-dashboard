import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import api from './../api/api'

Vue.use(Vuex)

export const store = new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.localStorage,
    })],
    state: {
        loginUser: []
    },
    mutations: {
        setLoginUser(state, data) {
            state['loginUser'] = data
        }
    },
    actions: {
        async fetchLoginUser({ commit }) {
            let loginuser = {};
            await api.fetchLoginUser().then(user => {
              loginuser = {
                  id: user.attributes.sub,
                  email: user.attributes.email,
                  name: user.attributes.email,
                  groups: user.signInUserSession.accessToken.payload["cognito:groups"],
                  firstName: '',
                  lastName: '',
                  department: '',
                  designation: '',
              }
            })
            commit('setLoginUser', loginuser)
            return loginuser
          },
    },
    getters: {
        loginUser: state => state.loginUser,
        isLoginUserAdmin: state => {
            return state.loginUser.groups.contains('Admins')
        }
    }
})
