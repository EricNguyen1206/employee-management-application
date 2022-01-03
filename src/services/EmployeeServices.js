import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8070/api/v1/employees";
const ADD_EMPLOYEE_TO_DEPART =
    "http://localhost:8070/api/v1/addEmployeeToDepart";
const DELETE_EMPLOYEE_FROM_DEPART =
    "http://localhost:8070/api/v1/removeEmployeeFromDepart";
const SET_TO_MANAGER = "http://localhost:8070/api/v1/setToManager";
const SET_TO_STAFF = "http://localhost:8070/api/v1/setToStaff";

class Employeeservices {
    getEmployees() {
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createEmployee(employee) {
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    getEmployeeById(id) {
        return axios.get(EMPLOYEE_API_BASE_URL + "/" + id);
    }

    updateEmployee(employee, id) {
        return axios.put(EMPLOYEE_API_BASE_URL + "/" + id, employee);
    }

    deleteEmployee(id) {
        return axios.delete(EMPLOYEE_API_BASE_URL + "/" + id);
    }

    addEmployeeToDepart(departId, employeeId) {
        return axios.put(
            ADD_EMPLOYEE_TO_DEPART + "/" + departId + "/" + employeeId
        );
    }

    removeEmployeeFromDepart(departId, employeeId) {
        console.log(
            "Removing employee:",
            DELETE_EMPLOYEE_FROM_DEPART + "/" + departId + "/" + employeeId
        );
        return axios.put(
            DELETE_EMPLOYEE_FROM_DEPART + "/" + departId + "/" + employeeId
        );
    }

    setToManager(departId, employeeId) {
        return axios.put(SET_TO_MANAGER + "/" + departId + "/" + employeeId);
    }

    setToStaff(departId, employeeId) {
        return axios.put(SET_TO_STAFF + "/" + departId + "/" + employeeId);
    }
}

export default new Employeeservices();
