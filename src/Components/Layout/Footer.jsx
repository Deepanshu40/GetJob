import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

import {} from 'react-icons'
const Footer = () => {
  return (
    <div className='footer'>
      <div className="disclaimer">
      &#169; All Rights Reserved By CodeWithDeepanshu.
      </div>
       <div className="footer-icons">
        <a href='#facebook'><FacebookIcon></FacebookIcon></a>
        <a href='#youtube'><YouTubeIcon></YouTubeIcon></a>
        <a href='#linkedin'><LinkedInIcon></LinkedInIcon></a>
        <a href='#instagram'><InstagramIcon></InstagramIcon></a>
      </div> 
    </div>
  )
}

export default Footer