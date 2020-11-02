import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './Redux/redux-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';


  ReactDOM.render(
      <BrowserRouter>
        <Provider store={store}>
          <App store={store} />
        </Provider>
      </BrowserRouter>,
    document.getElementById('root')
  );



//addPost('yooooooo');


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

//addMessage={store.addMessage.bind(store)} updateNewPost={store.updateNewPost.bind(store)} updateNewMessage={store.updateNewMessage.bind(store)} addPost={store.addPost.bind(store)}