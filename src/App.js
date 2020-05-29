import React from 'react';
import './App.css';
import FileUpload from './components/fileUpload/FileUpload'
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CropImage from './components/cropImage/CropImage';
import ViewImage from './components/viewImage/ViewImage';


function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route exact path='/' component={FileUpload} />
          <Route path='/uploadr' component={FileUpload} />
          <Route path='/crop' component={CropImage} />
          <Route path='/albums' component={ViewImage} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
