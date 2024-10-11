type ElementStatus = {
    id: number
    key: string,
    description: string
    prevStatusId?: number,
    nextStatusId?: number,
}

export default ElementStatus;