import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { getAuthDataTC, logoutTC } from '../../Redux/auth-Reducer';


class HeaderContainer extends React.Component {

 



  render () {
    return (
      <Header {...this.props}/>
    )
  }
}

let mapStateToProps = (state) => ({
  id: state.authData.id,
  email: state.authData.email,
  login: state.authData.login,
  isLogged: state.authData.isLogged

})

export default connect(mapStateToProps,{getAuthData:getAuthDataTC,logout: logoutTC}) (HeaderContainer);