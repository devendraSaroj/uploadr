import React, { useState, useRef, useEffect } from 'react'
import './style.css'
import {connect} from 'react-redux'
import {cropResultUpdate, insertFolderName} from '../../store/actions/action'
import firebase from 'firebase'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Redirect } from 'react-router-dom'



function CropImage(props) {

    const [result, setResult] = useState({
        progress: 0,
        uploading: false,
        redirect: false,
        mobile: false,
    }) 

   
    const imageElement1 = useRef()
    const imageElement2 = useRef()
    const imageElement3 = useRef()
    const imageElement4 = useRef()
    var images = [imageElement1, imageElement2, imageElement3, imageElement4];

    const {state, cropState} = props

    useEffect(() => {
        window.addEventListener('resize', resize())
    }, [result.mobile])

    function resize() {
        if( window.innerWidth < 848) {
            setResult({...result, mobile: true})
        }
        else {
            setResult({...result, mobile: false})
        }
    }

    const dimensions = [
        {
            width: 755,
            height: 450
        },
        {
            width: 365,
            height: 450
        },
        {
            width: 365,
            height: 212
        },
        {
            width: 380,
            height: 380
        }

    ]

    function uploadImages(imageFile, selfFolder) {
        var folderName = state.img_name.toString().split(".")[0]
        var storageRef = firebase.storage().ref(('images/'+folderName).toString());

        // upload image
        const uploadTask = storageRef.child(selfFolder).putString(imageFile, 'data_url');

        // upload progress
        uploadTask.on('state_changed', 
            (snapshot) => {
                var progress = parseInt(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setResult({...result, progress: progress, uploading:true})
            },
            (error) => {
                console.log(error)
            },
            () => {
            
               storageRef.child(selfFolder).getDownloadURL()
                .then(url => {
                    if(selfFolder === (dimensions[3].width+"X"+dimensions[3].height).toString()) {
                        setResult({...result, uploading: false, redirect: true})
                    }
                    else {
                        setResult({...result, uploading: false})
                    }
                })
            }
        )
    }

    const handleUpload = (e) => {
        var imageFile = [];
        props.insertFolder(state.img_name.toString().split(".")[0])
        for (var i = 0; i < dimensions.length; i++) {
            imageFile[i] = getImgSrc(i);
            var selfFolder = (dimensions[i].width+"X"+dimensions[i].height).toString()
            uploadImages(imageFile[i], selfFolder);
        }   
    }
    


    const _crop = (image, index) => {
        props.resultUpdate(image, index);
    }


    function getImgSrc(index) {
        switch(index) {
            case 0: return cropState.img1;
            case 1: return cropState.img2;
            case 2: return cropState.img3;
            case 3: return cropState.img4;
        }
    }


    
    return (
        <React.Fragment>
        {
        dimensions.map((dimension, index) => {
            return (
            <div className="crop__container" key={index} >
                <div className="crop__img__container">
                    <Cropper 
                        ref={images[index]}
                        src={props.state.image}
                        style={{height: result.mobile ? '50vh' : '80vh', width: '100%', objectFit:'contain !important'}}
                        zoomable={false}
                        movable={false}
                        scalable={false}
                        dragMode={"move"}
                        viewMode={2}
                        // cropmove={'move'}
                        responsive={true}
                        cropBoxResizable={false}
                        minCropBoxWidth={200}
                        minCropBoxHeight={100}
                        aspectRatio={dimension.width / dimension.height}
                        crop = {() => _crop(images[index].current.getCroppedCanvas().toDataURL(), index)}
                    />
                </div>
                <div className="preview__and__btn">
                    <img className="img__preview" src={getImgSrc(index)} alt="" />
                    <div className="preview__lable">Preview</div>
                    <div className="img__details" >
                        <h6>{props.state.img_name}</h6>
                        <h6> {dimensions[index].width+" x "+dimensions[index].height}</h6>
                    </div>
                </div>
            </div>
            )})
        }
         {
             !result.uploading && !result.redirect ?
            <button 
            className="upload__all" 
            type="submit"
            onClick={handleUpload}>
                Upload All
            </button>
            :
            !result.redirect ?
            <>
            <div style={{marginTop: '2rem', textAlign:'center'}}> Uploading </div>
            <div className="progress" style={{height:'1.5rem', marginBottom: '5rem', marginLeft:'2rem', marginRight:'2rem'}}>
                <div className="progress-bar progress-bar-striped progress-bar-animated bg-info" 
                role="progressbar" 
                style={{width: '95vw'}}>
                    {result.progress}%
                </div>
            </div>
            </>
            :
            <Redirect to="/albums" />
         }
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        state: state.file,
        cropState: state.crop,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resultUpdate: (image, index) => dispatch(cropResultUpdate(image, index)),
        insertFolder: (folderName) => dispatch(insertFolderName(folderName))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CropImage)
