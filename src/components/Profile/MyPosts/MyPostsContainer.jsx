
import { addPostActionCreator} from '../../../Redux/profilePageData-Reducer'
import MyPosts from './MyPosts'
import {connect} from 'react-redux'


let mapStateToProps = (state) => {
    return {
        postsPageData: state.profilePageData
    }
} 
let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (value) => dispatch (addPostActionCreator (value)),
    }
} 

const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts);


export default MyPostsContainer;