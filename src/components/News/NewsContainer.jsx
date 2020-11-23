
import { connect } from 'react-redux'
import News from './News'

let mapStatetoProps = (state) => {
    return {
        newsHT: state.newsPageData.newsHT
    }
}

export default connect(mapStatetoProps)(News);