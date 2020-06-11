import React from 'react';
import axios from 'axios';
import { Progress } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

class File extends React.Component {
  state = {
    selectedVideos: null,
    loaded: 0
  }

  maxSelectFile(event) {
    let files = event.target.files;
    if (files.length > 1) {
      toast.error('Maximum 1 file is allowed');
      event.target.value = null;
      return false;
    } else {
      let err = '';
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > 52428800) { 
          err += files[i].name + ', ';
        }
      }
      if (err !== '') {
        event.target.value = null;
        toast.error(err + " is/are too large. Please select file size < 50Mb");
      }
    }
    return true;
  }

  fileChangeHandler(event) {
    const files = event.target.files;
    if (this.maxSelectFile(event)) {
      this.setState({
        selectedVideos: files,
        loaded: 0
      });
    }
  }

  fileUploadHandler(event) {
    const data = new FormData();
    for (let i = 0; i < this.state.selectedVideos.length; i++) {
      data.append('file', this.state.selectedVideos[i]);
    }
    axios.post('http://127.0.0.1:3333/api/file', data, {
      onUploadProgress: ProgressEvent => {
        this.setState({
          loaded: (ProgressEvent.loaded / ProgressEvent.total * 100)
        });
      }
    }).then(res => {
      toast.success('Upload Successful');
    }).catch(err => {
      toast.error(`Upload Fail with status: ${err.statusText}`);
    });
  }

  render() { 
    return (
      <React.Fragment>
        <div className="container mt-5">
          <div className="form-group">
            <ToastContainer />
          </div>
          <div style={{display:'flex',justifyContent:'center', position:"relative"}}>
              <img src="data:image/png;base64,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"></img>
            </div>  <div style={{display:'flex',justifyContent:'center',backgroundColor:'green', position:"relative"}}> <h4>Upload Video</h4></div><hr/>
          <hr className="my-4" />

          <form method="post" name="videoUpload" action="/api/file" id="#" encType="multipart/form-data">
            <div className="form-group files">
                <div style={{display:'flex',justifyContent:'center',background:'pink' }}>
              <label>Upload Your VideoFile Here:</label></div>
              <input
                type="file"
                name="file"
                className="form-control"
                multiple="multiple"
                accept="video/*"
                onChange={this.fileChangeHandler.bind(this)} />
              <Progress max="100" color="success" value={this.state.loaded} className="mt-4 mb-1">
                {isNaN(Math.round(this.state.loaded, 2)) ? 0 : Math.round(this.state.loaded, 2)}%
              </Progress>
              <button
                type="button"
                className="btn btn-success btn-block"
                onClick={this.fileUploadHandler.bind(this)}>Upload Video
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default File;