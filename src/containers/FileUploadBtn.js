import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {NotificationManager} from 'react-notifications'
import {fileShareAddFiles} from 'actions'

class FileUploadBtn extends Component {

  setUploadFileRef(element){
    this.clickBtn = element;
  }
  uploadFile(){
    if(this.clickBtn){
      this.clickBtn.click();
    }
  }

  loadFile(event){
    console.log("File change: %O", event);
    var me = this;
    var files = event.target.files; // FileList object
    var fileRefs = [...files].map((file) => {
      if (!file.type.match(/pdf|^image\//)) {
        NotificationManager.error('File not supported!');
        return;
      }
      var fileRef = cct.FileRef.fromFile(file);
      // Workaround for fileRef not having an Object prototype and redux complaining
      fileRef.id = fileRef._id;
      fileRef.hasOwnProperty = name => name === 'id'
      return fileRef;
    });
    this.props.onUploadFiles(fileRefs);
    event.target.type = ''
    event.target.type = 'file'
  }
  render(){
    return(
      <div className={this.props.classes} style={this.props.styles}  onClick={this.uploadFile.bind(this)}>
        <input style={{display:"none"}} className="att-label-span-input" type="file" id="myfile" ref={this.setUploadFileRef.bind(this)}  onChange={this.loadFile.bind(this)} />
      </div>
      );
  }
}


export default connect(null, (dispatch) => ({
  onUploadFiles: (fileRefs) => dispatch(fileShareAddFiles(fileRefs)),
}))(FileUploadBtn);
