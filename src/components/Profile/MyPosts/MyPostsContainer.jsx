
import { addPostAC} from '../../../Redux/profilePageData-Reducer'
import MyPosts from './MyPosts'
import {connect} from 'react-redux'


let mapStateToProps = (state) => {
    return {
        postsPageData: state.profilePageData
    }
} 
let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (value) => dispatch (addPostAC (value)),
    }
} 

const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts);


export default MyPostsContainer;