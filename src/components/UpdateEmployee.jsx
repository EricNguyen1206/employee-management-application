import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeServices from "../services/EmployeeServices";

function UpdateEmployee() {
    const { id } = useParams();
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (id === "_add") {
            return;
        } else {
            EmployeeServices.getEmployeeById(id).then((res) => {
                let employee = res.data;
                setFirstName(employee.firstname);
                setLastName(employee.lastname);
                setEmailId(employee.emailId);
            });
        }
    }, [id]);

    const handleChangeFirstName = (e) => {
        setFirstName(e.target.value);
    };

    const handleChangeLastName = (e) => {
        setLastName(e.target.value);
    };

    const handleChangeEmailId = (e) => {
        setEmailId(e.target.value);
    };

    const handleCancel = () => {
        navigate("/employees");
    };

    const handleUpdateEmployee = () => {
        const employee = { firstname, lastname, emailId };
        if (id === "_add") {
            EmployeeServices.createEmployee(employee).then((res) => {
                navigate("/employees");
            });
        } else {
            EmployeeServices.updateEmployee(employee, id).then((res) => {
                navigate("/employees");
            });
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <h3 className="text-center">{`${
                        id === "_add" ? "Add" : "Update"
                    } Employee`}</h3>
                    <div className="card-body"></div>
                    <form>
                        <div className="form-group">
                            <label>Employee Name</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="First name"
                                name="firstName"
                                value={firstname}
                                onChange={(e) => handleChangeFirstName(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Last name"
                                name="lastName"
                                value={lastname}
                                onChange={(e) => handleChangeLastName(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Email"
                                name="email"
                                value={emailId}
                                onChange={(e) => handleChangeEmailId(e)}
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-outline-danger btn-sm ml-3"
                            onClick={() => handleCancel()}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-success btn-sm ml-3"
                            onClick={() => handleUpdateEmployee()}
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default UpdateEmployee;
