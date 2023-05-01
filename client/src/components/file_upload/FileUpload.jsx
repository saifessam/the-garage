import { useState } from 'react';
import './styles.css';

const FileUpload = ({ name, action, multiple = false }) => {
  const [fileName, setFileName] = useState([]);

  const handleChange = (e) => {
    const files = e.currentTarget.files;
    let values = [];
    for (let i = 0; i < files.length; i++) {
      values.push(files[i].name);
    }
    setFileName(values);
    action(values);
  };

  return (
    <div className="file-upload">
      <div className="file-upload-input">
        <span className="file-upload-input-button">{fileName.length === 0 ? 'Click to upload' : fileName.join(' - ')}</span>
        <input type="file" name={name} accept="image/*" onChange={(e) => handleChange(e)} multiple={multiple} />
      </div>
    </div>
  );
};

export default FileUpload;
