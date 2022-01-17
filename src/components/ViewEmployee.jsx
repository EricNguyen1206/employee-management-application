import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeServices from "../services/EmployeeServices";

function ViewEmployee() {
    const { id } = useParams();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("male");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [birthDay, setBirthDay] = useState("2001-01-01");
    const [role, setRole] = useState("staff");
    const [salary, setSalary] = useState(0);
    const [depart, setDepart] = useState(1);
    const [promotedDay, setPromotedDay] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        EmployeeServices.getEmployeeById(id)
            .then((res) => {
                let employee = res.data;
                setFirstName(employee.firstName);
                setLastName(employee.lastName);
                setGender(employee.gender);
                setEmail(employee.email);
                setPhone(employee.phone);
                setBirthDay(employee.birthDay);
                setRole(employee.role);
                setSalary(employee.salary);
                setDepart(employee.depart);
                if (employee.role === "Manager") {
                    setPromotedDay(employee.inaugurationDate);
                }
            })
            .catch(() => {
                console.log("Can't find employee with id " + id);
            });
    }, [id]);
    return (
        <div className="mt-3">
            <div
                className="card"
                style={{ textAlign: "start", width: "50%", margin: "auto" }}
            >
                <div className="card-body">
                    <h5 className="card-title">Employee details</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Name: <span>{firstName + " " + lastName}</span>
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Employee Id: <span>{id}</span>
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Email: <span>{email}</span>
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Department: <span>{depart}</span>
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Role: <span>{role}</span>
                    </h6>
                    {promotedDay ? (
                        <h6 className="card-subtitle mb-2 text-muted">
                            Promoted Day: <span>{promotedDay}</span>
                        </h6>
                    ) : (
                        ""
                    )}
                    <h6 className="card-subtitle mb-2 text-muted">
                        Salary: <span>{salary}</span>
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Gender: <span>{gender}</span>
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Phone: <span>{phone}</span>
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Birthday: <span>{birthDay}</span>
                    </h6>
                    <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => navigate("/employees")}
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ViewEmployee;
