import React from 'react';
import { classes } from '/common/util';
import styles from './stylesheet.scss';
import axios from 'axios';

class ImageUploader extends React.Component {
  upload({ target }) {
    target.disabled = true;
    const file = target.files[0];
    if (!/image\/*/.test(file && file.type)) {
      target.disabled = false;
      return;
    }
    const url = '/api/image';
    const formData = new FormData();
    formData.append('image', file, file.name);
    const config = { headers: { 'content-type': 'multipart/form-data' } };
    const { onUpload } = this.props;
    axios.post(url, formData, config)
      .then(({ image }) => {
        target.disabled = false;
        onUpload(image._id)
      })
      .catch(e => {
        target.disabled = false;
        console.error(e);
      });
  }

  render() {
    const { className, uploaded, style } = this.props;

    return (
      <label className={classes(styles.image_uploader, uploaded && styles.uploaded, className)} style={style}>
        <input type="file" onChange={e => this.upload(e)} />
        <span>Click here to upload image</span>
      </label>
    );
  }
}

export default ImageUploader;
