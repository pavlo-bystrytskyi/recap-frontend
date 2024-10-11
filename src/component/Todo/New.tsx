import TodoElement from "../../model/TodoElement.tsx";
import {ChangeEvent, FormEvent, useState} from "react";

export default function New({create, status}: { create: (element: TodoElement) => void, status: string }) {
    const newElement = {
        status: status,
        description: ""
    }

    const [element, setElement] = useState<TodoElement>(newElement);

    const handleSubmit = function (e: FormEvent) {
        e.preventDefault();
        if (isValid()) {
            create(element);
            setElement(newElement);
        }
    }

    const isValid = () => element.description.length !== 0;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setElement(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    return (<div className="todo-create">
        <form onSubmit={handleSubmit}>
            <input name="description" onChange={handleChange} value={element.description} className="todo-description" type="text"/>
            <button className="todo-create-button" disabled={!isValid()}>New</button>
        </form>
    </div>);
}