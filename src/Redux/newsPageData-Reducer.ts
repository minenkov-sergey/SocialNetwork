type InitialStateType = typeof initialState

type NewsType = {
    id: number,
    header: string,
    text: string
}
let initialState = {
    newsHT: [
        { id: 1, header: 'News1Header', text: 'News1Text' },
        { id: 2, header: 'News2Header', text: 'News3Text' },
        { id: 3, header: 'News3Header', text: 'News3Text' },
        { id: 4, header: 'News4Header', text: 'News4Text' }
    ]as Array<NewsType>
}


const newsPageDataReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }

 }

export default newsPageDataReducer;