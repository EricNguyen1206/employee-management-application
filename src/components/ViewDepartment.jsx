import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DepartServices from "../services/DepartServices";

function ViewDepartment() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [maxEmployees, setMaxEmployees] = useState(1);
    const [currentEmployees, setCurrentEmployees] = useState(0);
    const [manager, setManager] = useState({});
    const [staffs, setStaffs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("view department:" + id);
        DepartServices.getDepartById(id)
            .then((res) => {
                const department = res.data;
                setName(department.name);
                setCurrentEmployees(department.numberOfEmployees);
                setMaxEmployees(department.maxEmployees);
                setStaffs(department.employee);
                setManager(department.manager ? department.manager : {});
                console.log("Load department successfully!");
                console.log(department);
            })
            .catch((err) => {
                console.log("Can't find department with id " + id);
                console.error(err);
            });
    }, [id]);

    return (
        <div className="mt-3">
            <div
                className="card"
                style={{ textAlign: "start", width: "50%", margin: "auto" }}
            >
                <div className="card-body">
                    <h5 className="card-title">Department details</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Department: <span>{name}</span>
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Department Id: <span>{id}</span>
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Max Employees: <span>{maxEmployees}</span>
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Current Employees: <span>{currentEmployees}</span>
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Manager:{" "}
                        <span>
                            {manager.id
                                ? manager.firstName + " " + manager.lastName
                                : "Null"}
                        </span>
                    </h6>

                    <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => navigate("/departments")}
                    >
                        Back
                    </button>
                </div>
            </div>
            <table className="table bg-white rounded shadow-sm table-hover mt-3">
                <thead>
                    <tr>
                        <th scope="col">#id</th>
                        <th scope="col">First name</th>
                        <th scope="col">Last name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
                        <th scope="col">Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {manager.id ? (
                        <tr>
                            <th scope="row">{manager.id}</th>
                            <td>{manager.firstName}</td>
                            <td>{manager.lastName}</td>
                            <td>{manager.gender}</td>
                            <td>{manager.phone}</td>
                            <td>{manager.email}</td>
                            <td>{manager.salary}</td>
                        </tr>
                    ) : (
                        ""
                    )}
                    {staffs.map((staff) => (
                        <tr key={staff.id}>
                            <th scope="row">{staff.id}</th>
                            <td>{staff.firstName}</td>
                            <td>{staff.lastName}</td>
                            <td>{staff.gender}</td>
                            <td>{staff.phone}</td>
                            <td>{staff.email}</td>
                            <td>{staff.salary}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewDepartment;
