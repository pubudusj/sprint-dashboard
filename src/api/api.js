import { Auth } from "aws-amplify";

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
    }

    // async fetchUserProfile(userId) {

    // }
}
