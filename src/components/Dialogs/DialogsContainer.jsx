import { connect } from 'react-redux';
import { addMessageAC} from './../../Redux/dialogsPageData-Reducer'
import Dialogs from './Dialogs'
import { withAuthRedirect } from './../../hoc/withAuthRedirect';
import { compose } from 'redux';

let mapStateToProps = (state) => {
    return {
        dialogsPageData: state.dialogsPageData,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (value) => dispatch(addMessageAC(value))
}
}


export default compose (
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
) (Dialogs)