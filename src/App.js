import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListEmployees from "./components/ListEmployees";
import UpdateEmployee from "./components/UpdateEmployee";
import ViewEmployee from "./components/ViewEmployee";
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
                            element={<ListEmployees />}
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
                    </Routes>
                </BrowserRouter>
            </div>

            <Footer />
        </div>
    );
}

export default App;
