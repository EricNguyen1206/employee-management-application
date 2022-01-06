import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DepartServices from "../services/DepartServices";

function ListDepartments() {
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        DepartServices.getDeparts().then((res) => {
            setDepartments(res.data);
        });
    }, []);

    const editDepartment = (id) => {
        console.log("edit department", id);
        navigate(`/update-department/${id}`);
    };

    const deleteDepartment = (id) => {
        console.log("delete");
        DepartServices.deleteDepart(id).then((res) => {
            setDepartments(
                departments.filter((department) => department.id !== id)
            );
        });
    };

    return (
        <div>
            <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className="mt-3"
            >
                <h2 className="text-center">Departments List</h2>
                <button
                    type="button"
                    className="btn btn-outline-success btn-sm ml-3"
                >
                    <a className="nav-link" href="/update-department/_add">
                        Add Department
                    </a>
                </button>
            </div>
            <div className="row" style={{ width: "70%", margin: "auto" }}>
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Staffs Number</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map((depart, index) => (
                            <tr key={index}>
                                <th>{depart.id}</th>
                                <td>{depart.name}</td>
                                <td>
                                    {depart.numberOfEmployees}/
                                    {depart.maxEmployees}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-info"
                                        onClick={() =>
                                            navigate(
                                                `/view-department/${depart.id}`
                                            )
                                        }
                                    >
                                        Details
                                    </button>
                                    <button
                                        className="btn btn-success ml-4"
                                        onClick={() =>
                                            editDepartment(depart.id)
                                        }
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-danger ml-4"
                                        onClick={() =>
                                            deleteDepartment(depart.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListDepartments;
