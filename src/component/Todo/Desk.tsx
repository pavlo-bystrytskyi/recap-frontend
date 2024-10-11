import Category from "./Category.tsx";
import {useEffect, useState} from "react";
import TodoElement from "../../model/TodoElement.tsx";
import todoElement from "../../model/TodoElement.tsx";
import StatusList from "../../StatusList.tsx";
import ElementStatus from "../../model/ElementStatus.tsx";
import New from "./New.tsx";
import {AxiosResponse} from "axios";

export default function Desk(
    {
        getAll,
        update,
        create,
        remove
    }: {
        getAll: () => Promise<AxiosResponse<todoElement[]>>,
        update: (element: TodoElement) => Promise<AxiosResponse>,
        create: (element: TodoElement) => Promise<AxiosResponse>,
        remove: (element: TodoElement) => Promise<AxiosResponse>,
    }) {
    const [data, setData] = useState<TodoElement[]>([]);
    const statusData = StatusList;

    const wrappedInteraction = function (callable: (element: TodoElement) => Promise<AxiosResponse>) {
        return async (element: TodoElement) => {
            await callable(element);
            getAll().then(response => {
                setData(response.data);
            })
        }
    }

    const wrappedCreate = wrappedInteraction(create);
    const wrappedUpdate = wrappedInteraction(update);
    const wrappedRemove = wrappedInteraction(remove);

    useEffect(() => {
        getAll().then(response => {
            setData(response.data);
        })
    }, []);

    return (
        <>
            <div className="todo-desk">
                {statusData.map((status: ElementStatus) => {
                        const elements: TodoElement[] = data.filter((element) => element.status === status.key)
                        return <Category key={status.id} name={status.description} elements={elements}
                                         remove={wrappedRemove}
                                         update={wrappedUpdate}/>
                    }
                )}
            </div>
            <div className="todo-create">
                <New create={wrappedCreate} status={(statusData.find((element) => element.id === 1)?.key ?? "")}/>
            </div>
        </>
    );
}