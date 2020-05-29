import React, { useRef, useState, useEffect } from 'react'
import './style.css'
import {ReactComponent as Icon} from '../../media/upload.svg'
import {stateUpdate} from '../../store/actions/action'
import { Link } from 'react-router-dom'
import {connect}  from 'react-redux'


function FileUpload(props) {
    
    const fileInput = useRef()
    
    const [state, setState] = useState({
        image: null,
        img_name: null,
        img_size: null, 
        img_width: null,
        img_height: null,
        image_showing: false,
        isImgSize1024: false,
    })

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
    
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }


    const handleImage = event => {
        if (event.target.files && event.target.files[0]) {
            var image = URL.createObjectURL(event.target.files[0])
            setState({
                ...state,
                image: image, 
                img_name: event.target.files[0].name, 
                img_size: formatBytes(event.target.files[0].size),
                image_showing: true
            })
        }
    }

    useEffect(() => getImgSize(state.image), [state.image])


    

    const handleDimension = () => {
        props.updateState(state)
    }

    const getImgSize = (imgSrc) => {
        var newImg = new Image();
        newImg.onload = function() {
          var height = newImg.height;
          var width = newImg.width;
          if (width === 1024 && height === 1024) {
            setState({...state,img_width: width, img_height: height, isImgSize1024:true});
          }
          else {
            setState({...state,img_width: width, img_height: height});
          } 
        }
        newImg.src = imgSrc; // this must be done AFTER setting onload
    }


    return (
        <div className="App">
            <div className="instruction__msg">
                <h3>How it works?</h3>
                <ol >
                    <li style={{listStyle:'decimal'}}>Takes an image of resolution 1024x1024.</li>
                    <li>Crops into 4 different resolution.</li>
                    <li>Uploads all 4 cropped images to cloud.</li>
                    <li>Head over to Album section to view all uploaded images.</li>
                </ol>
            </div>
            <div className="file__select__container">
                <div className="drag__section">
                    
                {state.image_showing ?
                    <div className="preview">
                        <div className="preview__container">
                            <div className="img__container">
                                <img src={state.image} className="selected__image" alt={state.img_name} title={state.img_name}/>
                                <h6 className="img__name">{state.img_name}</h6>
                                <h6 className="img__size">{state.img_width +" x "+ state.img_height}</h6>
                                <h6 className="img__name">{state.img_size}</h6>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="drop__message">
                        <Icon className="upload__icon" />
                        <h4 className="browse__file__message"> Click on the button to select your file. </h4>
                    </div>
                }
                
                <div className="file__select__lable">
                    <input 
                    id="input"
                    type="file" 
                    accept="image/*"
                    style={{display: 'none'}} 
                    ref={fileInput}
                    onChange={handleImage}
                    />
                    <button type="submit" onClick={() => fileInput.current.click()} className="select__btn"> Select Image</button>
                </div>
                </div>
            </div>

            {
                
                state.image_showing && state.isImgSize1024 ?
                <Link to="/crop">
                <button 
                    type="submit"  
                    className="upload__btn" 
                    onClick={handleDimension}> 
                    Proceed 
                </button>
                    </Link>
                :
                <button 
                    type="submit"  
                    className="upload__btn"
                    onClick={() => state.image_showing && !state.isImgSize1024 ? alert('image must be 1024x1024') : alert("Select an image to proceed.") }> 
                    Proceed 
                </button>
                
            } 
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateState: (state) => dispatch(stateUpdate(state))
    }
}


export default connect(null, mapDispatchToProps)(FileUpload);