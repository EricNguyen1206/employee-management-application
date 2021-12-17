import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EmployeeServices from "../services/EmployeeServices";

function ViewEmployee() {
    const { id } = useParams();
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");

    useEffect(() => {
        EmployeeServices.getEmployeeById(id).then((res) => {
            let employee = res.data;
            setFirstName(employee.firstname);
            setLastName(employee.lastname);
            setEmailId(employee.emailId);
        });
    });
    return (
        <div>
            <div
                className="card"
                style={{ textAlign: "start", width: "50%", margin: "auto" }}
            >
                <div className="card-body">
                    <h5 className="card-title">Employee details</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Name: <span>{firstname + " " + lastname}</span>
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Employee Id: <span>{id}</span>
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Email: <span>{emailId}</span>
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Office: <span>Unknown</span>
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Role: <span>Unknown</span>
                    </h6>
                    <a href="/" className="card-link">
                        Card link
                    </a>
                    <a href="/" className="card-link">
                        Another link
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ViewEmployee;
