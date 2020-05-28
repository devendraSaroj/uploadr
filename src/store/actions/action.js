

// updates the fileUpload.js state to store
export const stateUpdate = (state) => {
    return (dispatch, getState) => {
        dispatch({type: 'STATE_UPDATE', state: state})
    }
}

// updates the cropped preview data from CropImage.js to store
export const cropResultUpdate = (image, index) => {
    console.log("image, index", index)
    return (dispatch, getState) => {
        dispatch({
            type: 'CROP_RES_UPDATE',
            image: image,
            index: index
        })
    }
}


export const insertFolderName = (name) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {

        const firestore = getFirestore()
        firestore.collection('folders').add({
            name: name,
            time: firestore.FieldValue.serverTimestamp()
        }).then(() => {
            dispatch({type: 'INSERT_FOLDER', name: name})
        }).catch((error) => {
            console.log(error);
        })
    }
}




