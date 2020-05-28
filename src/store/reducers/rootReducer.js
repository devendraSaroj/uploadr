import cropReducer from './cropReducer'
import fileUploadReducer from './fileUploadReducer';
import {combineReducers} from 'redux'
import {firestoreReducer} from 'redux-firestore'

const rootReducer = combineReducers({
    file:fileUploadReducer,
    crop: cropReducer,
    firestore: firestoreReducer
});

export default rootReducer