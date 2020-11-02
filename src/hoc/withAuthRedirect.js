import  React  from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


let mapStatetoPropsForRedirect = (state) => ({
    isLogged: state.authData.isLogged
  })

export const withAuthRedirect = (Component) => {
    const RedirectComponent = ( props ) => {
        if (props.isLogged === false) return <Redirect to={'/login'}/>
        return (<Component {...props} />)
      }
      let connectedAuthRedirectComponent = connect(mapStatetoPropsForRedirect)(RedirectComponent)
      return connectedAuthRedirectComponent
}


