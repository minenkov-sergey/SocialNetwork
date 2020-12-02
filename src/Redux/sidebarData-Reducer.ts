type InitialStateType = typeof initialState

type BestFriendsDataType = {
    id: number, 
    name: string
}
let initialState = {
    bestFriendsData: [
        { id: 1, name: 'Andrew' },
        { id: 2, name: 'Sasha' },
        { id: 3, name: 'Sveta' }
    ] as Array<BestFriendsDataType>
}

const sidebarDataReducer = (state = initialState, action: any): InitialStateType => {
    return state;
}

export default sidebarDataReducer;