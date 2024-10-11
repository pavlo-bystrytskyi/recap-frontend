import TodoElement from "../../model/TodoElement.tsx";
import StatusList from "../../StatusList.tsx";
import {useNavigate} from "react-router-dom";

export default function Element({element, update, remove}:
                                    {
                                        element: TodoElement,
                                        update: (element: TodoElement) => void,
                                        remove: (element: TodoElement) => void
                                    }) {

    const navigate = useNavigate();
    const currentStatus = StatusList.find((item) => item.key === element.status);
    const prevStatus = currentStatus && StatusList.find((item) => item.id === currentStatus.prevStatusId);
    const nextStatus = currentStatus && StatusList.find((item) => item.id === currentStatus.nextStatusId);

    const moveToPrevStatus = function () {
        if (prevStatus) {
            element.status = prevStatus.key;
            update(element)
        }
    }

    const moveToNextStatus = function () {
        if (nextStatus) {
            element.status = nextStatus.key
            update(element)
        }
    }

    return <div className="todo-element">
        <div className="todo-element-control-top">
            <button className="todo-element-remove" onClick={() => remove(element)}>x</button>
        </div>
        <div className="todo-element-description"
             onClick={() => navigate(`/element/${element.id}`)}>{element.description}</div>

        <div className="bottom">
            {prevStatus && <button className="todo-element-prev-status" onClick={moveToPrevStatus}>{"<<"}</button>}
            {nextStatus && <button className="todo-element-next-status" onClick={moveToNextStatus}>{">>"}</button>}
        </div>
    </div>
}