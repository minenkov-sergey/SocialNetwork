

let initialState = {
        dialogsNamesData: [
            { id: 1, name: 'Dima' },
            { id: 2, name: 'Andrey' },
            { id: 3, name: 'Sasha' },
            { id: 4, name: 'Viktor' },
            { id: 5, name: 'Anton' },
            { id: 6, name: 'Valera' }],
        messagesData: [
            { id: 1, message: 'Hi' },
            { id: 2, message: 'How are you' },
            { id: 3, message: 'Yo' },
            { id: 4, message: 'Yo' },
            { id: 5, message: 'Hi' }]
    }

const dialogsPageDataReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'ADD-MESSAGE': {
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

export const addMessageActionCreator = (value) => {
    return { type: 'ADD-MESSAGE', value }
}

export default dialogsPageDataReducer;