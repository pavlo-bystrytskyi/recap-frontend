import TodoElement from "../../model/TodoElement.tsx";
import todoElement from "../../model/TodoElement.tsx";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {AxiosResponse} from "axios";

export default function Edit({get, update}: {
    get: (id: number) => Promise<AxiosResponse<todoElement>>,
    update: (element: TodoElement) => Promise<AxiosResponse>,
}) {
    const [element, setElement] = useState<TodoElement>(
        {
            description: "",
            status: ""
        }
    );

    const {id} = useParams();

    const handleSubmit = function (e: FormEvent) {
        e.preventDefault();
        if (isValid()) {
            update(element);
        }
    }

    const isValid = () => element.description.length !== 0;

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setElement(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    useEffect(
        () => {
            get(Number(id)).then(response => {
                setElement(response.data);
            })
        },
        [get, id]
    )

    return <div className="todo-edit">
        <form onSubmit={handleSubmit}>
            <textarea name="description" onChange={handleChange} value={element.description}
                      className="todo-description"/>
            <button className="todo-edit-button" disabled={!isValid()}>Edit</button>
        </form>
    </div>
}