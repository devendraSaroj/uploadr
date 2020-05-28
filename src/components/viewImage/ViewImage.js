import React, { useState } from 'react'
import './style.css'
import Placeholder1 from '../../media/placeholder.png'
import Placeholder2 from '../../media/vertical_placeholder.png'
import firebase from 'firebase'
import { connect } from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase'
import { compose } from 'redux';

function ViewImage(props) {

    const {folders} = props
        
    function getImages(refName, index) {
        var storageRef = firebase.storage().ref(refName);
        storageRef.listAll().then(function(res) {
            res.items.forEach(function(itemRef) {
                console.log("getImage")
                displayImage(itemRef, index);
            });
        }).catch(function(error) {

        });
    }

    function displayImage(imageRef, index) {
        var aptImg, modalImg;
        switch(imageRef.name) {
            case '755X450': aptImg = document.getElementById("img"+(4*index+1));
            break;
            case '365X450': aptImg = document.getElementById("img"+(4*index+2));
            break;
            case '365X212': aptImg = document.getElementById("img"+(4*index+3));
            break;
            case '380X380': aptImg = document.getElementById("img"+(4*index+4));
            break;
        }
        imageRef.getDownloadURL().then(function(url) {
            aptImg.src = url;
            aptImg.title = imageRef.name;
        }).catch(function(error){
            console.log(error)
        });
    }


    return (
        <div className="album__container">
            <h2>Albums</h2>
            {folders && folders.map((folder, index) => {
                getImages(('images/'+folder.name).toString(), index)
                return (
                <div className="album__card" key={index}>
                    <div className="cropped_img1">
                        
                        <img id={"img"+(4*index+1)} src={Placeholder1} alt=""/>
                    </div>
                    <div className="cropped_img2">
                        <img id={"img"+(4*index+2)} src={Placeholder2} alt="" />
                        
                    </div>
                    <div className="cropped_img3">
                        <img id={"img"+(4*index+3)} src={Placeholder1} alt="" />
                        
                    </div>
                    <div className="cropped_img4">
                        <img id={"img"+(4*index+4)} src={Placeholder2} alt="" />
                        
                    </div>
                </div>
                )
            })}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cropState: state.crop,
        folders: state.firestore.ordered.folders
    }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'folders', orderBy: ['time', 'desc'] }
    ])
)(ViewImage)