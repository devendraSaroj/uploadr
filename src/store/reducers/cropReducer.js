
var array = []

const initState = {
    result: {
        img1: null,
        img2: null,
        img3: null,
        img4: null,
        folderNames:array
    }
}

const cropReducer = (state = initState, action) => {

    switch(action.type) {
        case 'CROP_RES_UPDATE': 
            switch(action.index) {
                case 0: return {...state, img1: action.image}
                case 1: return {...state, img2: action.image}
                case 2: return {...state, img3: action.image}
                case 3: return {...state, img4: action.image}
            }
        case 'INSERT_FOLDER': return {...state, folderNames: array.unshift(action.name)}         
        default: return {...state};
    }
}

export default cropReducer