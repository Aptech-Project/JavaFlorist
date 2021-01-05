/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const baseApi = "http://localhost:53534/api/"

export default {

    products(url = baseApi + 'Products/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    }
}