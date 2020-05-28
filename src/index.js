import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, compose,  applyMiddleware} from 'redux';
import rootReducer from './store/reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import { createFirestoreInstance, reduxFirestore, getFirestore } from 'redux-firestore';
import fbConfig from './firebase_config';
import firebase from 'firebase/app';

const store = createStore(
                rootReducer,
                compose(
                  applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
                  reduxFirestore(firebase, fbConfig),    
                )
              );


const profileSpecificProps = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  enableRedirectHandling: false,
  resetBeforeLogin: false
}

const rrfProps = {
  firebase,
  config: fbConfig,
  config: profileSpecificProps,
  dispatch: store.dispatch,
  createFirestoreInstance,
  attachAuthIsReady: true
};  

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps} >
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


