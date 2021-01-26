/* eslint-disable import/no-anonymous-default-export */
import { Feedback } from "@material-ui/icons";
import axios from "axios";

const baseApi = "http://localhost:5000/api/"

export default {
    products(url = baseApi + 'Products/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    },
    categories(url = baseApi + 'Categories/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    },
    contact(url = baseApi + 'Contacts/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    },
    feedbacks(url = baseApi + 'Feedbackdatums/') {
        return {
            fetchAll: () => axios.get(url),
            fetchByIdPro: (pId, uId) => axios.get(url + "Comment/" + pId),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            repComment: (id, rep) => axios.put(url + "RepComment/" + id + "/" + rep, rep),
            delete: id => axios.delete(url + id)
        }
    },
    customers(url = baseApi + 'Users/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id),
            deleteID: id => axios.deleteID(url + "Delete/" + id),
            updateActive: (id) => axios.put(url + "EditActive/" + id),
            updateInActive: (id) => axios.put(url + "InAtive/" + id),
            login: email => axios.get(url + "login/" + email)
        }
    },
    carts(url = baseApi + 'Carts/') {
        return {
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id),
        }
    },
    cartdetail(url = baseApi + 'Cartdetails/') {
        return {
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id),
        }
    },
    orders(url = baseApi + 'Orders/') {
        return {
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id),
        }
    }
}