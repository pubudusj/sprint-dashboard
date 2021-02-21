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
                  firstName: '',
                  lastName: '',
                  department: '',
                  designation: '',
              }
            })
            // await api.fetchUserProfile(loginuser.id).then(user => {
            //     // TODO: call profile api
            //   })
            commit('setLoginUser', loginuser)
            return loginuser
          },
    },
    getters: {
        loginUser: state => state.loginUser
    }
})
