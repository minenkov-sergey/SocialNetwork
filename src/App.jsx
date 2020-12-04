import React from 'react';
import styles from './App.module.css'
import HeaderContainer from './components/Header/HeaderContainer'
import Navbar from './components/Navbar/Navbar'
import ProfileContainer from './components/Profile/ProfileContainer'
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer'
import UsersContainer from './components/Users/UsersContainerJS'
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializedTC } from './Redux/app-Reducer';
import Preloader from './components/common/Preloader';
import { withSuspence } from './hoc/withSuspence';
import { AppStateType } from './Redux/redux-store';
import {useEffect} from 'react'


const Settings = React.lazy(() => import('./components/Settings/Settings'));
const Music = React.lazy(() => import('./components/Music/Music'));
const NewsContainer = React.lazy(() => import('./components/News/NewsContainer'));


const App = (props) => {
  
// eslint-disable-next-line
  useEffect( () => {props.setInitialized()},[])

  // window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)

  // componentWillUnmount() {
  //   window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  // }

    //@ts-ignore
    if (props.isInitialized === false) {
      return <Preloader />
    }

    return (
      <div className={styles.app}>
        <div className={styles.app_wrapper}>
          <HeaderContainer />
          <Navbar />
          <div className={styles.app_wrapper_content}>
            <Switch>

              <Redirect exact from='/' to='/profile' />

              <Route path='/profile:userId?' render={() => <ProfileContainer />} />

              <Route path='/dialogs' render={() => <DialogsContainer />} />

              <Route path='/news' render={withSuspence(NewsContainer)} />

              <Route path='/music' render={withSuspence(Music)} />

              <Route path='/settings' render={withSuspence(Settings)} />

              <Route path='/users' render={() => <UsersContainer />} />

              <Route path='/login' render={() => <Login />} />

              <Route path='*' render={() => <div> Error 404: Page not Found</div>} />

            </Switch>
          </div>
        </div>
      </div>
    );
  }


const mapStateToProps = (state) => ({
  isInitialized: state.appData.initialized
})

export default compose(
  withRouter,
  connect(mapStateToProps, { setInitialized: initializedTC }))(App)

