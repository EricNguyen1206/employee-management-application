import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DepartServices from "../services/DepartServices";
import EmployeeServices from "../services/EmployeeServices";
function UpdateDepartment() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [manager, setManager] = useState({});
    const [basicSalary, setBasicSalary] = useState(0);
    const [staff, setStaff] = useState([]);
    const [employees, setEmployees] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (id === "_add") {
            return;
        } else {
            DepartServices.getDepartById(id)
                .then((res) => {
                    const department = res.data;
                    setName(department.name);
                    setBasicSalary(department.basicSalary);
                    setManager(department.manager);
                    setStaff(department.employee);
                    console.log(department);
                })
                .catch((err) => {
                    console.log(err);
                });

            EmployeeServices.getEmployees().then((res) => {
                let employeeReturn = res.data;
                employeeReturn = employeeReturn.filter((e) => e.depart === 0);
                setEmployees(employeeReturn);
            });
        }
    }, [id]);

    const handleChangeName = (e) => {
        setName(e.target.value);
    };

    const handleChangeSalary = (e) => {
        setBasicSalary(e.target.value);
    };

    const handleCancel = () => {
        navigate("/departments");
    };

    const handleUpdateDepartment = () => {
        const department = {
            name,
            basicSalary,
        };
        if (id === "_add") {
            DepartServices.createDepart(department)
                .then((res) => {
                    console.log("Create department successfully");
                    navigate("/departments");
                })
                .catch(() => {
                    console.log("Failed to create department");
                })
                .finally(() => {
                    console.log(department);
                });
        } else {
            DepartServices.updateDepart(department, id)
                .then((res) => {
                    console.log("Update department successfully");
                    navigate("/departments");
                })
                .catch(() => {
                    console.log("Failed to update department");
                })
                .finally(() => {
                    console.log(department);
                });
        }
    };

    return (
        <div>
            <div className="row" style={{ textAlign: "left" }}>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center">
                        {`${id === "_add" ? "Add" : "Update"} Department`}
                    </h3>
                    <div className="card-body"></div>
                    <form>
                        <div className="form-group">
                            <label>Department:</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Department"
                                name="name"
                                value={name}
                                onChange={(e) => handleChangeName(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Base Salary</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Department"
                                name="name"
                                value={basicSalary}
                                onChange={(e) => handleChangeSalary(e)}
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-outline-danger btn-sm mr-3 mb-3"
                            onClick={() => handleCancel()}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-success btn-sm mr-3 mb-3"
                            onClick={() => handleUpdateDepartment()}
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>

            <div>
                <div style={{ width: "50%", margin: "auto" }}>
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <h1>Staff</h1>
                        <div>
                            {/* Button trigger modal */}
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-toggle="modal"
                                data-target="#exampleModal"
                            >
                                Add Staff
                            </button>
                            {/* Modal */}
                            <div
                                className="modal fade"
                                id="exampleModal"
                                tabIndex={-1}
                                role="dialog"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                            >
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5
                                                className="modal-title"
                                                id="exampleModalLabel"
                                            >
                                                Modal title
                                            </h5>
                                            <button
                                                type="button"
                                                className="close"
                                                data-dismiss="modal"
                                                aria-label="Close"
                                            >
                                                <span aria-hidden="true">
                                                    ×
                                                </span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <ul
                                                className="list-group"
                                                style={{ alignItems: "center" }}
                                            >
                                                {employees.map((employee) => (
                                                    <li
                                                        className="list-group-item d-flex flex-row justify-content-between align-items-center"
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                    >
                                                        {employee.id +
                                                            " | " +
                                                            employee.firstName +
                                                            " " +
                                                            employee.lastName}
                                                        <div>
                                                            <button
                                                                type="button"
                                                                className="btn btn-success btn-sm ml-3"
                                                            >
                                                                Promote
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger btn-sm ml-3"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                data-dismiss="modal"
                                            >
                                                Close
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                            >
                                                Save changes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ul className="list-group" style={{ alignItems: "center" }}>
                    {staff.map((employee) => (
                        <li
                            className="list-group-item d-flex flex-row justify-content-between align-items-center"
                            style={{ width: "50%" }}
                        >
                            {employee.id +
                                "|" +
                                employee.firstName +
                                " " +
                                employee.lastName}
                            <div>
                                <button
                                    type="button"
                                    className="btn btn-success btn-sm ml-3"
                                >
                                    Promote
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm ml-3"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default UpdateDepartment;
