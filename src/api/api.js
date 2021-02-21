import { Auth } from "aws-amplify";

export default {
    async fetchLoginUser() {
        return Auth.currentAuthenticatedUser()
    },

    // async fetchUserProfile(userId) {

    // }
}
