import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeServices from "../services/EmployeeServices";

function ListEmployees() {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        EmployeeServices.getEmployees().then((response) => {
            console.log(response);
            setEmployees(response.data);
        });
    });

    const editEmployee = (id) => {
        console.log("edit");
        navigate(`/update-employee/${id}`);
    };

    const deleteEmployee = (id) => {
        console.log("delete");
        EmployeeServices.deleteEmployee(id).then((res) => {
            setEmployees(employees.filter((employee) => employee.id !== id));
        });
    };

    const viewEmployee = (id) => {
        navigate(`/view-employee/${id}`);
    };

    return (
        <div>
            <h2 className="text-center">Employees List</h2>
            <div className="row">
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#id</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, index) => (
                            <tr key={index}>
                                {console.log(employee)}
                                <th>{employee.id}</th>
                                <td>{employee.firstname}</td>
                                <td>{employee.lastname}</td>
                                <td>{employee.emailId}</td>
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
