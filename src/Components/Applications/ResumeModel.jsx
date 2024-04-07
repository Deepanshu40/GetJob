import React, { useState } from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {Link} from 'react-router-dom';

const ResumeModel = ({url}) => {
  const [preview, setPreview] = useState(true); 
  function handleClick() {
    setPreview(!preview);
  }
  console.log(url);
  return (
    <div className='resumeModel'>
      <span className={(preview) ? 'closeBtnPreview': 'closeBtn'} onClick={handleClick}><CloseOutlinedIcon fontSize='large'></CloseOutlinedIcon></span>
      <div className={(preview) ? 'backdropPreview':"backdrop"}></div>
        <img src={url} className={(preview) ? "imagePreview":"image"} alt="image" />
    </div> 
    )
}

export default ResumeModel