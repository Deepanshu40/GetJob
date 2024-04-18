import React, { useState } from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {useNavigate} from 'react-router-dom';

  const ResumeModel = ({url, setPopupId}) => {
  // const Navigate = useNavigate();
  const [previewImg, setPreviewImg] = useState(true); 
  function handleClick() {
    // (previewImg) ? 
    // setPreviewImg(!previewImg)
    // :
    setPopupId();
  }
  return (
    <div className='resumeModel'>
      <span className={(previewImg) ? 'closeBtnPreview': 'closeBtn'} onClick={handleClick}><CloseOutlinedIcon fontSize='large'></CloseOutlinedIcon></span>
      <div className={(previewImg) ? 'backdropPreview':"backdrop"}></div>
        <img src={url} className={(previewImg) ? "imagePreview":"image"} alt="image" />
    </div> 
    )
}

export default ResumeModel