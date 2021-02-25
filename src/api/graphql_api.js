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

    async updateSprint(data) {
        return await API.graphql({
            query: mutations.updateSprint,
            variables: {input: data},
        });
    },

    async fetchAllSprints() {
        return await API.graphql({
            query: queries.listSprints,
        });
    },

    async createTicket(data) {
        return await API.graphql({
            query: mutations.createTicket,
            variables: {input: data},
        });
    },

    async getTicketById(id) {
        return await API.graphql({
            query: queries.getTicket,
            variables: {id: id},
        });
    },

    async updateTicket(data) {
        return await API.graphql({
            query: mutations.updateTicket,
            variables: {input: data},
        });
    },

    async addTicketToSprint(data) {
        return await API.graphql({
            query: mutations.createSprintTickets,
            variables: {input: data},
        });
    },

    async getBacklogTickets() {
        return await API.graphql({
            query: queries.listTickets,
            variables: {filter: {status: {eq:'backlog'}}},
        });
    },

    async removeTicketFromSprint(data) {
        return await API.graphql({
            query: mutations.deleteSprintTickets,
            variables: {input: data},
        });
    },
}
