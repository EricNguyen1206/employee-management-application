import { useState, useEffect } from "react";
import DepartServices from "../services/DepartServices";
import EmployeeServices from "../services/EmployeeServices";

function ViewDashboard() {
    const [departments, setDepartments] = useState([]);
    const [highestPay, setHighestPay] = useState(0);
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [totalManager, setTotalManager] = useState(0);

    useEffect(() => {
        DepartServices.getDeparts().then((res) => {
            setDepartments(res.data);
        });
        EmployeeServices.getEmployees().then((res) => {
            const employees = res.data;
            setHighestPay(
                Math.max.apply(
                    Math,
                    employees.map((employee) => employee.salary)
                )
            );
            setTotalManager(
                employees.filter((employee) => employee.role === "Manager")
                    .length
            );
            setTotalEmployees(employees.length);
        });
    }, []);
    return (
        <div className="container-fluid px-4">
            <div className="row g-3 my-2">
                <div className="col-md-3">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                        <div>
                            <h3 className="fs-2">{departments.length}</h3>
                            <p className="fs-5">Total Department</p>
                        </div>
                        <i className="fas fa-briefcase fs-1 primary-text border rounded-full secondary-bg p-3" />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                        <div>
                            <h3 className="fs-2">{totalManager}</h3>
                            <p className="fs-5">Total Manager</p>
                        </div>
                        <i className="fas fa-user-tie fs-1 primary-text border rounded-full secondary-bg p-3" />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                        <div>
                            <h3 className="fs-2">{totalEmployees}</h3>
                            <p className="fs-5">Total Employees</p>
                        </div>
                        <i className="fas fa-user-friends fs-1 primary-text border rounded-full secondary-bg p-3" />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                        <div>
                            <h3 className="fs-2">{highestPay}</h3>
                            <p className="fs-5">Highest Salary</p>
                        </div>
                        <i className="fas fa-hand-holding-usd fs-1 primary-text border rounded-full secondary-bg p-3" />
                    </div>
                </div>
            </div>

            <div className="d-flex flex-column">
                <h3 className="fs-4 mb-3">Recent Departments</h3>
                <div className="col">
                    <table className="table bg-white rounded shadow-sm table-hover">
                        <thead>
                            <tr>
                                <th scope="col" width={50}>
                                    #
                                </th>
                                <th scope="col">Name</th>
                                <th scope="col">Manager</th>
                                <th scope="col">Employees</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map((depart) => (
                                <tr>
                                    <th scope="row">{depart.id}</th>
                                    <td>{depart.name}</td>
                                    <td>
                                        {depart.manager
                                            ? depart.manager.firstName
                                            : "undefined"}
                                    </td>
                                    <td>
                                        {depart.numberOfEmployees}/
                                        {depart.maxEmployees}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewDashboard;
