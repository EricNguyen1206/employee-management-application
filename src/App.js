import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListEmployees from "./components/ListEmployees";
import UpdateEmployee from "./components/UpdateEmployee";
import ViewEmployee from "./components/ViewEmployee";
import ListDepartments from "./components/ListDepartments";
import UpdateDepartment from "./components/UpdateDepartment";
import ViewDepartment from "./components/ViewDepartment";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
    return (
        <div className="App">
            <Header />
            <div className="container">
                <BrowserRouter>
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={<ListDepartments />}
                        ></Route>
                        <Route
                            exact
                            path="/departments"
                            element={<ListDepartments />}
                        ></Route>
                        <Route
                            exact
                            path="/employees"
                            element={<ListEmployees />}
                        ></Route>
                        <Route
                            exact
                            path="/update-employee/:id"
                            element={<UpdateEmployee />}
                        ></Route>
                        <Route
                            exact
                            path="/view-employee/:id"
                            element={<ViewEmployee />}
                        ></Route>
                        <Route
                            exact
                            path="/update-department/:id"
                            element={<UpdateDepartment />}
                        ></Route>
                        <Route
                            exact
                            path="/view-department/:id"
                            element={<ViewDepartment />}
                        ></Route>
                    </Routes>
                </BrowserRouter>
            </div>

            <Footer />
        </div>
    );
}

export default App;
