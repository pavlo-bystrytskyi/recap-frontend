import ElementStatus from "./model/ElementStatus.tsx";

const StatusList: ElementStatus[] = [
    {
        id: 1,
        key: "OPEN",
        description: "OPEN",
        nextStatusId: 2
    },
    {
        id: 2,
        key: "IN_PROGRESS",
        description: "IN PROGRESS",
        prevStatusId: 1,
        nextStatusId: 3
    },
    {
        id: 3,
        key: "DONE",
        description: "DONE",
        prevStatusId: 2,
    },
]

export default StatusList;