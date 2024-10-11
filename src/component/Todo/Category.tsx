import Element from "./Element.tsx";
import TodoElement from "../../model/TodoElement.tsx";

export default function Category({name, elements, update, remove}: {
    name: string,
    elements: TodoElement[],
    update: (element: TodoElement) => void,
    remove: (element: TodoElement) => void
}) {
    return <div className="todo-category">
        <h2>{name}</h2>
        {
            elements.map(
                (element) => <Element key={element.id} element={element} update={update} remove={remove}/>
            )
        }
    </div>
}