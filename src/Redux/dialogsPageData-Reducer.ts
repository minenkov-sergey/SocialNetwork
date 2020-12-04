export type InitialStateType = typeof initialState

type DialogType = {
    id: number
    name: string
}
type MessagesType = {
    id: number
    message: string
}

let initialState = {
    dialogsNamesData: [
        { id: 1, name: 'Dima' },
        { id: 2, name: 'Andrey' },
        { id: 3, name: 'Sasha' },
        { id: 4, name: 'Viktor' },
        { id: 5, name: 'Anton' },
        { id: 6, name: 'Valera' }] as Array<DialogType>,
    messagesData: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How are you' },
        { id: 3, message: 'Yo' },
        { id: 4, message: 'Yo' },
        { id: 5, message: 'Hi' }] as Array<MessagesType>
}


const ADD_MESSAGE = 'dialogsPageData-Reducer/ADD_MESSAGE'

const dialogsPageDataReducer = (state = initialState, action: addMessageACType): InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE: {
            let idLengthArray = state.messagesData.length + 1
            let newMessage = {
                id: idLengthArray,
                message: action.value
            }
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage],
            }
        }
        default:
            return state
    }
}

type addMessageACType = {
    type: typeof ADD_MESSAGE
    value: string
}

export const addMessageAC = (value:string): addMessageACType => ({ type: ADD_MESSAGE, value })

export default dialogsPageDataReducer;