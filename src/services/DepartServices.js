import axios from "axios";

const DEPART_API_BASE_URL = "http://localhost:8070/api/v1/departments";

class DepartServices {
    getDeparts() {
        return axios.get(DEPART_API_BASE_URL);
    }

    createDepart(depart) {
        return axios.post(DEPART_API_BASE_URL, depart);
    }

    getDepartById(id) {
        return axios.get(DEPART_API_BASE_URL + "/" + id);
    }

    updateDepart(depart, id) {
        return axios.put(DEPART_API_BASE_URL + "/" + id, depart);
    }

    deleteDepart(id) {
        return axios.delete(DEPART_API_BASE_URL + "/" + id);
    }
}

export default new DepartServices();
