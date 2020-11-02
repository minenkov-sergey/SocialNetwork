const { default: profilePageDataReducer, deletePostAC } = require("./Redux/profilePageData-Reducer")


let state = {
    newpostProfilePageData: '',
    profilePageData: [
        { id: 1, message: 'first post', likecount: 15 },
        { id: 2, message: 'second post', likecount: 6 }]
}

it ('deleting message', () => {
    let action = deletePostAC(1)

    let newState = profilePageDataReducer(state, action)

    expect(newState.profilePageData.length).toBe(1)
})