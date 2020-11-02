
import sidebarDataReducer from './sidebarData-Reducer'
import postsPageDataReducer from './postsPageData-Reducer'
import dialogsPageDataReducer from './dialogsPageData-Reducer'


let store = {

    _state: {
        postsPageData: {
            newpostPageData: '',
            postPageData: [
                { id: 1, message: 'first post', likecount: 15 },
                { id: 2, message: 'second post', likecount: 6 }
            ]
        },
        dialogsPageData: {
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
                { id: 5, message: 'Hi' }],
            newMessageData: ''
        },
        sidebarData: {
            bestFriendsData: [
                { id: 1, name: 'Andrew' },
                { id: 2, name: 'Sasha' },
                { id: 3, name: 'Sveta' }
            ]
        }
    },
    _callSubscriber() { },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.sidebarData = sidebarDataReducer(this._state.sidebarData, action)
        this._state.postsPageData = postsPageDataReducer(this._state.postsPageData, action)
        this._state.dialogsPageData = dialogsPageDataReducer(this._state.dialogsPageData, action)
        this._callSubscriber (this._state);
    }
}


export default store;