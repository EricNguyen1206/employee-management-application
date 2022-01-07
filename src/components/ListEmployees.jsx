import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeServices from "../services/EmployeeServices";

function ListEmployees() {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        EmployeeServices.getEmployees().then((res) => {
            console.log(res);
            setEmployees(res.data);
        });
    }, []);

    const editEmployee = (id) => {
        console.log("edit");
        navigate(`/update-employee/${id}`);
    };

    const deleteEmployee = (id) => {
        console.log("delete");
        EmployeeServices.deleteEmployee(id)
            .then((res) => {
                setEmployees(
                    employees.filter((employee) => employee.id !== id)
                );
            })
            .catch((res) => {
                const error = res.response.data.message;
                alert(error);
            });
    };

    const viewEmployee = (id) => {
        navigate(`/view-employee/${id}`);
    };

    return (
        <div>
            <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className="mt-3"
            >
                <h2 className="text-center">Employees List</h2>
                <button
                    type="button"
                    className="btn btn-outline-success btn-sm ml-3"
                >
                    <a className="nav-link" href="/update-employee/_add">
                        Add Employee
                    </a>
                </button>
            </div>
            <div className="row mt-3">
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#id</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Email</th>
                            <th scope="col">Deparment</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, index) => (
                            <tr key={index}>
                                {console.log(employee)}
                                <th>{employee.id}</th>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.gender}</td>
                                <td>{employee.email}</td>
                                <td>{employee.depart}</td>
                                <td>
                                    <button
                                        onClick={() =>
                                            viewEmployee(employee.id)
                                        }
                                        className="btn btn-info"
                                    >
                                        Details
                                    </button>
                                    <button
                                        onClick={() =>
                                            editEmployee(employee.id)
                                        }
                                        className="btn btn-success ml-4"
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-danger ml-4"
                                        onClick={() =>
                                            deleteEmployee(employee.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListEmployees;
