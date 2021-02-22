import { Auth } from "aws-amplify"
import admin_api from './admin_api'

export default {
    async fetchLoginUser() {
        return Auth.currentAuthenticatedUser()
    },

    async updatePassword(user, oldPassword, newPassword) {
        return Auth.changePassword(
            user,
            oldPassword,
            newPassword
          );
    },

    async completeNewPassword(user, password) {
        return Auth.completeNewPassword(
            user,
            password
          )
    },

    async createNewUser(user) {
        return admin_api.createUser(user.email)
    },

    async addUserToUsersGroup(user) {
        return admin_api.addUserToGroup(user.email, 'Users')
    },

    async getUserGroups(user) {
        return admin_api.getUserGroups(user.email)
    }

    // async fetchUserProfile(userId) {

    // }
}
