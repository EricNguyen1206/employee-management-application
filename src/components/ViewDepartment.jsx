import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DepartServices from "../services/DepartServices";

function ViewDepartment() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [baseSalary, setBaseSalary] = useState(0);
    const [manager, setManager] = useState("Tuan");
    const [staffs, setStaffs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        DepartServices.getDepartById(id)
            .then((res) => {
                console.log(res);
                let department = res.data;
                setName(department.name);
                setBaseSalary("$" + department.basicSalary);
                setStaffs([...department.employee]);
                setManager(
                    department.manager.firstName +
                        " " +
                        department.manager.lastName
                );
                console.log("Load department successfully!");
                console.log(department);
            })
            .catch((err) => {
                console.log("Can't find department with id " + id);
                console.error(err);
            });
    }, []);

    return (
        <div>
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
                        Base Salary: <span>{baseSalary}</span>
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Manager: <span>{manager}</span>
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
            <table className="table table-success table-striped mt-3">
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
                    {staffs.map((staff, i) => (
                        <tr key={i}>
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
