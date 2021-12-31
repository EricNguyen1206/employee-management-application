import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DepartServices from "../services/DepartServices";

function ViewDepartment() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [baseSalary, setBaseSalary] = useState(0);
    const [manager, setManager] = useState("Tuan");
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        DepartServices.getDepartById(id)
            .then((res) => {
                console.log(res);
                let department = res.data;
                setName(department.name);
                setBaseSalary("$" + department.basicSalary);
                setEmployees([...department.employee]);
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
                </div>
            </div>
            <button
                type="button"
                className="btn btn-outline-danger btn-sm ml-3"
                onClick={() => navigate("/departments")}
            >
                Back
            </button>
        </div>
    );
}

export default ViewDepartment;
