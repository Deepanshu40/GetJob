import React, { useContext, useEffect, useState, useRef } from "react"
import { Context } from "../../main"
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import toast from 'react-hot-toast';

const Navbar = () => {

const {isAuthorized, setIsAuthorized, user, setUser} = useContext(Context);
const [drawerOpen, setDrawerOpen] = useState(false);
const navbarRef = useRef(null);
const navigate = useNavigate();


useEffect(() => {
  // Function to close navbar when clicking outside
  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setDrawerOpen(false);
    }
  };

  // Add event listener to document
  document.addEventListener("mousedown", handleClickOutside);

  // Clean up event listener
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

// logout function
async function handleLogout() {
  try {
    await axios.get(
      // 'http://localhost:8080/api/v1/user/logout',
      'https://getjob-backend-qa7t.onrender.com/api/v1/user/logout',
       {withCredentials:true});
    setIsAuthorized(false);
    setUser({});
    setDrawerOpen(false);
    toast.success('logged out successfully');
    navigate('/');
  } catch(err) {
    console.log(err)
  }
}


return (
  <>
   <nav ref={navbarRef}>
    <div className="navleft">
      <Link><img src="/JobZee-logos__white.png" alt="navlogo_img" /></Link>
    </div>
    <span className="menuicon"><MenuIcon onClick={() => setDrawerOpen(!drawerOpen)} fontSize="large"></MenuIcon></span>
    <div className={(drawerOpen) ? 'navright-drawer' : 'navright'}>
      <ul>
        <li><Link className="navlinks" to={'/'} onClick={() => setDrawerOpen(!drawerOpen)}>HOME</Link></li>
        <li><Link className="navlinks" to={'/job/getall'} onClick={() => setDrawerOpen(!drawerOpen)}>ALL JOBS</Link></li>
        {(user && user.role==='Employer') ? 
        <>
        <li><Link className="navlinks" to={'/application/me'} onClick={() => setDrawerOpen(!drawerOpen)}>APPLICANT'S APPLICATION</Link></li>
        <li><Link className="navlinks" to={'/job/post'} onClick={() => setDrawerOpen(!drawerOpen)}>POST NEW JOB</Link></li>
        <li><Link className="navlinks" to={'/job/me'} onClick={() => setDrawerOpen(!drawerOpen)}>VIEW YOUR JOB</Link></li>
        <li onClick={handleLogout} className="logout-btn">LOGOUT</li>
        </> : 
        (user && user.role==='Job seeker') ? 
        <>
        <li><Link className="navlinks" to={'/application/me'} onClick={() => setDrawerOpen(!drawerOpen)}>MY APPLICATIONS</Link></li>
        <li onClick={handleLogout} className="logout-btn">LOGOUT</li>
        </> :
        <>
        <li><Link className="navlinks" to={'/login'} onClick={() => setDrawerOpen(!drawerOpen)}>LOGIN</Link></li>
        <li><Link className="navlinks" to={'/register'} onClick={() => setDrawerOpen(!drawerOpen)}>REGISTER</Link></li>
        </>
        }

      </ul>
    </div>
  </nav>
  </>
)
}

export default Navbar;