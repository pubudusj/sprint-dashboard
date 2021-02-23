import { API } from "aws-amplify"
import * as mutations from './../graphql/mutations';
import * as queries from './../graphql/queries';

export default {
    async fetchAllUsers() {
        return await API.graphql({
            query: queries.listUsers,
        });
    },

    async fetchUser(id) {
        return await API.graphql({
            query: queries.getUser,
            variables: {id: id},
        });
    },

    async createUser(userData) {
        return await API.graphql({
            query: mutations.createUser,
            variables: {input: userData},
        });
    },

    async updateUser(userData) {
        return await API.graphql({
            query: mutations.updateUser,
            variables: {input: userData},
        });
    },

    async createSprint(data) {
        return await API.graphql({
            query: mutations.createSprint,
            variables: {input: data},
        });
    },
}
