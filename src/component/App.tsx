import Desk from "./Todo/Desk.tsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import Edit from "./Todo/Edit.tsx";
import todoElement from "../model/TodoElement.tsx";
import TodoElement from "../model/TodoElement.tsx";
import axios from "axios";

function App() {
    const navigate = useNavigate();

    const get = function (id: number) {
        return axios.get<TodoElement>(`/api/todo/${id}`)
    }

    const getAll = function () {
        return axios.get<TodoElement[]>(`/api/todo`)
    }

    const update = function (element: todoElement) {
        return axios.put(`/api/todo/${element.id}`, element)
    }

    const remove = function (element: todoElement) {
        return axios.delete(`/api/todo/${element.id}`);
    }

    const create = function (element: todoElement) {
        return axios.post(`/api/todo`, element);
    }

    return (
        <>
            <div className="title">
                <h1 onClick={() => navigate("/")}>Frontend Recap Project</h1>
                <Routes>
                    <Route path="/" element={<Desk getAll={getAll} update={update} remove={remove} create={create}/>}/>
                    <Route path="/element/:id" element={<Edit get={get} update={update}/>}/>
                </Routes>
            </div>
        </>
    )
}

export default App
