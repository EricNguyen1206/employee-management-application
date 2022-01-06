import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeServices from "../services/EmployeeServices";

function UpdateEmployee() {
    const { id } = useParams();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("male");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [birthDay, setBirthDay] = useState("2001-01-01");
    const [role, setRole] = useState("Staff");
    const [salary, setSalary] = useState(0);
    const [depart_fk, setDepart_fk] = useState(1);
    const [lastId, setLastId] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        if (id === "_add") {
            EmployeeServices.getEmployees().then((res) => {
                let employees = res.data;
                let maxId = Math.max.apply(
                    Math,
                    employees.map((employee) => employee.id)
                );
                console.log("maxId:", maxId);
                setLastId(maxId);
            });
            return;
        } else {
            EmployeeServices.getEmployeeById(id).then((res) => {
                let employee = res.data;
                setFirstName(employee.firstName);
                setLastName(employee.lastName);
                setGender(employee.gender);
                setEmail(employee.email);
                setPhone(employee.phone);
                setBirthDay(employee.birthDay);
                setSalary(employee.salary);
                setDepart_fk(employee.depart_fk);
            });
        }
    }, [id]);

    const handleChangeFirstName = (e) => {
        setFirstName(e.target.value);
    };

    const handleChangeLastName = (e) => {
        setLastName(e.target.value);
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePhone = (e) => {
        setPhone(e.target.value);
    };

    const handleChangeBirthDay = (e) => {
        setBirthDay(e.target.value);
    };

    const handleChangeSalary = (e) => {
        setSalary(e.target.value);
    };

    const handleCancel = () => {
        navigate("/employees");
    };

    const handleUpdateEmployee = () => {
        const employee = {
            id: lastId + 1,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            email: email,
            phone: phone,
            birthDay: birthDay,
            salary: salary,
        };
        if (id === "_add") {
            EmployeeServices.createEmployee(employee)
                .then((res) => {
                    navigate("/employees");
                })
                .catch((err) => {
                    console.log("Failed to create employee", err);
                })
                .finally(() => {
                    console.log(employee);
                });
        } else {
            EmployeeServices.updateEmployee(employee, id).then((res) => {
                navigate("/employees");
            });
        }
    };

    return (
        <div className="container">
            <div className="row" style={{ textAlign: "left" }}>
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <h3 className="text-center">
                        {`${id === "_add" ? "Add" : "Update"} Employee`}{" "}
                    </h3>
                    <div className="card-body"></div>
                    <form>
                        <div className="form-group">
                            <label>Employee First Name</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="First name"
                                name="firstName"
                                value={firstName}
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
                                value={lastName}
                                onChange={(e) => handleChangeLastName(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Gender</label>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                }}
                            >
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        value="male"
                                        onClick={() => setGender("male")}
                                        name="flexRadioDefault"
                                        id="flexRadioDefault1"
                                        defaultChecked
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="flexRadioDefault1"
                                    >
                                        male
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        value="female"
                                        onClick={() => setGender("female")}
                                        name="flexRadioDefault"
                                        id="flexRadioDefault2"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="flexRadioDefault2"
                                    >
                                        female
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        value="other"
                                        onClick={() => setGender("other")}
                                        name="flexRadioDefault"
                                        id="flexRadioDefault2"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="flexRadioDefault2"
                                    >
                                        other
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                className="form-control"
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={(e) => handleChangeEmail(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label>BirthDay</label>
                            <input
                                className="form-control"
                                type="date"
                                name="birthDay"
                                value={birthDay}
                                onChange={(e) => handleChangeBirthDay(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Phone number"
                                name="phone"
                                value={phone}
                                onChange={(e) => handleChangePhone(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Salary</label>
                            <input
                                className="form-control"
                                type="number"
                                placeholder="Salary"
                                name="salary"
                                value={salary}
                                onChange={(e) => handleChangeSalary(e)}
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
