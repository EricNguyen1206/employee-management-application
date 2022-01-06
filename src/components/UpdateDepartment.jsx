import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DepartServices from "../services/DepartServices";
import EmployeeServices from "../services/EmployeeServices";
function UpdateDepartment() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [manager, setManager] = useState({});
    const [maxEmployees, setMaxEmployees] = useState(0);
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
                    setMaxEmployees(department.maxEmployees);
                    setManager(department.manager ? department.manager : {});
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
        setMaxEmployees(e.target.value);
    };

    const handleCancel = () => {
        navigate("/departments");
    };

    const handleAddEmployee = (employeeId) => {
        if (manager && employeeId === manager.id) {
            return;
        }
        EmployeeServices.addEmployeeToDepart(id, employeeId).then((res) => {
            const newStaff = res.data;
            setEmployees(
                employees.filter((employee) => employeeId !== employee.id)
            );
            console.log("check", res.data.employee);
            setStaff([...staff, newStaff]);
        });
    };

    const handleDeleletStaff = (staffId) => {
        if (staffId === manager.id) {
            return;
        }
        EmployeeServices.removeEmployeeFromDepart(id, staffId).then((res) => {
            const newEmployee = res.data;
            console.log("after delete: " + newEmployee);
            setEmployees([...employees, newEmployee]);
            setStaff(staff.filter((s) => s.id !== newEmployee.id));
        });
    };

    const handlePromoteStaff = (staffId) => {
        if (manager.id) {
            if (staffId === manager.id) {
                console.log("staff is already promoted");
                return;
            }
            EmployeeServices.setToStaff(id, manager.id)
                .then((res) => {
                    EmployeeServices.setToManager(id, staffId)
                        .then((res) => {
                            const newManager = res.data;
                            setManager(newManager);
                        })
                        .catch((err) => {
                            console.log("failed to set manager", err);
                        });

                    const newStaff = res.data;
                    setStaff([
                        ...staff.filter((s) => s.id !== staffId),
                        newStaff,
                    ]);
                })
                .catch((err) => {
                    console.log("failed to set staff", err);
                });
        } else {
            EmployeeServices.setToManager(id, staffId).then((res) => {
                const newManager = res.data;
                setManager(newManager);
                setStaff([...staff.filter((s) => s.id !== staffId)]);
            });
        }
    };

    const handleUpdateDepartment = () => {
        const department = {
            name,
            maxEmployees,
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
                    <form>
                        <div className="form-group">
                            <label>Department {id}:</label>
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
                            <label>Max Employees</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Department"
                                name="name"
                                value={maxEmployees}
                                onChange={(e) => handleChangeSalary(e)}
                            />
                        </div>
                        <div className="d-flex flex-row mb-2">
                            <div className="mr-4">
                                Manager:
                                <span>
                                    {manager
                                        ? manager.lastName +
                                          " " +
                                          manager.firstName
                                        : "Null"}
                                </span>
                            </div>
                            <div className="ml-4">
                                Id:
                                <span>{manager ? manager.id : "Null"}</span>
                            </div>
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
                                                Employee free
                                            </h5>
                                            <button
                                                type="button"
                                                className="close"
                                                data-dismiss="modal"
                                                aria-label="Close"
                                            >
                                                <span aria-hidden="true">
                                                    x
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
                                                        key={employee.id}
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
                                                                onClick={() =>
                                                                    handleAddEmployee(
                                                                        employee.id
                                                                    )
                                                                }
                                                            >
                                                                Add
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ul
                    className="list-group"
                    style={{
                        alignItems: "center",
                        height: "300px",
                        width: "538px",
                        backgroundColor: "#ccc",
                        borderRadius: "5px",
                        padding: "5px",
                        margin: "auto",
                        overflow: "auto",
                    }}
                >
                    {manager.id ? (
                        <li
                            className="list-group-item d-flex flex-row justify-content-between align-items-center"
                            style={{ width: "98%" }}
                        >
                            {manager.id +
                                "|" +
                                manager.firstName +
                                " " +
                                manager.lastName}
                            <div>
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-sm ml-3"
                                    onClick={() =>
                                        handlePromoteStaff(manager.id)
                                    }
                                >
                                    Promote
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-sm ml-3"
                                    onClick={() =>
                                        handleDeleletStaff(manager.id)
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ) : (
                        ""
                    )}
                    {staff.map((employee) => (
                        <li
                            key={employee.id}
                            className="list-group-item d-flex flex-row justify-content-between align-items-center"
                            style={{ width: "98%" }}
                        >
                            {employee.id +
                                "|" +
                                employee.firstName +
                                " " +
                                employee.lastName}
                            <div>
                                <button
                                    type="button"
                                    className={`btn ${
                                        manager
                                            ? employee.id === manager.id
                                                ? `btn-secondary`
                                                : `btn-success`
                                            : `btn-success`
                                    } btn-sm ml-3`}
                                    onClick={() =>
                                        handlePromoteStaff(employee.id)
                                    }
                                >
                                    Promote
                                </button>
                                <button
                                    type="button"
                                    className={`btn ${
                                        manager
                                            ? employee.id === manager.id
                                                ? `btn-secondary`
                                                : `btn-danger`
                                            : `btn-danger`
                                    } btn-sm ml-3`}
                                    onClick={() =>
                                        handleDeleletStaff(employee.id)
                                    }
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
