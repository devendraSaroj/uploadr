
const initState = {
    state: {
        image: null,
        img_name: null,
        img_size: null, 
        img_width: null,
        img_height: null,
        image_showing: false,
        progress: 0,
        uploading: false,
        imgUrl: ""
    }
}

const fileUploadReducer = (state = initState, action) => {
    switch (action.type) {
        case 'STATE_UPDATE':
            console.log("reducer", action.state)
            return action.state
    }
    return state 
}

export default fileUploadReducer